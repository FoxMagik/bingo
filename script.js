const techEntries = [
    "Curtis Raises\nHis Hand",
    "LAPS Is\nMentioned",
    "Teacher/Principal\nComplaint",
    "Terry/Curtis\nRepeat Ques",
    "Murphy Gets\nAnnoyed",
    "Can't Hear\nBrent R.",
    "Someone Thanks\nSomeone",
    "Loud Unmuted\nBackground",
    "Kyle Adds\nTo Meeting",
    "Fred Adds\nTo Meeting",
    "Meeting < 20\nMinutes",
    "Talking While\nMuted",
    "Accidental\nHand Raise",
    "Non-Brent\nMic Issues",
    "Loud Typing\nSounds",
    "Proceeds To\nTalk Anyway",
    "Curtis Has\nNothing",
    "Simon\nAttends",
    "Blame It\nOn SCCM",
    "Reminded Of\nBasic Job",
    "Virtual\nBackground",
    "Jay\nAttends",
    "VIP Praise\nFor Techs",
    "NO Site\nConstruction",
    "Meeting Is\nNOT Virtual",
    "Curtis Voice\nUp An Octave",
    "Talking Over\nEach Other",
    "Discuss This\nLater...",
    "Repeat To\nStall Meeting"
];

let markedStates = Array(25).fill(false);

function generateCard() {
    console.log("Initializing New Session...");
    const cardElement = document.getElementById('bingo-card');
    const winMsg = document.getElementById('win-message');
    
    // Reset Board State
    cardElement.innerHTML = '';
    cardElement.classList.remove('win-animation');
    winMsg.style.display = 'none';
    markedStates = Array(25).fill(false);
    markedStates[12] = true; 

    // Randomize
    const shuffled = [...techEntries].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 24);

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        if (i === 12) {
            cell.innerText = "FREE_SPACE";
            cell.classList.add('marked', 'free-space');
        } else {
            cell.innerText = selected[i > 12 ? i - 1 : i];
            // Event Listener for robust clicking
            cell.addEventListener('click', function() {
                toggleMark(this, i);
            });
        }
        cardElement.appendChild(cell);
    }
}

function toggleMark(element, index) {
    element.classList.toggle('marked');
    markedStates[index] = element.classList.contains('marked');
    console.log(`Cell ${index} toggled. State: ${markedStates[index]}`);
    
    if (checkWin()) {
        triggerWin();
    }
}

function checkWin() {
    const size = 5;
    // Rows
    for (let i = 0; i < size; i++) {
        let row = markedStates.slice(i * size, i * size + size);
        if (row.every(s => s)) return true;
    }
    // Cols
    for (let i = 0; i < size; i++) {
        let col = [0,1,2,3,4].map(j => markedStates[i + j * size]);
        if (col.every(s => s)) return true;
    }
    // Diagonals
    const d1 = [0, 6, 12, 18, 24].map(i => markedStates[i]);
    const d2 = [4, 8, 12, 16, 20].map(i => markedStates[i]);
    if (d1.every(s => s) || d2.every(s => s)) return true;

    return false;
}

function triggerWin() {
    document.getElementById('bingo-card').classList.add('win-animation');
    document.getElementById('win-message').style.display = 'block';
    console.log("%c BINGO DETECTED ", "background: #9ece6a; color: #1a1b26; font-weight: bold;");
}

function resetMarkers() {
    console.log("Clearing board...");
    markedStates = Array(25).fill(false);
    markedStates[12] = true;
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        if (index === 12) {
            cell.classList.add('marked');
        } else {
            cell.classList.remove('marked');
        }
    });
    
    document.getElementById('win-message').style.display = 'none';
    document.getElementById('bingo-card').classList.remove('win-animation');
}

// Attach Button Listeners
document.getElementById('new-card-btn').addEventListener('click', generateCard);
document.getElementById('clear-board-btn').addEventListener('click', resetMarkers);

// Initial Init
generateCard();
