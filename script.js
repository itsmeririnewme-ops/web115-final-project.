let storyImage = document.getElementById("story-image");
let paragraph1 = document.getElementById("paragraph1");
let paragraph2 = document.getElementById("paragraph2");
let paragraph3 = document.getElementById("paragraph3");

let choice1Button = document.getElementById("choice1-button");
let choice2Button = document.getElementById("choice2-button");
let choice3Button = document.getElementById("choice3-button");
let restartButton = document.getElementById("restart-button");

let health = 100;
let sanity = 100;
let score = 0;
let inventory = [];

// Game settings
let currentScene = "start";
let doorIsOpen = false;
let gameOver = false;
let timeLeft = 60;
let timerInterval;

// Update the countdown timer
function updateTimer() {
    timerDisplay.textContent = "Time Remaining: " + timeLeft + " seconds";
}

// Start the countdown
function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(function() {

        if (gameOver) {
            clearInterval(timerInterval);
            return;
        }

        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            gameOver = true;

            choice1Button.style.display = "none";
            choice2Button.style.display = "none";
            choice3Button.style.display = "none";

            codeInput.style.display = "none";
            codeButton.style.display = "none";
            codeMessage.style.display = "none";

            showScene("badEnding");

            addJournalEntry("Time ran out! Bentley was trapped in the jungle.");
        }

    }, 1000);
}

// Create the game information area
let gameStats = document.createElement("div");
let inventoryDisplay = document.createElement("div");

// Create the health progress bar
let healthLabel = document.createElement("p");
let healthBar = document.createElement("progress");

healthBar.max = 100;
healthBar.value = 100;

healthLabel.textContent = "Bentley's Health:";

let journalDisplay = document.createElement("div");
let timerDisplay = document.createElement("div");
let tooltip = document.createElement("div");

// Create the secret code input
let codeInput = document.createElement("input");
let codeButton = document.createElement("button");
let codeMessage = document.createElement("p");

codeInput.type = "text";
codeInput.placeholder = "Enter the secret code";

codeInput.style.display = "none";
codeButton.style.display = "none";
codeMessage.style.display = "none";

codeButton.textContent = "Submit Code";

// Add the new elements to the webpage
document.body.appendChild(gameStats);
document.body.appendChild(inventoryDisplay);
document.body.appendChild(healthLabel);
document.body.appendChild(healthBar);
document.body.appendChild(journalDisplay);
document.body.appendChild(timerDisplay);
document.body.appendChild(tooltip);

document.body.appendChild(codeInput);
document.body.appendChild(codeButton);
document.body.appendChild(codeMessage);

// Give the elements some basic styling
gameStats.style.padding = "10px";
inventoryDisplay.style.padding = "10px";
journalDisplay.style.padding = "10px";
timerDisplay.style.padding = "10px";

tooltip.style.display = "none";

// Show a tooltip when hovering over the story image
storyImage.addEventListener("mouseover", function() {
    tooltip.textContent = "Explore the Amazon and discover hidden clues!";
    tooltip.style.display = "block";
});

// Hide the tooltip when the mouse leaves the image
storyImage.addEventListener("mouseout", function() {
    tooltip.style.display = "none";
});

// Player class
class Player {
    constructor(name, health, sanity, score) {
        this.name = name;
        this.health = health;
        this.sanity = sanity;
        this.score = score;
    }

    takeDamage(amount) {
        this.health -= amount;

        if (this.health < 0) {
            this.health = 0;
        }
    }

    loseSanity(amount) {
        this.sanity -= amount;

        if (this.sanity < 0) {
            this.sanity = 0;
        }
    }

    addScore(points) {
        this.score += points;
    }
}

// Item class
class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

// Story scene class
class StoryScene {
    constructor(text1, text2, text3, image) {
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.image = image;
    }
}

// Create the player
let player = new Player("Bentley", health, sanity, score);

// Create some collectible items
let journalItem = new Item("Torn Journal", "A journal belonging to Dr. Reed.");
let compassItem = new Item("Broken Compass", "An old compass that may reveal a direction.");
let mapItem = new Item("Ancient Map", "A map showing the location of an ancient temple.");

