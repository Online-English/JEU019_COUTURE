// =========================================================================
// --- COMPORTEMENTS DES INTERFACES ET MOTEUR CELLULAIRE ---
// =========================================================================
let slideshowTimeout = null;
let isSlideshowActive = false;
let currentFlashIndex = 0;
let quizTimeout = null;  
let speakTimeout = null; 

let quizStep = 1, quizScore = 0, currentQuizItem = null;
let currentSpeakItem = null, speakScore = 0; 
let selectedEnglishNode = null, selectedFrenchNode = null;
let isProcessingMatch = false; 

let taTimerInterval = null;
let taTimeout = null; 
let taTimeLeft = 60;
let taScore = 0;
let currentTAItem = null;

window.onload = () => {
    loadStats(); 
    
    document.getElementById('stat-high-quiz').innerText = highScores.quiz;
    document.getElementById('stat-high-speak').innerText = highScores.speak || 0;
    document.getElementById('stat-high-timeattack').innerText = highScores.timeattack || 0;
    document.getElementById('stat-max-streak').innerText = maxStreak;
    
    updateLevelLockUI();
    renderDict();
    updateFlashcard();
    renderBadgesUI();
    renderErrorHistory();
};

function setVocabLevel(level) {
    selectedVocabularyLevel = parseInt(level);
    const selectEl = document.getElementById('vocab-level-select');
    if (selectEl) selectEl.value = level;
    
    renderDict();
    updateFlashcard();
    resetQuizToMenu();
}

function updateLevelLockUI() {
    const playerLevel = getUserPlayerLevel();
    const hint = document.getElementById('vocab-unlock-hint');
    const selectEl = document.getElementById('vocab-level-select');
    if (!hint || !selectEl) return;

    const levelsConfig = [
        { level: 2, req: 3, label: "Niveau 2 : La Machine à Coudre & Mécanique" },
        { level: 3, req: 6, label: "Niveau 3 : Les Matières & Textiles" },
        { level: 4, req: 9, label: "Niveau 4 : Patronage, Tracé & Coupe" },
        { level: 5, req: 12, label: "Niveau 5 : Techniques d'Assemblage & Points" },
        { level: 6, req: 15, label: "Niveau 6 : Anatomie du Vêtement & Mercerie" },
        { level: 7, req: 18, label: "Niveau 7 : Haute Couture & Fashion Studio" }
    ];

    levelsConfig.forEach(cfg => {
        const opt = document.getElementById(`opt-level-${cfg.level}`);
        if (!opt) return;

        if (playerLevel >= cfg.req) {
            opt.disabled = false;
            opt.innerText = cfg.label;
        } else {
            opt.disabled = true;
            opt.innerText = `🔒 Niv.${cfg.level} (Requis Jv. ${cfg.req})`;
            
            if (selectedVocabularyLevel === cfg.level) {
                selectedVocabularyLevel = 1;
                selectEl.value = "1";
            }
        }
    });

    if (playerLevel >= 18) {
        hint.innerText = "Arbre stylisme débloqué ! Tu possèdes l'ensemble des connaissances de l'Atelier.";
    } else {
        const nextUnlock = levelsConfig.find(cfg => playerLevel < cfg.req);
        if (nextUnlock) {
            hint.innerText = `Astuce : Monte au niveau joueur ${nextUnlock.req} pour déployer de nouvelles techniques de tissage !`;
        }
    }
}

function switchTab(event, tabName) {
    stopSlideshow();
    stopTimeAttack();
    
    if (quizTimeout) clearTimeout(quizTimeout);
    if (speakTimeout) clearTimeout(speakTimeout);
    
    resetQuizToMenu();

    document.querySelectorAll('.tab-content').forEach(el => { el.classList.add('hidden'); el.classList.remove('active'); });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = "tab-btn bg-[#090A10] border border-white/5 text-gray-300 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105";
    });

    const targetTab = document.getElementById(`tab-${tabName}`);
    if(targetTab) {
        targetTab.classList.remove('hidden'); targetTab.classList.add('active');
    }
    event.currentTarget.className = "tab-btn bg-brandBlue text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all border border-brandGreen shadow-[0_4px_15px_rgba(0,229,255,0.3)]";

    document.getElementById('autoplay-container').className = tabName === 'flash' ? "flex items-center gap-2" : "hidden";

    if (tabName === 'speak') initSpeak();
    if (tabName === 'match') initMatching();
    if (tabName === 'stats') {
        renderBadgesUI();
        renderErrorHistory();
    }
}

