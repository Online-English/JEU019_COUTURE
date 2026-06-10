// =========================================================================
// --- BASE DE DONNÉES DE DESIGN TEXTILE (140 Mots de la Couture sur 7 Niveaux) ---
// =========================================================================
const coutureData = [
    // NIVEAU 1 : La Boîte à Couture & Outils de Base (20 mots)
    { en: "Needle", fr: "Aiguille", emoji: "🪡", level: 1 },
    { en: "Thread", fr: "Fil", emoji: "🧵", level: 1 },
    { en: "Scissors", fr: "Ciseaux", emoji: "✂️", level: 1 },
    { en: "Pin", fr: "Épingle", emoji: "📍", level: 1 },
    { en: "Thimble", fr: "Dé à coudre", emoji: "🪙", level: 1 },
    { en: "Tape measure", fr: "Mètre ruban", emoji: "📏", level: 1 },
    { en: "Pincushion", fr: "Pelote à épingles", emoji: "📍", level: 1 },
    { en: "Chalk", fr: "Craie de tailleur", emoji: "🖍️", level: 1 },
    { en: "Button", fr: "Bouton", emoji: "🔘", level: 1 },
    { en: "Zipper", fr: "Fermeture Éclair", emoji: "🤐", level: 1 },
    { en: "Safety pin", fr: "Épingle de nourrice", emoji: "🧷", level: 1 },
    { en: "Seam ripper", fr: "Découd-vite", emoji: "🪝", level: 1 },
    { en: "Elastic", fr: "Élastique", emoji: "〰️", level: 1 },
    { en: "Ribbon", fr: "Ruban", emoji: "🎀", level: 1 },
    { en: "Snap", fr: "Bouton-pression", emoji: "🔘", level: 1 },
    { en: "Hook", fr: "Agrafe", emoji: "🪝", level: 1 },
    { en: "Threader", fr: "Enfile-aiguille", emoji: "🧬", level: 1 },
    { en: "Fabric", fr: "Tissu", emoji: "⚗️", level: 1 },
    { en: "Iron", fr: "Fer à repasser", emoji: "💨", level: 1 },
    { en: "Shears", fr: "Ciseaux de couturier", emoji: "✂️", level: 1 },

    // NIVEAU 2 : La Machine à Coudre & Mécanique (20 mots)
    { en: "Sewing machine", fr: "Machine à coudre", emoji: "⚙️", level: 2 },
    { en: "Bobbin", fr: "Canette", emoji: "⭕", level: 2 },
    { en: "Spool", fr: "Bobine", emoji: "🧵", level: 2 },
    { en: "Presser foot", fr: "Pied-de-biche", emoji: "🦿", level: 2 },
    { en: "Stitch", fr: "Point de couture", emoji: "〰️", level: 2 },
    { en: "Feed dog", fr: "Griffe d'entraînement", emoji: "⚙️", level: 2 },
    { en: "Handwheel", fr: "Volant", emoji: "⭕", level: 2 },
    { en: "Bobbin case", fr: "Boîtier de canette", emoji: "📥", level: 2 },
    { en: "Needle plate", fr: "Plaque à aiguille", emoji: "🔲", level: 2 },
    { en: "Thread guide", fr: "Guide-fil", emoji: "📍", level: 2 },
    { en: "Pedal", fr: "Pédale / Rhéostat", emoji: "👣", level: 2 },
    { en: "Overlocker", fr: "Surjeteuse", emoji: "⚙️", level: 2 },
    { en: "Tension", fr: "Tension du fil", emoji: "📊", level: 2 },
    { en: "Needle bar", fr: "Barre à aiguille", emoji: "➖", level: 2 },
    { en: "Take-up lever", fr: "Levier releveur de fil", emoji: "🪝", level: 2 },
    { en: "Reverse lever", fr: "Levier de marche arrière", emoji: "↩️", level: 2 },
    { en: "Stitch selector", fr: "Sélecteur de point", emoji: "🎛️", level: 2 },
    { en: "Spool pin", fr: "Porte-bobine", emoji: "📍", level: 2 },
    { en: "Light bulb", fr: "Ampoule", emoji: "💡", level: 2 },
    { en: "Drive belt", fr: "Courroie d'entraînement", emoji: "🎗️", level: 2 },

    // NIVEAU 3 : Les Matières & Textiles (20 mots)
    { en: "Cotton", fr: "Coton", emoji: "☁️", level: 3 },
    { en: "Wool", fr: "Laine", emoji: "🐑", level: 3 },
    { en: "Silk", fr: "Soie", emoji: "🐛", level: 3 },
    { en: "Linen", fr: "Lin", emoji: "🌱", level: 3 },
    { en: "Denim", fr: "Toile de jean", emoji: "👖", level: 3 },
    { en: "Leather", fr: "Cuir", emoji: "💼", level: 3 },
    { en: "Polyester", fr: "Polyester", emoji: "🧪", level: 3 },
    { en: "Velvet", fr: "Velours", emoji: "👑", level: 3 },
    { en: "Satin", fr: "Satin", emoji: "✨", level: 3 },
    { en: "Lace", fr: "Dentelle", emoji: "🕸️", level: 3 },
    { en: "Fleece", fr: "Polaire", emoji: "❄️", level: 3 },
    { en: "Nylon", fr: "Nylon", emoji: "🧪", level: 3 },
    { en: "Canvas", fr: "Canevas / Grosse toile", emoji: "🖼️", level: 3 },
    { en: "Lining", fr: "Doublure", emoji: "🧥", level: 3 },
    { en: "Interfacing", fr: "Entoilage thermocollant", emoji: "🧱", level: 3 },
    { en: "Knit", fr: "Maille / Tricot", emoji: "🪢", level: 3 },
    { en: "Woven", fr: "Tissu chaîne et trame", emoji: "🏁", level: 3 },
    { en: "Suede", fr: "Daim / Suède", emoji: "👞", level: 3 },
    { en: "Corduroy", fr: "Velours côtelé", emoji: "〰️", level: 3 },
    { en: "Jersey", fr: "Jersey", emoji: "👕", level: 3 },

    // NIVEAU 4 : Patronage, Tracé & Coupe (20 mots)
    { en: "Pattern", fr: "Patron", emoji: "📋", level: 4 },
    { en: "Measurement", fr: "Mesure", emoji: "📏", level: 4 },
    { en: "Layout", fr: "Disposition / Plan de coupe", emoji: "🗺️", level: 4 },
    { en: "Grainline", fr: "Droit-fil", emoji: "⬇️", level: 4 },
    { en: "Bias", fr: "Biais", emoji: "↗️", level: 4 },
    { en: "Fold", fr: "Pli du tissu", emoji: "↕️", level: 4 },
    { en: "Seam allowance", fr: "Valeur de couture", emoji: "📏", level: 4 },
    { en: "Ironing board", fr: "Planche à repasser", emoji: "🛹", level: 4 },
    { en: "Rotary cutter", fr: "Cutter rotatif", emoji: "⭕", level: 4 },
    { en: "Cutting mat", fr: "Tapis de coupe", emoji: "🔲", level: 4 },
    { en: "Pattern weight", fr: "Poids pour patron", emoji: "🏋️", level: 4 },
    { en: "Notch", fr: "Cran / Encoche", emoji: "✂️", level: 4 },
    { en: "Dart", fr: "Pince", emoji: "📐", level: 4 },
    { en: "Pleat", fr: "Pli formé", emoji: "🗂️", level: 4 },
    { en: "Gathers", fr: "Fronces", emoji: "〰️", level: 4 },
    { en: "Hemline", fr: "Ligne d'ourlet", emoji: "📏", level: 4 },
    { en: "Sizing", fr: "Taillage / Gradation", emoji: "📊", level: 4 },
    { en: "Muslin", fr: "Toile d'essai", emoji: "👕", level: 4 },
    { en: "Tracing paper", fr: "Papier calque", emoji: "📄", level: 4 },
    { en: "Carbon paper", fr: "Papier carbone", emoji: "📄", level: 4 },

    // NIVEAU 5 : Techniques d'Assemblage & Points (20 mots)
    { en: "Seam", fr: "Couture / Assemblage", emoji: "🔗", level: 5 },
    { en: "Hem", fr: "Ourlet", emoji: "🏁", level: 5 },
    { en: "Straight stitch", fr: "Point droit", emoji: "➖", level: 5 },
    { en: "Zigzag stitch", fr: "Point zigzag", emoji: "〰️", level: 5 },
    { en: "Baste", fr: "Bâtir / Faufiler", emoji: "🧵", level: 5 },
    { en: "Topstitch", fr: "Surpiquer", emoji: "🔝", level: 5 },
    { en: "Backstitch", fr: "Point d'arrêt", emoji: "🔙", level: 5 },
    { en: "Overlock", fr: "Surjet", emoji: "🪢", level: 5 },
    { en: "Buttonhole", fr: "Boutonnière", emoji: "🕳️", level: 5 },
    { en: "Piping", fr: "Passepoil", emoji: "🥖", level: 5 },
    { en: "Binding", fr: "Bordure / Enforme", emoji: "🎗️", level: 5 },
    { en: "Blind hem", fr: "Ourlet invisible", emoji: "👁️‍🗨️", level: 5 },
    { en: "Gathering", fr: "Fronçage", emoji: "🌊", level: 5 },
    { en: "Quilting", fr: "Matelassage", emoji: "🔲", level: 5 },
    { en: "Pleating", fr: "Plissage", emoji: "🗂️", level: 5 },
    { en: "Edge", fr: "Bord du tissu", emoji: "📐", level: 5 },
    { en: "Raw edge", fr: "Bord vif", emoji: "💥", level: 5 },
    { en: "Slipstitch", fr: "Point glissé", emoji: "⛷️", level: 5 },
    { en: "Staystitch", fr: "Couture de maintien", emoji: "🛑", level: 5 },
    { en: "Interlock", fr: "Point de recouvrement", emoji: "🪢", level: 5 },

    // NIVEAU 6 : Anatomie du Vêtement & Mercerie (20 mots)
    { en: "Sleeve", fr: "Manche", emoji: "🧥", level: 6 },
    { en: "Collar", fr: "Col", emoji: "👔", level: 6 },
    { en: "Pocket", fr: "Poche", emoji: "📥", level: 6 },
    { en: "Cuff", fr: "Poignet de manche", emoji: "✊", level: 6 },
    { en: "Waistband", fr: "Ceinture", emoji: "🎫", level: 6 },
    { en: "Placket", fr: "Patte de boutonnage", emoji: "➖", level: 6 },
    { en: "Facing", fr: "Parmenture", emoji: "🛡️", level: 6 },
    { en: "Eyelet", fr: "Œillet", emoji: "⭕", level: 6 },
    { en: "Velcro", fr: "Bande auto-agrippante", emoji: "🤝", level: 6 },
    { en: "Fringe", fr: "Franges", emoji: "🌾", level: 6 },
    { en: "Tassel", fr: "Gland / Pompon", emoji: "📿", level: 6 },
    { en: "Trim", fr: "Garniture / Galon", emoji: "🎀", level: 6 },
    { en: "Label", fr: "Étiquette", emoji: "🏷️", level: 6 },
    { en: "Seam binding", fr: "Ruban de couture", emoji: "🎗️", level: 6 },
    { en: "Shoulder pad", fr: "Épaulette", emoji: "📐", level: 6 },
    { en: "Interlining", fr: "Doublure intermédiaire", emoji: "🥞", level: 6 },
    { en: "Hook and eye", fr: "Agrafe et porte-agrafe", emoji: "🔗", level: 6 },
    { en: "Drawstring", fr: "Cordon de serrage", emoji: "🧵", level: 6 },
    { en: "Loop", fr: "Passant / Bride", emoji: "⭕", level: 6 },
    { en: "Interfacing", fr: "Entoilage de structure", emoji: "🧱", level: 6 },

    // NIVEAU 7 : Haute Couture & Fashion Studio (20 mots)
    { en: "Fashion", fr: "Mode", emoji: "✨", level: 7 },
    { en: "Designer", fr: "Styliste / Créateur", emoji: "🎨", level: 7 },
    { en: "Atelier", fr: "Atelier de création", emoji: "🏭", level: 7 },
    { en: "Collection", fr: "Collection de mode", emoji: "🧥", level: 7 },
    { en: "Runway", fr: "Podium / Défilé", emoji: "🛣️", level: 7 },
    { en: "Model", fr: "Mannequin de défilé", emoji: "🚶‍♀️", level: 7 },
    { en: "Dress form", fr: "Mannequin de couture", emoji: "🧍", level: 7 },
    { en: "Sketch", fr: "Croquis de mode", emoji: "📝", level: 7 },
    { en: "Drape", fr: "Drapé / Moulage", emoji: "🌊", level: 7 },
    { en: "Fitting", fr: "Essayage", emoji: "🪞", level: 7 },
    { en: "Alteration", fr: "Retouche / Modification", emoji: "🛠️", level: 7 },
    { en: "Silhouette", fr: "Silhouette", emoji: "👤", level: 7 },
    { en: "Garment", fr: "Vêtement fini", emoji: "👗", level: 7 },
    { en: "Fabric drape", fr: "Tombé du tissu", emoji: "📉", level: 7 },
    { en: "Toile", fr: "Toile de prototype", emoji: "👕", level: 7 },
    { en: "Trend", fr: "Tendance", emoji: "📈", level: 7 },
    { en: "Tailoring", fr: "Tailleur / Haute façon", emoji: "👔", level: 7 },
    { en: "Wardrobe", fr: "Garde-robe", emoji: "🚪", level: 7 },
    { en: "Couture", fr: "Haute couture", emoji: "👑", level: 7 },
    { en: "Texture", fr: "Texture", emoji: "🧱", level: 7 }
];

