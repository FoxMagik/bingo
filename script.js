const techEntries = [
    "Docker Issue", "Legacy Code", "YAML Indentation", "StackOverflow Copy",
    "Production Down", "Merge Conflict", "Refactoring", "Jira Ticket",
    "Coffee Run", "Kubernetes", "API 500 Error", "Cloud Costs",
    "Security Patch", "Unit Test Failed", "Zoom Echo", "Documentation?",
    "Dark Theme", "Hardware failure", "Warp Speed", "Deploy on Friday",
    "SQL Injection", "Infinite Loop", "Memory Leak", "CSS Centering",
    "NPM Install", "Git Push Force", "Caffeine Overdose", "Rubber Ducking"
];

function generateCard() {
    console.log("Attempting to generate card...");
    const cardElement = document.getElementById('bingo-card');
    
    if (!cardElement) {
        console.error("Could not find the bingo-card element!");
        return;
    }

    cardElement.innerHTML = '';
    
    // Shuffle
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
            cell.onclick = function() {
                this.classList.toggle('marked');
            };
        }
        cardElement.appendChild(cell);
    }
    console.log("Card generated successfully.");
}

function resetMarkers() {
    document.querySelectorAll('.cell').forEach(cell => {
        if (!cell.classList.contains('free-space')) {
            cell.classList.remove('marked');
        }
    });
}

// Fire the function when the script loads
generateCard();