function processAnswerResult(isCorrect) {
    if (isCorrect) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
        playSoundEffect('success');
        totalPoints += 10;
        document.getElementById('total-points').innerText = totalPoints;
        updateLevelAndTitle();
        if (currentStreak >= 15) checkAndUnlockBadge("streak_15");
    } else {
        currentStreak = 0;
        playSoundEffect('fail');
    }
    document.getElementById('streak-count').innerText = currentStreak;
    document.getElementById('stat-max-streak').innerText = maxStreak;
    saveStats();
}

// --- MODULE 1 : PATRONTHÈQUE ---
function toggleDirectionDico() {
    searchDirection = (searchDirection === 'EN_FR') ? 'FR_EN' : 'EN_FR';
    document.getElementById('direction-label').innerText = (searchDirection === 'EN_FR') ? 'FR ➔ EN' : 'EN ➔ FR';
    document.getElementById('search-input').placeholder = (searchDirection === 'EN_FR') ? 'Filtrer un élément...' : 'Search for an item...';
    filterWords();
}

function renderDict(data = null) {
    const container = document.getElementById('dict-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (data === null) {
        data = coutureData.filter(f => f.level === selectedVocabularyLevel);
    }
    if(data.length === 0) {
        container.innerHTML = `<p class="text-center text-sm py-4 text-gray-400">Aucune pièce trouvée dans cette zone.</p>`;
        return;
    }

    data.forEach(item => {
        const isFav = favoriteItems.includes(item.en);
        const div = document.createElement('div');
        div.className = "bg-[#0E101A] p-4 rounded-2xl shadow border border-white/5 flex justify-between items-center cursor-pointer transition-all duration-200 transform hover:scale-[1.01] hover:shadow-md active:scale-95";
        div.onclick = () => playAudio(item.en);
        
        const primaryText = (searchDirection === 'EN_FR') ? item.en : item.fr;
        const secondaryText = (searchDirection === 'EN_FR') ? item.fr : item.en;

        div.innerHTML = `
            <div class="flex items-center gap-3.5">
                <span class="text-3xl bg-[#161A2B] p-2 rounded-2xl border border-white/5 shadow-inner">${item.emoji}</span>
                <div>
                    <p class="font-black text-sm sm:text-base text-white tracking-wide uppercase">${primaryText}</p>
                    <p class="text-xs font-bold text-gray-400">${secondaryText}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="toggleFavorite('${item.en}', event)" class="p-2.5 text-xl transition-all text-gray-600 hover:text-yellow-400 hover:scale-110 active:scale-90">
                    <i class="${isFav ? 'fa-solid text-yellow-400' : 'fa-regular'} fa-star"></i>
                </button>
                <span class="text-brandGreen p-2.5 text-lg"><i class="fa-solid fa-volume-high"></i></span>
            </div>
        `;
        container.appendChild(div);
    });
}

function filterWords() {
    const query = document.getElementById('search-input').value.toLowerCase();
    let sourceData = coutureData.filter(f => f.level === selectedVocabularyLevel);
    if(filterOnlyFavs) sourceData = sourceData.filter(f => favoriteItems.includes(f.en));
    const filtered = sourceData.filter(f => f.en.toLowerCase().includes(query) || f.fr.toLowerCase().includes(query));
    renderDict(filtered);
}

function toggleFavorite(englishName, event) {
    if(event) event.stopPropagation();
    const index = favoriteItems.indexOf(englishName);
    if (index > -1) favoriteItems.splice(index, 1);
    else favoriteItems.push(englishName);
    localStorage.setItem('oe_fav_sew', JSON.stringify(favoriteItems));
    filterWords();
}