// --- ÉTATS GÉNÉRAUX & STATISTIQUES ---
let currentStreak = 0, maxStreak = 0, totalPoints = 0;
let highScores = { quiz: 0, speak: 0, timeattack: 0 };
let favoriteItems = [];
let errorHistory = []; 
let unlockedBadges = []; 
let audioSpeed = 1.0;
let filterOnlyFavs = false;
let searchDirection = 'EN_FR';
let globalAudioCtx = null; 
let selectedVocabularyLevel = 1; 

// --- CONFIGURATION DES BADGES DE MODE ---
const badgesDatabase = [
    { id: "first_perfect", title: "Point Parfait ! 🎯", desc: "Un perfect de 10/10 en Fitting. Aucune fronce ni pli.", icon: "🪡", color: "bg-amber-500 shadow-[0_4px_10px_rgba(245,158,11,0.4)]" },
    { id: "streak_15", title: "Série Haute-Couture ! 🔥", desc: "15 assemblages validés d'affilée sans casser le fil.", icon: "🔥", color: "bg-red-500 shadow-[0_4px_10px_rgba(239,68,68,0.4)]" },
    { id: "time_20", title: "Défilé Flash 🕒", desc: "20 tenues complétées en mode Défilé Flash !", icon: "🚀", color: "bg-cyan-500 shadow-[0_4px_10px_rgba(6,182,212,0.4)]" },
    { id: "polyglotte", title: "Directeur Artistique 🦾", desc: "Tu as débloqué l'accès complet aux salons de Haute Couture.", icon: "🔑", color: "bg-purple-500 shadow-[0_4px_10px_rgba(168,85,247,0.4)]" }
];

