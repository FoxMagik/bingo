const techEntries = [
    "Docker Issue", "Legacy Code", "YAML Indentation", "StackOverflow Copy",
    "Production Down", "Merge Conflict", "Refactoring", "Jira Ticket",
    "Coffee Run", "Kubernetes", "API 500 Error", "Cloud Costs",
    "Security Patch", "Unit Test Failed", "Zoom Echo", "Documentation?",
    "Dark Theme", "Hardware failure", "Warp Speed", "Deploy on Friday",
    "SQL Injection", "Infinite Loop", "Memory Leak", "CSS Centering",
    "NPM Install", "Git Push Force", "Caffeine Overdose", "Rubber Ducking"
];

// Keep your techEntries array at the top as is

let markedStates = Array(25).fill(false);
markedStates[12] = true; // Free space is pre-marked

function generateCard() {
    const cardElement = document.getElementById('bingo-card');
    cardElement.innerHTML = '';
    markedStates = Array(25).fill(false);
    markedStates[12] = true; 

    const shuffled = [...techEntries].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 24);

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i; // Store the index for win checking
        
        if (i === 12) {
            cell.innerText = "FREE_SPACE";
            cell.classList.add('marked', 'free-space');
        } else {
            cell.innerText = selected[i > 12 ? i - 1 : i];
            cell.onclick = function() {
                toggleMark(this, i);
            };
        }
        cardElement.appendChild(cell);
    }
}

function toggleMark(element, index) {
    element.classList.toggle('marked');
    markedStates[index] = element.classList.contains('marked');
    
    if (checkWin()) {
        triggerWin();
    }
}

function checkWin() {
    const size = 5;
    
    // Check Rows
    for (let i = 0; i < size; i++) {
        let row = markedStates.slice(i * size, i * size + size);
        if (row.every(state => state)) return true;
    }

    // Check Columns
    for (let i = 0; i < size; i++) {
        let col = [0, 1, 2, 3, 4].map(j => markedStates[i + j * size]);
        if (col.every(state => state)) return true;
    }

    // Check Diagonals
    const diag1 = [0, 6, 12, 18, 24].map(i => markedStates[i]);
    const diag2 = [4, 8, 12, 16, 20].map(i => markedStates[i]);
    
    if (diag1.every(state => state) || diag2.every(state => state)) return true;

    return false;
}

function triggerWin() {
    const board = document.getElementById('bingo-card');
    const msg = document.getElementById('win-message');
    
    board.classList.add('win-animation');
    msg.style.display = 'block';

    // Log it to the console for the true tech experience
    console.log("%c BINGO DETECTED ", "background: #9ece6a; color: #1a1b26; font-weight: bold;");
}