function toggleFavFilter() {
    filterOnlyFavs = !filterOnlyFavs;
    document.getElementById('fav-filter-btn').className = filterOnlyFavs 
        ? "px-4 bg-yellow-400 text-slate-950 border-2 border-yellow-400 rounded-xl transition shadow-lg font-black"
        : "px-4 bg-[#11131F] border border-white/10 rounded-xl text-gray-400 hover:text-yellow-400 transition shadow-sm";
    filterWords();
}

// --- MODULE 2 : FLASHCARDS ---
function updateFlashcard() {
    const card = document.getElementById('main-flashcard');
    if (!card) return;
    card.classList.remove('flipped');
    const activeLevelWords = coutureData.filter(f => f.level === selectedVocabularyLevel);
    if(activeLevelWords.length === 0) return;
    if (currentFlashIndex >= activeLevelWords.length) currentFlashIndex = 0;

    setTimeout(() => {
        const item = activeLevelWords[currentFlashIndex];
        document.getElementById('flash-emoji').innerText = item.emoji;
        document.getElementById('flash-en').innerText = item.en;
        document.getElementById('flash-fr').innerText = item.fr;
        if(document.getElementById('autoplay-checkbox').checked && !isSlideshowActive) playAudio(item.en);
    }, 150);
}

// Liens de boucle d'index
function nextFlashcard() { 
    const maxLen = coutureData.filter(f => f.level === selectedVocabularyLevel).length;
    currentFlashIndex = (currentFlashIndex + 1) % maxLen; 
    updateFlashcard(); 
}
function prevFlashcard() { 
    const maxLen = coutureData.filter(f => f.level === selectedVocabularyLevel).length;
    currentFlashIndex = (currentFlashIndex - 1 + maxLen) % maxLen; 
    updateFlashcard(); 
}

function toggleSlideshow() { if (isSlideshowActive) stopSlideshow(); else startSlideshow(); }
function startSlideshow() {
    isSlideshowActive = true;
    document.getElementById('slideshow-btn').className = "bg-brandOrange text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-md transition hover:scale-105";
    document.getElementById('slideshow-btn').innerHTML = `<i class="fa-solid fa-circle-stop mr-1"></i> Interrompre la Coupe`;
    document.getElementById('flash-prev-btn').disabled = true;
    document.getElementById('flash-next-btn').disabled = true;
    document.getElementById('flash-prev-btn').classList.add('opacity-40');
    document.getElementById('flash-next-btn').classList.add('opacity-40');
    runSlideshowLoop();
}

function stopSlideshow() {
    isSlideshowActive = false;
    clearTimeout(slideshowTimeout);
    const btn = document.getElementById('slideshow-btn');
    if (btn) {
        btn.className = "bg-brandGreen text-[#05060A] px-5 py-2.5 rounded-xl text-sm font-black shadow-md transition hover:scale-105 uppercase tracking-wider";
        btn.innerHTML = `<i class="fa-solid fa-play mr-1"></i> Lancer l'Entraînement Continu`;
    }
    const pB = document.getElementById('flash-prev-btn');
    if(pB) {
        pB.disabled = false; pB.classList.remove('opacity-40');
        document.getElementById('flash-next-btn').disabled = false; document.getElementById('flash-next-btn').classList.remove('opacity-40');
    }
    const card = document.getElementById('main-flashcard');
    if (card) card.classList.remove('flipped');
}

function runSlideshowLoop() {
    if (!isSlideshowActive) return;
    const activeLevelWords = coutureData.filter(f => f.level === selectedVocabularyLevel);
    const card = document.getElementById('main-flashcard');
    card.classList.remove('flipped');
    playAudio(activeLevelWords[currentFlashIndex].en);

    slideshowTimeout = setTimeout(() => {
        if (!isSlideshowActive) return;
        card.classList.add('flipped');
        slideshowTimeout = setTimeout(() => {
            if (!isSlideshowActive) return;
            currentFlashIndex = (currentFlashIndex + 1) % activeLevelWords.length;
            updateFlashcard();
            runSlideshowLoop();
        }, 3000);
    }, 2500);
}