function getNextExerciseWord() {
    const currentLevelWords = coutureData.filter(f => f.level === parseInt(selectedVocabularyLevel));
    const currentLevelErrors = errorHistory.filter(err => err.level === parseInt(selectedVocabularyLevel));
    if (currentLevelErrors.length > 0 && Math.random() < 0.35) {
        return currentLevelErrors[Math.floor(Math.random() * currentLevelErrors.length)];
    }
    return currentLevelWords[Math.floor(Math.random() * currentLevelWords.length)];
}

function checkAndUnlockBadge(badgeId) {
    if (!unlockedBadges.includes(badgeId)) {
        unlockedBadges.push(badgeId);
        localStorage.setItem('oe_unlocked_badges_sew', JSON.stringify(unlockedBadges));
        triggerConfetti();
        if(typeof renderBadgesUI === 'function') renderBadgesUI();
    }
}

// --- MODULE AUDIO ---
let preferredVoice = null;
function initVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;
    let bestVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en') && (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Neural') || voice.name.includes('Premium')));
    if (!bestVoice) bestVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en') && !voice.name.includes('Desktop'));
    if (!bestVoice) bestVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en'));
    if (bestVoice) preferredVoice = bestVoice;
}
if ('speechSynthesis' in window) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) window.speechSynthesis.onvoiceschanged = initVoices;
    initVoices();
}