// Create the story scenes
let scenes = {
    start: new StoryScene(
        "Bentley enters the Amazon rainforest searching for Dr. George Reed.",
        "Near an abandoned campsite, he discovers a torn journal, a broken compass, and a strange map.",
        "The map appears to lead to an ancient temple. Bentley must decide where to go next.",
        "https://placehold.co/600x400?text=Amazon+Rainforest"
    ),

    river: new StoryScene(
        "Bentley follows a narrow trail and reaches a dangerous river.",
        "The water is moving quickly, but he notices a small wooden bridge nearby.",
        "He can try crossing the bridge or search the riverbank for another way.",
        "https://placehold.co/600x400?text=Amazon+River"
    ),

    temple: new StoryScene(
        "Bentley finally reaches an ancient temple hidden beneath thick jungle vines.",
        "Inside, he finds strange symbols carved into the walls.",
        "A large stone door blocks the path. There must be a way to open it.",
        "https://placehold.co/600x400?text=Ancient+Temple"
    ),

    escape: new StoryScene(
        "Bentley decides the jungle is too dangerous and turns back.",
        "He manages to find his way out of the rainforest.",
        "He survives, but Dr. Reed and the temple's secrets remain missing.",
        "https://placehold.co/600x400?text=Jungle+Escape"
    ),

    goodEnding: new StoryScene(
        "Bentley solves the temple puzzle and discovers Dr. Reed trapped inside.",
        "He frees Dr. Reed and helps him escape the ancient temple.",
        "Together, they leave the jungle with the mystery of the lost civilization finally solved!",
        "https://placehold.co/600x400?text=Good+Ending"
    ),

    badEnding: new StoryScene(
        "Bentley triggers an ancient trap inside the temple.",
        "The floor begins to collapse, and he cannot find a way out.",
        "The jungle keeps its secrets. Bentley's adventure has come to an end.",
        "https://placehold.co/600x400?text=Game+Over"
    )
};

// Display a story scene on the page
function showScene(sceneName) {
    let scene = scenes[sceneName];

    paragraph1.textContent = scene.text1;
    paragraph2.textContent = scene.text2;
    paragraph3.textContent = scene.text3;

    storyImage.src = scene.image;

    currentScene = sceneName;

    updateStats();
}

// Update the player's stats on the page
function updateStats() {
    gameStats.textContent =
        "Health: " + player.health +
        " | Sanity: " + player.sanity +
        " | Score: " + player.score;

    healthBar.value = player.health;
    healthLabel.textContent = "Bentley's Health: " + player.health + "/100";
}

// Update the inventory on the page
function updateInventory() {
    inventoryDisplay.textContent = "Inventory:";

    for (let i = 0; i < inventory.length; i++) {
        let itemElement = document.createElement("p");

        itemElement.textContent =
            inventory[i].name + ": " + inventory[i].description;

        inventoryDisplay.appendChild(itemElement);
    }
}

// Add an item to the player's inventory
function collectItem(item) {
    inventory.push(item);

    updateInventory();

    player.addScore(10);

    // Play a sound when an item is collected
    let collectSound = new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg");

    collectSound.volume = 0.5;

    collectSound.play().catch(function(error) {
    console.log("Sound could not play:", error);
    });

    updateStats();
}

// Add an entry to the adventure journal
function addJournalEntry(message) {
    let entry = document.createElement("p");

    entry.textContent = message;

    journalDisplay.appendChild(entry);
}

// Check the secret temple code
codeButton.addEventListener("click", function() {

    let code = codeInput.value;

    if (!/^\d{4}$/.test(code)) {
        codeMessage.textContent = "Please enter exactly four numbers.";
    }

    else if (code === "1842") {
        doorIsOpen = true;
        codeMessage.textContent = "Correct code! The stone door opens!";
        addJournalEntry("Bentley entered the correct temple code.");

        paragraph3.textContent = "The stone door opens! Bentley can now rescue Dr. Reed.";
    }

    else {
        codeMessage.textContent = "Incorrect code. Try again!";
    }

});