// --- MODULE 3 : INTERVENTION FITTING ---
function resetQuizToMenu() {
    document.getElementById('quiz-mode-menu').classList.remove('hidden');
    document.getElementById('quiz-classic-zone').classList.add('hidden');
    document.getElementById('quiz-timeattack-zone').classList.add('hidden');
}

function launchStandardQuiz() {
    document.getElementById('quiz-mode-menu').classList.add('hidden');
    document.getElementById('quiz-classic-zone').classList.remove('hidden');
    quizStep = 1; quizScore = 0; 
    document.getElementById('quiz-score').innerText = quizScore; 
    generateQuizQuestion();
}

function generateQuizQuestion() {
    if (quizStep > 10) {
        if (quizScore > highScores.quiz) { highScores.quiz = quizScore; saveStats(); }
        if (quizScore === 10) {
            triggerConfetti();
            checkAndUnlockBadge("first_perfect");
        }
        alert(`Session terminée ! Précision de gradation : ${quizScore}/10 patrons calibrés.`);
        document.getElementById('stat-high-quiz').innerText = highScores.quiz;
        resetQuizToMenu();
        return;
    }
    document.getElementById('quiz-current').innerText = quizStep;
    currentQuizItem = getNextExerciseWord(); 
    document.getElementById('quiz-question').innerText = currentQuizItem.en;

    const activePack = coutureData.filter(f => f.level === selectedVocabularyLevel);
    let choices = [currentQuizItem.fr];
    while (choices.length < Math.min(4, activePack.length)) {
        let randomFr = activePack[Math.floor(Math.random() * activePack.length)].fr;
        if (!choices.includes(randomFr)) choices.push(randomFr);
    }
    choices.sort(() => Math.random() - 0.5);

    const container = document.getElementById('quiz-options');
    container.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "w-full bg-[#0E101A] border-2 border-white/5 text-white p-3.5 rounded-xl font-bold text-left transition-all duration-150 transform hover:border-brandGreen hover:scale-[1.01] active:scale-[0.99] shadow-md";
        btn.innerText = choice;
        btn.onclick = () => checkQuizAnswer(btn, choice);
        container.appendChild(btn);
    });
}

function checkQuizAnswer(button, selected) {
    document.querySelectorAll('#quiz-options button').forEach(b => b.disabled = true);
    if (selected === currentQuizItem.fr) {
        button.className = "w-full bg-brandGreen text-slate-950 p-3.5 rounded-xl font-black text-left shadow-lg border-2 border-transparent";
        quizScore++;
        document.getElementById('quiz-score').innerText = quizScore;
        removeError(currentQuizItem.en);
        processAnswerResult(true);
    } else {
        button.className = "w-full bg-brandOrange text-white p-3.5 rounded-xl font-black text-left shadow-lg border-2 border-transparent";
        registerError(currentQuizItem);
        processAnswerResult(false);
        document.querySelectorAll('#quiz-options button').forEach(b => {
            if(b.innerText === currentQuizItem.fr) b.className = "w-full bg-brandGreen text-slate-950 p-3.5 rounded-xl font-black text-left shadow-md";
        });
    }
    quizTimeout = setTimeout(() => { quizStep++; generateQuizQuestion(); }, 1200);
}

// --- MODULE 4 : DEFILE FLASH CHRONO ---
function launchTimeAttack() {
    document.getElementById('quiz-mode-menu').classList.add('hidden');
    document.getElementById('quiz-timeattack-zone').classList.remove('hidden');
    taScore = 0; taTimeLeft = 60;
    document.getElementById('ta-score').innerText = taScore;
    document.getElementById('ta-timer').innerText = taTimeLeft;
    generateTAQuestion();

    clearInterval(taTimerInterval);
    taTimerInterval = setInterval(() => {
        taTimeLeft--;
        document.getElementById('ta-timer').innerText = taTimeLeft;
        if (taTimeLeft <= 0) stopTimeAttack(true);
    }, 1000);
}