function setAudioSpeed(speed) {
    audioSpeed = speed;
    const btnNormal = document.getElementById('speed-normal');
    const btnSlow = document.getElementById('speed-slow');
    if (btnNormal && btnSlow) {
        if (speed === 1.0) {
            btnNormal.className = "px-3 py-1.5 bg-brandBlue text-white rounded-lg font-black shadow-sm border border-brandGreen";
            btnSlow.className = "px-3 py-1.5 bg-gray-900 text-gray-300 rounded-lg flex items-center gap-1 hover:bg-gray-800 font-bold border border-white/10";
        } else {
            btnNormal.className = "px-3 py-1.5 bg-gray-900 text-gray-300 rounded-lg font-bold hover:bg-gray-800 border border-white/10";
            btnSlow.className = "px-3 py-1.5 bg-brandBlue text-white rounded-lg flex items-center gap-1 font-black shadow-sm border border-brandGreen";
        }
    }
}

function playAudio(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = audioSpeed;
        if (!preferredVoice) initVoices();
        if (preferredVoice) utterance.voice = preferredVoice;
        window.speechSynthesis.speak(utterance);
    } else {
        const encodedText = encodeURIComponent(text.toLowerCase());
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodedText}`;
        const audio = new Audio(audioUrl);
        audio.playbackRate = audioSpeed;
        audio.play().catch(e => console.log("Audio failure:", e));
    }
}

function playSoundEffect(type) {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    if (!globalAudioCtx) globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
    const osc = globalAudioCtx.createOscillator();
    const gain = globalAudioCtx.createGain();
    osc.connect(gain); gain.connect(globalAudioCtx.destination);
    if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, globalAudioCtx.currentTime); 
        osc.frequency.setValueAtTime(880.00, globalAudioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, globalAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, globalAudioCtx.currentTime + 0.3);
        osc.start(); osc.stop(globalAudioCtx.currentTime + 0.3);
    } else if (type === 'fail') {
        osc.frequency.setValueAtTime(220.00, globalAudioCtx.currentTime);
        osc.frequency.setValueAtTime(130.81, globalAudioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, globalAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, globalAudioCtx.currentTime + 0.4);
        osc.start(); osc.stop(globalAudioCtx.currentTime + 0.4);
    }
}

function triggerConfetti() {
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = ['#FF0066', '#00E5FF', '#9D4EDD', '#FFD166'][Math.floor(Math.random() * 4)];
        confetti.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
        confetti.style.animationDelay = Math.random() * 1.2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// --- CARNET DE RETOUCHES ---
function registerError(wordObj) {
    if (!errorHistory.some(f => f.en === wordObj.en)) {
        errorHistory.push(wordObj);
        localStorage.setItem('oe_error_history_sew', JSON.stringify(errorHistory));
    }
}
function removeError(englishName) {
    errorHistory = errorHistory.filter(f => f.en !== englishName);
    localStorage.setItem('oe_error_history_sew', JSON.stringify(errorHistory));
}

function getUserPlayerLevel() {
    return Math.floor(totalPoints / 150) + 1;
}

// --- GRADES CARRIÈRE ---
function updateLevelAndTitle() {
    const pLevel = getUserPlayerLevel();
    const levelEl = document.getElementById('user-level');
    const titleEl = document.getElementById('user-title');
    if (levelEl) levelEl.innerText = pLevel;

    let title = "Noob de l'Aiguille 🪡";
    if (pLevel >= 3) title = "Customiseur de Friperie 👕";
    if (pLevel >= 6) title = "Styliste Streetwear Independent 🧥";
    if (pLevel >= 5) checkAndUnlockBadge("polyglotte"); 
    if (pLevel >= 9) title = "Modéliste Senior d'Atelier ✂️";
    if (pLevel >= 12) title = "Maître Tailleur Légendaire 👑";
    if (pLevel >= 15) title = "Icône de la Fashion Week / G.O.A.T 🌍";

    if (titleEl) titleEl.innerText = title;
    if (typeof updateLevelLockUI === 'function') updateLevelLockUI();
}

function resetStats() {
    if (confirm("Confirmer la fermeture de ton book d'atelier et le reset complet de ta progression ?")) {
        const keysToRemove = ['oe_total_points_sew', 'oe_high_quiz_sew', 'oe_high_speak_sew', 'oe_high_timeattack_sew', 'oe_max_streak_sew', 'oe_fav_sew', 'oe_error_history_sew', 'oe_unlocked_badges_sew'];
        keysToRemove.forEach(key => localStorage.removeItem(key));
        totalPoints = 0; highScores = { quiz: 0, speak: 0, timeattack: 0 }; maxStreak = 0; currentStreak = 0; errorHistory = []; unlockedBadges = []; favoriteItems = [];
        document.getElementById('total-points').innerText = totalPoints;
        document.getElementById('streak-count').innerText = currentStreak;
        document.getElementById('stat-high-quiz').innerText = 0;
        document.getElementById('stat-high-speak').innerText = 0;
        document.getElementById('stat-high-timeattack').innerText = 0;
        document.getElementById('stat-max-streak').innerText = 0;
        updateLevelAndTitle();
        if (typeof renderDict === 'function') renderDict();
        if (typeof updateFlashcard === 'function') updateFlashcard();
        if (typeof renderBadgesUI === 'function') renderBadgesUI();
        if (typeof renderErrorHistory === 'function') renderErrorHistory();
        alert("Atelier vidé. Prêt pour les croquis de pré-saison !");
    }
}

function saveStats() {
    localStorage.setItem('oe_total_points_sew', totalPoints);
    localStorage.setItem('oe_high_quiz_sew', highScores.quiz);
    localStorage.setItem('oe_high_speak_sew', highScores.speak); 
    localStorage.setItem('oe_high_timeattack_sew', highScores.timeattack);
    localStorage.setItem('oe_max_streak_sew', maxStreak);
}

function loadStats() {
    totalPoints = parseInt(localStorage.getItem('oe_total_points_sew')) || 0;
    highScores.quiz = parseInt(localStorage.getItem('oe_high_quiz_sew')) || 0;
    highScores.speak = parseInt(localStorage.getItem('oe_high_speak_sew')) || 0; 
    highScores.timeattack = parseInt(localStorage.getItem('oe_high_timeattack_sew')) || 0;
    maxStreak = parseInt(localStorage.getItem('oe_max_streak_sew')) || 0;
    favoriteItems = JSON.parse(localStorage.getItem('oe_fav_sew')) || [];
    errorHistory = JSON.parse(localStorage.getItem('oe_error_history_sew')) || [];
    unlockedBadges = JSON.parse(localStorage.getItem('oe_unlocked_badges_sew')) || [];
    
    document.documentElement.classList.add('dark');
    
    const totalPointsEl = document.getElementById('total-points');
    if (totalPointsEl) totalPointsEl.innerText = totalPoints;
    updateLevelAndTitle();
}
// --- MODULE INJECTÉ : GESTION INTERACTIVE DU DARK MODE ---
function toggleDarkMode() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        if (icon) icon.className = "fa-solid fa-shirt text-brandOrange";
    } else {
        html.classList.add('dark');
        if (icon) icon.className = "fa-solid fa-shirt text-brandGreen";
    }
}