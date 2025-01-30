// Sample texts for each difficulty level
const texts = {
    easy: [
        "The quick brown fox jumps over the lazy dog twice.",
        "Hello world! Welcome to the JavaScript universe.",
        "Coding is fun and rewarding, keep practicing daily.",
        "I love coding, it makes me feel accomplished.",
        "Typing speed tests help improve your accuracy."
    ],
    medium: [
        "The early bird catches the worm, but the second mouse gets the cheese. Patience is a virtue.",
        "A journey of a thousand miles begins with a single step, but every step must be taken with care.",
        "To be or not to be, that is the question, but the answer lies within our own hearts and minds.",
        "All that glitters is not gold, but sometimes the most valuable things are hidden in plain sight.",
        "Actions speak louder than words, but sometimes words can inspire actions that change the world."
    ],
    hard: [
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. It takes courage to stand out and be true to who you are.",
        "In the end, we will remember not the words of our enemies, but the silence of our friends. True friendship is about being there for each other, even in the toughest times.",
        "The only limit to our realization of tomorrow is our doubts of today. Believe in yourself and your potential to achieve great things, and the future will be bright.",
        "The purpose of our lives is to be happy. Happiness is not a destination, but a journey that we must embrace every day, finding joy in the little things.",
        "Life is what happens when you're busy making other plans. It's important to live in the moment and appreciate the present, rather than constantly worrying about the future."
    ],
    expert: [
        "In the realm of software development, the ability to write clean, efficient, and maintainable code is paramount. Mastery of algorithms and data structures, coupled with a deep understanding of design patterns, can significantly enhance one's problem-solving skills. Continuous learning and adaptation to new technologies are essential for staying relevant in this ever-evolving field.",
        "The intricacies of machine learning and artificial intelligence are reshaping industries across the globe. Understanding the fundamentals of neural networks, natural language processing, and computer vision can open doors to innovative solutions. Ethical considerations and responsible AI practices are crucial in ensuring that these technologies benefit society as a whole.",
        "Cybersecurity is a critical aspect of modern technology. Protecting sensitive data and systems from malicious attacks requires a comprehensive approach, including encryption, network security, and regular vulnerability assessments. Staying informed about the latest threats and security best practices is essential for safeguarding digital assets.",
        "The principles of agile development emphasize collaboration, flexibility, and customer feedback. By breaking projects into manageable iterations, teams can deliver value incrementally and adapt to changing requirements. Effective communication and a focus on continuous improvement are key to successful agile practices.",
        "Cloud computing has revolutionized the way we deploy and manage applications. Leveraging services like AWS, Azure, and Google Cloud can provide scalable and cost-effective solutions. Understanding cloud architecture, containerization, and serverless computing is vital for modern software development."
    ]
};

let startTime;
let endTime;

// Function to get a random text based on difficulty level
function getRandomText(difficulty) {
    const levelTexts = texts[difficulty];
    const randomIndex = Math.floor(Math.random() * levelTexts.length);
    return levelTexts[randomIndex];
}

// Event listener to change difficulty based on select input
document.getElementById('difficultySelect').addEventListener('change', function(event) {
    updateTextBasedOnDifficulty(event.target.value);
});

// Event listener for the start button
document.getElementById('startButton').addEventListener('click', startTest);

// Event listener for the stop button
document.getElementById('stopButton').addEventListener('click', stopTest);

// Event listener for the retry button
document.querySelector('#test-controls .btn:nth-child(3)').addEventListener('click', retryTest);

function updateTextBasedOnDifficulty(selectedDifficulty) {
    const newRandomText = getRandomText(selectedDifficulty);
    document.getElementById('testParagraph').innerText = newRandomText;
    document.getElementById('resultDifficulty').innerText = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    resetResults();
}

// Function to start the typing test
function startTest() {
    startTime = new Date();
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
    document.getElementById('userInput').value = ''; // Clear the user input
    document.getElementById('userInput').focus();
}

// Function to stop the typing test
function stopTest() {
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // Time in seconds
    document.getElementById('resultTime').innerText = timeTaken.toFixed(2);
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;

    const userInput = document.getElementById('userInput').value.trim();
    const testParagraph = document.getElementById('testParagraph').value.trim();
    const correctWords = countCorrectWords(userInput, testParagraph);
    const wpm = calculateWPM(correctWords, timeTaken);
    document.getElementById('resultWPM').innerText = wpm;
}

// Function to retry the typing test
function retryTest() {
    resetResults();
    startTest();
}

// Function to count the number of correctly typed words
function countCorrectWords(userInput, testParagraph) {
    const userWords = userInput.split(' ');
    const testWords = testParagraph.split(' ');
    let correctWordCount = 0;

    for (let i = 0; i < userWords.length; i++) {
        if (userWords[i] === testWords[i]) {
            correctWordCount++;
        }
    }

    return correctWordCount;
}

// Function to calculate WPM
function calculateWPM(correctWords, timeTaken) {
    const minutes = timeTaken / 60;
    return Math.round(correctWords / minutes);
}

// Function to reset the results
function resetResults() {
    document.getElementById('resultTime').innerText = '0';
    document.getElementById('resultWPM').innerText = '0';
}

const difficulty = 'easy'; // This can be 'easy', 'medium', 'hard', or 'expert'
updateTextBasedOnDifficulty(difficulty);