function generateTAQuestion() {
    currentTAItem = getNextExerciseWord();
    document.getElementById('ta-question').innerText = currentTAItem.en;
    const activePack = coutureData.filter(f => f.level === selectedVocabularyLevel);
    let choices = [currentTAItem.fr];
    while (choices.length < Math.min(4, activePack.length)) {
        let randomFr = activePack[Math.floor(Math.random() * activePack.length)].fr;
        if (!choices.includes(randomFr)) choices.push(randomFr);
    }
    choices.sort(() => Math.random() - 0.5);

    const container = document.getElementById('ta-options');
    container.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "w-full bg-[#0E101A] border-2 border-white/5 text-white p-3.5 rounded-xl font-bold text-left transition-all hover:border-brandOrange hover:scale-[1.01] active:scale-[0.99] shadow-sm";
        btn.innerText = choice;
        btn.onclick = () => checkTAAnswer(btn, choice);
        container.appendChild(btn);
    });
}

function checkTAAnswer(button, selected) {
    document.querySelectorAll('#ta-options button').forEach(b => b.disabled = true);
    if (selected === currentTAItem.fr) {
        taScore++;
        document.getElementById('ta-score').innerText = taScore;
        removeError(currentTAItem.en);
        processAnswerResult(true);
        generateTAQuestion(); 
    } else {
        button.className = "w-full bg-brandOrange text-white p-3.5 rounded-xl font-black text-left shadow-lg border-2 border-transparent";
        registerError(currentTAItem);
        processAnswerResult(false);
        taTimeout = setTimeout(() => { generateTAQuestion(); }, 400);
    }
}

function stopTimeAttack(isFinishedFinished = false) {
    clearInterval(taTimerInterval);
    if (taTimeout) clearTimeout(taTimeout);
    if (isFinishedFinished) {
        alert(`Coup de ciseaux final ! Mannequins habillés au pas de course : ${taScore} ! Magnifique.`);
        if (taScore >= 20) checkAndUnlockBadge("time_20");
        if (taScore > highScores.timeattack) {
            highScores.timeattack = taScore;
            document.getElementById('stat-high-timeattack').innerText = taScore;
            saveStats();
        }
        resetQuizToMenu();
    }
}

// --- MODULE 5 : CAPTEURS ACOUSTIQUES MICRO ---
function initSpeak() {
    speakScore = 0;
    document.getElementById('speak-score').innerText = speakScore;
    generateSpeakQuestion();
}

function generateSpeakQuestion() {
    currentSpeakItem = getNextExerciseWord();
    document.getElementById('speak-emoji').innerText = currentSpeakItem.emoji;
    document.getElementById('speak-prompt-fr').innerText = currentSpeakItem.fr;
    const resultBox = document.getElementById('speech-result');
    resultBox.className = "hidden text-sm font-black p-4 rounded-xl";
    document.getElementById('speech-status').innerText = "En attente du signal de coupe...";
    document.getElementById('mic-pulse').classList.add('hidden');
}

