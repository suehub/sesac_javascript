const wordInput = document.querySelector("#word-input")
const currentWord = document.querySelector("#current-word")
const scoreDisplay = document.querySelector("#score")
const timeDisplay = document.querySelector("#time")
const messageDisplay = document.querySelector("#message")

const GAME_TIME = 5;    // 변하지 않는 변수 선언 시 대문자와 언더바 사용

const API_URL = "https://random-word-api.herokuapp.com/word?number=100";

let words = ["banana", "key", "car", "javascript", "scalper"];
let score = 0;
let time = 0;
let timeInterval;
let isPlaying = false;  // interval이 쌓이는 것을 막기 위한 변수
let isReady = false;    // 통신이 되기 전에 start가 될 때를 방지하기 위한 변수


init()  // html 랜더링하면서 javascript import하고 init()을 최초로 실행해서 데이터가 세팅됨

// // promise 문법. 초기화 함수를 init() 이름으로 많이 사용함
// function init(){
//     // promise 문법
//     const res = fetch(API_URL).then(res => res.json()).then((data) => words = data);    // json 변환한 값을 넘겨줌
//     // console.log(res)    // promise 출력

// }

// async await 문법 : 명령 실행 후 기다리고 완료가 되면 다음 명령을 실행함
async function init(){  // async function(비동기 함수) : callback과 promise의 단점을 보완하기 위해 추가됨
    const res = await fetch(API_URL);   // fetch 함수가 다 실행된 후에 값이 담김
    const data = await res.json();
    words = data.filter(item => item.length < 7) // filter는 배열 함수
    isReady = true;
    console.log(words)
    // 둘 다 사용가능하지만 async await 이 최근 많이 사용됨
}




wordInput.addEventListener("input", e => { // 타자를 치는 행위
    const typedText = e.target.value;    // input창의 value
    const currentText = currentWord.innerText;
    if(typedText.toUpperCase() === currentText.toUpperCase() && isReady) { // 대문자 변환 후 비교
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