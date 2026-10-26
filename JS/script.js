let secretVault = 0;
let attemptsCount = 0;
let winsCount = 0;
let roundOver = false;

const vault1 = document.getElementById("vault-1");
const vault2 = document.getElementById("vault-2");
const vault3 = document.getElementById("vault-3");

const messageText = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const winsText = document.getElementById("wins");

const nextRoundBtn = document.getElementById("next-round-btn");
const resetBtn = document.getElementById("reset-btn");

const allVaults = [vault1, vault2, vault3];

function initRound() {
    secretVault = Math.floor(Math.random() * 3) + 1;
    roundOver = false;

    messageText.textContent = "Aguardando sua escolha...";
    messageText.style.color = "#f5f6fa";

    allVaults.forEach(btn => {
        btn.classList.remove("correct", "wrong");
        btn.disabled = false; 
        btn.style.position = "static";
    });
}

function handleVaultClick(chosenNumber) {
    if (roundOver) return; 

    roundOver = true; 
    attemptsCount++; 

    allVaults.forEach((btn, index) => {
        const vaultNumber = index + 1;
        btn.disabled = true; 

        if (vaultNumber === secretVault) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("wrong");
        }
    });

    if (chosenNumber === secretVault) {
        winsCount++; 
        messageText.textContent = `🎉 Você abriu o Baú ${chosenNumber} e achou o tesouro!`;
        messageText.style.color = "#2ecc71";
    } else {
        messageText.textContent = `❌ Você abriu o Baú ${chosenNumber}... mas ele estava vazio!`;
        messageText.style.color = "#e74c3c";
    }

    attemptsText.textContent = attemptsCount;
    winsText.textContent = winsCount;
}

vault3.addEventListener("mouseenter", () => {
    if (!roundOver) {
        vault3.style.position = "absolute";
        const randomX = Math.floor(Math.random() * 60) + 20;
        const randomY = Math.floor(Math.random() * 40) + 10; 
        
        vault3.style.left = `${randomX}%`;
        vault3.style.top = `${randomY}%`;
    }
});

function resetAll() {
    attemptsCount = 0;
    winsCount = 0;
    attemptsText.textContent = "0";
    winsText.textContent = "0";
    initRound();
}

vault1.addEventListener("click", () => handleVaultClick(1));
vault2.addEventListener("click", () => handleVaultClick(2));
vault3.addEventListener("click", () => handleVaultClick(3));

nextRoundBtn.addEventListener("click", initRound);
resetBtn.addEventListener("click", resetAll);

initRound();