function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("La reconnaissance vocale n'est pas active sur ton logiciel. Utilise Google Chrome ou Safari.");
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; recognition.interimResults = false; recognition.maxAlternatives = 1;

    const pulse = document.getElementById('mic-pulse');
    const statusText = document.getElementById('speech-status');
    const resultBox = document.getElementById('speech-result');

    pulse.classList.remove('hidden');
    statusText.innerText = "Fréquence calée : PARLE EN ANGLAIS !";
    resultBox.className = "hidden text-sm font-black p-4 rounded-xl";
    recognition.start();

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.trim().toLowerCase().replace(/[^a-zA-Z ]/g, "");
        const targetWord = currentSpeakItem.en.toLowerCase();
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `Signal décodé : <span class="italic font-black text-brandOrange">"${speechResult}"</span>`;

        if (speechResult === targetWord) {
            resultBox.classList.add('bg-green-950/40', 'text-green-400');
            statusText.innerText = "Prononciation validée par le bureau d'études ! +10 XP 🔥";
            speakScore++;
            document.getElementById('speak-score').innerText = speakScore;
            if (speakScore > highScores.speak) {
                highScores.speak = speakScore;
                document.getElementById('stat-high-speak').innerText = speakScore;
                saveStats();
            }
            removeError(currentSpeakItem.en); processAnswerResult(true);
            speakTimeout = setTimeout(() => generateSpeakQuestion(), 2000);
        } else {
            resultBox.classList.add('bg-red-950/40', 'text-red-400');
            statusText.innerText = "Fronce d'élocution ! Articule bien et relance.";
            registerError(currentSpeakItem); processAnswerResult(false);
        }
    };
    recognition.onspeechend = () => { recognition.stop(); pulse.classList.add('hidden'); };
    recognition.onerror = () => { pulse.classList.add('hidden'); statusText.innerText = "Liaison audio perdue. Retente."; };
}

// --- MODULE 6 : ASSEMBLAGE DES PANNEAUX (MATCHING) ---
function initMatching() {
    isProcessingMatch = false;
    const grid = document.getElementById('matching-grid'); 
    if(!grid) return;
    grid.innerHTML = '';
    
    const activePack = coutureData.filter(f => f.level === selectedVocabularyLevel);
    let shuffled = [...activePack].sort(() => Math.random() - 0.5).slice(0, 4);
    let englishCards = shuffled.map(f => ({ text: f.en, type: 'en', id: f.en }));
    let frenchCards = shuffled.map(f => ({ text: f.fr, type: 'fr', id: f.en }));
    englishCards.sort(() => Math.random() - 0.5); frenchCards.sort(() => Math.random() - 0.5);

    for(let i=0; i < englishCards.length; i++) {
        const btnEn = document.createElement('button');
        btnEn.className = "bg-[#0E101A] border-2 border-brandGreen text-brandGreen p-3.5 rounded-2xl font-black text-center text-xs sm:text-sm shadow-md transition active:scale-95 uppercase";
        btnEn.innerText = englishCards[i].text; btnEn.onclick = () => { btnEn.dataset.id = englishCards[i].id; btnEn.dataset.type = 'en'; handleMatchSelect(btnEn); };

        const btnFr = document.createElement('button');
        btnFr.className = "bg-[#0E101A] border-2 border-brandOrange text-brandOrange p-3.5 rounded-2xl font-black text-center text-xs sm:text-sm shadow-md transition active:scale-95 uppercase tracking-wide";
        btnFr.innerText = frenchCards[i].text; btnFr.onclick = () => { btnFr.dataset.id = frenchCards[i].id; btnFr.dataset.type = 'fr'; handleMatchSelect(btnFr); };

        grid.appendChild(btnEn); grid.appendChild(btnFr);
    }
}

