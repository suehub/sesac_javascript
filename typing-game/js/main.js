const wordInput = document.querySelector("#word-input")
const currentWord = document.querySelector("#current-word")
const scoreDisplay = document.querySelector("#score")
const timeDisplay = document.querySelector("#time")
const messageDisplay = document.querySelector("#message")


let words = ["banana", "key", "car", "javascript", "scalper"];
let score = 0;




wordInput.addEventListener("input", e=>{ // 타자를 치는 행위
    const typedText = e.target.value;    // input창의 value
    const currentText = currentWord.innerText;
    if(typedText.toUpperCase() === currentText.toUpperCase()) { // 대문자 변환 후 비교
        addScore()
        setNewWord()
    }
}) 

function setNewWord() { // 점수 바꾸는 기능, input 초기화 기능
    wordInput.value = "";
    messageDisplay.innerText = "Now Playing!!!"
    const randomIndex = Math.floor(Math.random() * words.length);  // 0~4 Math.random()으로 소수점을 가진 난수 발생, floor()로 소수점을 자름
    currentWord.innerText = words[randomIndex]
}

function addScore() {
    score = score + 1;
    scoreDisplay.innerText = score;
}