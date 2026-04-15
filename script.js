// --- CONFIGURATION ---
const SUPABASE_URL = 'https://tfxpklkjtvznjjstodfj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmeHBrbGtqdHZ6bmpqc3RvZGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzMzNjIsImV4cCI6MjA5MTg0OTM2Mn0.wTe3CXMP2NI0BW_5nOpNDFNsVslfQCCMMpFYcBhYRTE';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const playerName = prompt("Enter your name:") || "Player " + Math.floor(Math.random() * 100);

// --- INITIALIZE BOARDS ---
const boardElement = document.getElementById('board');
const playerCardElement = document.getElementById('player-card');

// Create the 1-75 Caller Board
for (let i = 1; i <= 75; i++) {
    const cell = document.createElement('div');
    cell.className = 'num-cell';
    cell.id = `num-${i}`;
    cell.innerText = i;
    boardElement.appendChild(cell);
}

// Check if Host
if (new URLSearchParams(window.location.search).get('host') === 'true') {
    document.getElementById('admin-panel').style.display = 'block';
}

// --- REALTIME SYNC ---
_supabase
    .channel('game_state')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'game_state' }, payload => {
        const num = payload.new.last_number;
        const winner = payload.new.winner_name;

        if (num > 0) {
            document.getElementById('current-call').innerText = num;
            document.getElementById(`num-${num}`).classList.add('called');
        }
        if (winner) alert(`BINGO! ${winner} WON!`);
    })
    .subscribe();

// --- GAME FUNCTIONS ---
function generateCard() {
    playerCardElement.innerHTML = '';
    const items = Array.from({length: 75}, (_, i) => i + 1).sort(() => 0.5 - Math.random());
    const selected = items.slice(0, 24);

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'card-cell';
        if (i === 12) {
            cell.innerText = "FREE";
            cell.classList.add('marked', 'free-space');
        } else {
            cell.innerText = selected[i > 12 ? i - 1 : i];
            cell.onclick = function() { 
                this.classList.toggle('marked');
                checkBingo();
            };
        }
        playerCardElement.appendChild(cell);
    }
}

async function drawNumber() {
    const nextNum = Math.floor(Math.random() * 75) + 1;
    await _supabase.from('game_state').update({ last_number: nextNum }).eq('id', 1);
}

function checkBingo() {
    // Logic for win detection could go here
    // If user has 5 in a row, call signalWin()
}

async function signalWin() {
    await _supabase.from('game_state').update({ winner_name: playerName }).eq('id', 1);
}

async function resetGame() {
    await _supabase.from('game_state').update({ last_number: 0, winner_name: null }).eq('id', 1);
    location.reload();
}

generateCard();