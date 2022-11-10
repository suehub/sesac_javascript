const inputText = document.querySelector(".input-text");

// console.log({inputText}) // null 출력됨 -> html 랜더링 순서와 관련있음 -> html하단에 script작성
// DOM이 되는 것을 볼 수 있음. 작성 내용은 value에 담김.

const addButton = document.querySelector(".add-button");
const list = document.querySelector(".list");

const likeButtons = document.querySelectorAll(".like");
// console.log(likeButtons)
// 각각의 요소에 addEvent를 걸어줘야 함
likeButtons.forEach(like=>{
    like.addEventListener("click", ()=>{ // 등록할 당시 새로운 요소에는 addEvent가 추가되지 않기 때문
        console.log('clicked')  // 새로운 요소의 클릭 이벤트 발생하지 않음.
    })
})

addButton.addEventListener("click", function(){
    //console.log(inputText.value) // 이 내용을 list에 추가하기
    
    
    // like
    const like = document.createElement("span");
    const likeIcon = document.createElement("i");
    like.classList.add("like")    //  클래스 추가
    likeIcon.classList.add("material-icons");
    likeIcon.innerText = "favorite_border"; // text 추가
    like.appendChild(likeIcon);
    
    // item
    const item = document.createElement("span");
    item.classList.add("item");
    item.innerText = inputText.value;


    // manage
    const manage = document.createElement("span");
    const checkIcon = document.createElement("i");
    const clearIcon = document.createElement("i");
    checkIcon.classList.add("material-icons", "check");
    clearIcon.classList.add("material-icons", "clear");
    checkIcon.innerText = "check";
    clearIcon.innerText = "clear";
    manage.classList.add("manage");
    manage.appendChild(checkIcon);
    manage.appendChild(clearIcon);


    const li = document.createElement("li");

   // li.innerText = inputText.value;
    li.appendChild(like)
    li.appendChild(item)
    li.appendChild(manage)
    list.appendChild(li)  // element를 삽입할 때 쓰는 메소드
})

// span을 만들고 그 span을 생성한 li 안에 appendChild로 삽입하고 삽인한 li를 list에 넣어줌
