const wordInput = document.querySelector("#word-input")
const currentWord = document.querySelector("#current-word")
const scoreDisplay = document.querySelector("#score")
const timeDisplay = document.querySelector("#time")
const messageDisplay = document.querySelector("#message")

const GAME_TIME = 5;    // 변하지 않는 변수 선언 시 대문자와 언더바 사용

let words = ["banana", "key", "car", "javascript", "scalper"];
let score = 0;
let time = 0;
let timeInterval;
let isPlaying = false;  // interval이 쌓이는 것을 막기 위한 변수


wordInput.addEventListener("input", e=>{ // 타자를 치는 행위
    const typedText = e.target.value;    // input창의 value
    const currentText = currentWord.innerText;
    if(typedText.toUpperCase() === currentText.toUpperCase()) { // 대문자 변환 후 비교
        addScore()
        setNewWord()
    }
}) 


// 게임 종료
function gameover() {
    console.log("game over")
    isPlaying = false;
    clearInterval(timeInterval)
    timeInterval = null;    // null로 초기화
    messageDisplay.innerText = "GAME OVER!";
    score = 0;
}

// 시간 카운트다운
function countDown(){
    // console.log(time)
    time = time - 1;
    timeDisplay.innerText = time;
    if(time === 0) {
        gameover();
    }
}

function setNewWord() { // 점수 바꾸는 기능, input 초기화 기능
    time = GAME_TIME;
    wordInput.value = "";
    messageDisplay.innerText = "Now Playing!!!"
    const randomIndex = Math.floor(Math.random() * words.length);  // 0~4 Math.random()으로 소수점을 가진 난수 발생, floor()로 소수점을 자름
    currentWord.innerText = words[randomIndex]

    if(!isPlaying){ // interval 중복 현상 막아줌
        timeInterval = setInterval(countDown, 1000) // 1초마다 1씩 줄어들게
        isPlaying = true;
    }

}

function addScore() {
    score = score + 1;
    scoreDisplay.innerText = score;
}