// First choice button
choice1Button.addEventListener("click", function() {

    if (gameOver) {
        return;
    }

    if (currentScene === "start") {
        collectItem(journalItem);
        addJournalEntry("Bentley found Dr. Reed's torn journal.");

        showScene("river");

        choice1Button.textContent = "Cross the bridge";
        choice2Button.textContent = "Search the riverbank";
        choice3Button.textContent = "Turn back";
    }

    else if (currentScene === "river") {
        player.takeDamage(10);
        player.addScore(15);

        addJournalEntry("Bentley crossed the dangerous bridge.");

        showScene("temple");

        // Show a delayed message after reaching the temple
        setTimeout(function() {

        if (currentScene === "temple" && !gameOver) {
        addJournalEntry("A strange sound echoes from inside the temple...");
        }
    }, 2000);

        choice1Button.textContent = "Open the stone door";
        choice2Button.textContent = "Look for clues";
        choice3Button.textContent = "Escape";
    }

    else if (currentScene === "temple") {
        if (doorIsOpen) {
            showScene("goodEnding");
            gameOver = true;
            codeInput.style.display = "none";
            codeButton.style.display = "none";
            codeMessage.style.display = "none";
        } else {
            player.takeDamage(20);
            showScene("badEnding");
            gameOver = true;
            codeInput.style.display = "none";
            codeButton.style.display = "none";
            codeMessage.style.display = "none";
        }
    choice1Button.style.display = "none";
    choice2Button.style.display = "none";
    choice3Button.style.display = "none";
    }

    updateStats();
});

// Second choice button
choice2Button.addEventListener("click", function() {

    if (gameOver) {
        return;
    }

    if (currentScene === "start") {
        collectItem(compassItem);
        addJournalEntry("Bentley picked up the broken compass.");

        showScene("river");

        choice1Button.textContent = "Cross the bridge";
        choice2Button.textContent = "Search the riverbank";
        choice3Button.textContent = "Turn back";
    }

    else if (currentScene === "river") {
        collectItem(mapItem);
        addJournalEntry("Bentley discovered an ancient map.");

        player.addScore(15);

        showScene("temple");

        choice1Button.textContent = "Open the stone door";
        choice2Button.textContent = "Look for clues";
        choice3Button.textContent = "Escape";
    }

    else if (currentScene === "temple") {
    paragraph2.textContent = "Bentley discovers symbols carved into the temple wall.";
    paragraph3.textContent = "Enter the four-digit code to unlock the stone door.";

    codeInput.style.display = "block";
    codeButton.style.display = "block";
    codeMessage.style.display = "block";

    addJournalEntry("Bentley discovered a secret code puzzle.");
}

    updateStats();
});

// Third choice button
choice3Button.addEventListener("click", function() {

    if (gameOver) {
        return;
    }

    if (currentScene === "start" || currentScene === "river") {
        player.addScore(5);
        addJournalEntry("Bentley decided to leave the dangerous area.");

        showScene("escape");
        gameOver = true;
        choice1Button.style.display = "none";
        choice2Button.style.display = "none";
        choice3Button.style.display = "none";
    }

    else if (currentScene === "temple") {
        player.loseSanity(20);
        player.takeDamage(15);

        addJournalEntry("Bentley became frightened by the temple.");

        showScene("badEnding");
        gameOver = true;
        codeInput.style.display = "none";
        codeButton.style.display = "none";
        codeMessage.style.display = "none";

        choice1Button.style.display = "none";
        choice2Button.style.display = "none";
        choice3Button.style.display = "none";
    }

    updateStats();
});

// Restart the game
restartButton.addEventListener("click", function() {

    health = 100;
    sanity = 100;
    score = 0;
    inventory = [];

    player = new Player("Bentley", health, sanity, score);

    currentScene = "start";
    doorIsOpen = false;
    gameOver = false;
    timeLeft = 60;

    updateTimer();
    startTimer();

    // Clear the inventory and journal
    inventoryDisplay.textContent = "";
    journalDisplay.textContent = "";

    // Hide and reset the secret code input
    codeInput.style.display = "none";
    codeButton.style.display = "none";
    codeMessage.style.display = "none";

    codeInput.value = "";
    codeMessage.textContent = "";

    // Reset the button labels
    choice1Button.textContent = "Choice 1";
    choice2Button.textContent = "Choice 2";
    choice3Button.textContent = "Choice 3";

    choice1Button.style.display = "inline-block";
    choice2Button.style.display = "inline-block";
    choice3Button.style.display = "inline-block";

    // Show the beginning of the story
    showScene("start");

    addJournalEntry("Bentley's adventure begins again.");

    updateStats();
});