function handleMatchSelect(node) {
    if (isProcessingMatch) return;
    if (node.dataset.type === 'en') {
        if (selectedEnglishNode) selectedEnglishNode.classList.remove('bg-brandGreen/20', 'dark:bg-brandGreen/40');
        selectedEnglishNode = node; selectedEnglishNode.classList.add('bg-brandGreen/20', 'dark:bg-brandGreen/40');
    } else {
        if (selectedFrenchNode) selectedFrenchNode.classList.remove('bg-brandOrange/20', 'dark:bg-brandOrange/40');
        selectedFrenchNode = node; selectedFrenchNode.classList.add('bg-brandOrange/20', 'dark:bg-brandOrange/40');
    }

    if (selectedEnglishNode && selectedFrenchNode) {
        if (selectedEnglishNode.dataset.id === selectedFrenchNode.dataset.id) {
            selectedEnglishNode.className = "bg-brandGreen text-slate-950 p-3.5 rounded-2xl font-black text-center pointer-events-none transition text-xs sm:text-sm matched-card shadow-lg uppercase";
            selectedFrenchNode.className = "bg-brandGreen text-slate-950 p-3.5 rounded-2xl font-black text-center pointer-events-none transition text-xs sm:text-sm matched-card shadow-lg uppercase";
            removeError(selectedEnglishNode.dataset.id); processAnswerResult(true);
            selectedEnglishNode = null; selectedFrenchNode = null;

            const totalMatched = document.querySelectorAll('.matched-card').length;
            if (totalMatched === 8) {
                setTimeout(() => { triggerConfetti(); alert("Surjet complet de l'entoilage réussi !"); initMatching(); }, 500);
            }
        } else {
            isProcessingMatch = true; 
            const eNode = selectedEnglishNode, fNode = selectedFrenchNode;
            eNode.className = "bg-brandOrange text-white p-3.5 rounded-2xl font-black text-center text-xs sm:text-sm shadow-md uppercase";
            fNode.className = "bg-brandOrange text-white p-3.5 rounded-2xl font-black text-center text-xs sm:text-sm shadow-md uppercase";
            const failWord = coutureData.find(f => f.en === eNode.dataset.id);
            if(failWord) registerError(failWord);
            processAnswerResult(false);
            setTimeout(() => {
                eNode.className = "bg-[#0E101A] border-2 border-brandGreen text-brandGreen p-3.5 rounded-2xl font-black text-center text-xs sm:text-sm uppercase";
                fNode.className = "bg-[#0E101A] border-2 border-brandOrange text-brandOrange p-3.5 rounded-2xl font-black text-center text-xs sm:text-sm uppercase";
                isProcessingMatch = false; 
            }, 800);
            selectedEnglishNode = null; selectedFrenchNode = null;
        }
    }
}

// --- MODULE 7 & 8 : ARMOIRE À LOGS ---
function renderBadgesUI() {
    const container = document.getElementById('badges-list'); if(!container) return; container.innerHTML = '';
    badgesDatabase.forEach(badge => {
        const isUnlocked = unlockedBadges.includes(badge.id); const div = document.createElement('div');
        div.className = `p-3 rounded-2xl border flex items-center gap-3 transition-all duration-200 ${isUnlocked ? 'bg-[#0E101A] border-green-950/40 opacity-100 shadow-md' : 'bg-[#161A2B]/40 border-white/5 opacity-40'}`;
        div.innerHTML = `
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-inner ${isUnlocked ? badge.color + ' text-white' : 'bg-gray-800 text-gray-500'}">
                ${badge.icon}
            </div>
            <div class="text-left">
                <h4 class="font-black text-xs text-white flex items-center gap-1 uppercase tracking-wide">${badge.title} ${isUnlocked ? '<i class="fa-solid fa-square-check text-brandGreen text-[11px]"></i>' : ''}</h4>
                <p class="text-[10px] text-gray-400 font-bold leading-tight mt-0.5">${badge.desc}</p>
            </div>`;
        container.appendChild(div);
    });
}

function renderErrorHistory() {
    const container = document.getElementById('error-history-list'); if (!container) return; container.innerHTML = '';
    if (errorHistory.length === 0) {
        container.innerHTML = `<p class="text-gray-400 italic text-center text-xs py-4">Lignes de fils rectilignes. Aucune anomalie détectée sur tes patrons ! 💎</p>`; return;
    }
    errorHistory.forEach(item => {
        const div = document.createElement('div'); div.className = "flex items-center justify-between p-3 bg-red-950/20 border border-red-900/40 rounded-xl text-xs";
        div.innerHTML = `
            <div class="flex items-center gap-2"><span>${item.emoji}</span><span class="font-black text-red-400 uppercase tracking-wide">${item.en}</span><span class="text-gray-400 font-bold">(${item.fr})</span></div>
            <button onclick="clearWordFromRevision('${item.en}')" class="text-brandGreen hover:underline font-black transition text-[11px] uppercase tracking-wider"><i class="fa-solid fa-check-double"></i> Ajusté</button>`;
        container.appendChild(div);
    });
}
function clearWordFromRevision(englishName) { removeError(englishName); renderErrorHistory(); }