// Create Save and Load buttons
let saveButton = document.createElement("button");
saveButton.textContent = "Save Game";

let loadButton = document.createElement("button");
loadButton.textContent = "Load Game";

// Add the buttons to the webpage
document.body.appendChild(saveButton);
document.body.appendChild(loadButton);

// Save the player's progress
function saveGame() {

    let gameData = {
        health: player.health,
        sanity: player.sanity,
        score: player.score,
        inventory: inventory,
        currentScene: currentScene,
        doorIsOpen: doorIsOpen,
        gameOver: gameOver,
        timeLeft: timeLeft,
        codePuzzleVisible: codeInput.style.display === "block"
    };

    let savedData = JSON.stringify(gameData);

    localStorage.setItem("lostExplorerSave", savedData);

    alert("Your game has been saved!");
}

// Load saved game progress
function loadGame() {

    try {
        let savedData = localStorage.getItem("lostExplorerSave");

        if (savedData === null) {
            alert("No saved game was found!");
            return;
        }

        let gameData = JSON.parse(savedData);

        player = new Player(
            "Bentley",
            gameData.health,
            gameData.sanity,
            gameData.score
        );

        inventory = gameData.inventory || [];
        currentScene = gameData.currentScene;
        doorIsOpen = gameData.doorIsOpen;
        gameOver = gameData.gameOver || false;
        timeLeft = gameData.timeLeft ?? 60;

        // Restore the inventory
        updateInventory();

        // Restore the story
        showScene(currentScene);

        // Restore the button labels
        if (currentScene === "start") {
            choice1Button.textContent = "Choice 1";
            choice2Button.textContent = "Choice 2";
            choice3Button.textContent = "Choice 3";
        }

        else if (currentScene === "river") {
            choice1Button.textContent = "Cross the bridge";
            choice2Button.textContent = "Search the riverbank";
            choice3Button.textContent = "Turn back";
        }

        else if (currentScene === "temple") {
            choice1Button.textContent = "Open the stone door";
            choice2Button.textContent = "Look for clues";
            choice3Button.textContent = "Escape";
        }

        // Restore the choice buttons
        if (gameOver) {
            choice1Button.style.display = "none";
            choice2Button.style.display = "none";
            choice3Button.style.display = "none";
        } else {
            choice1Button.style.display = "inline-block";
            choice2Button.style.display = "inline-block";
            choice3Button.style.display = "inline-block";
        }

        // Restore the secret code puzzle
        if (!gameOver && gameData.codePuzzleVisible) {
            codeInput.style.display = "block";
            codeButton.style.display = "block";
            codeMessage.style.display = "block";
        } else {
            codeInput.style.display = "none";
            codeButton.style.display = "none";
            codeMessage.style.display = "none";
        }

        // Restore the timer
        updateTimer();

        if (gameOver) {
            clearInterval(timerInterval);
        } else {
            startTimer();
        }

        updateStats();

        alert("Your saved game has been loaded!");

    } catch (error) {
        alert("There was a problem loading your saved game.");
        console.log(error);
    }
}

// Listen for Save and Load button clicks
saveButton.addEventListener("click", saveGame);
loadButton.addEventListener("click", loadGame);

// Start the game
showScene("start");

addJournalEntry("Bentley's adventure begins!");

savePlayerCookie();

let savedName = getPlayerCookie();

addJournalEntry(savedName + " is ready for the adventure!");

// Save the player's name in a cookie
function savePlayerCookie() {
    document.cookie = "playerName=Bentley; max-age=86400; path=/";
}

// Read the player's name from the cookie
function getPlayerCookie() {
    let cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].startsWith("playerName=")) {
            return cookies[i].split("=")[1];
        }
    }

    return "Explorer";
}

updateTimer();
startTimer();

// Keyboard controls
document.addEventListener("keydown", function(event) {

    if (event.target === codeInput) {
        return;
    }

    if (event.key === "1") {
        choice1Button.click();
    }

    else if (event.key === "2") {
        choice2Button.click();
    }

    else if (event.key === "3") {
        choice3Button.click();
    }

    else if (event.key.toLowerCase() === "r") {
        restartButton.click();
    }

});