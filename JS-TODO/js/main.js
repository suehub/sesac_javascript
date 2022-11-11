const inputText = document.querySelector(".input-text");
const addButton = document.querySelector(".add-button");
const list = document.querySelector(".list");
const likeButtons = document.querySelectorAll(".like");



function addItem (){

    if(inputText.value.trim() === "") return;  // input이 빈칸이면 등록하지 않고 함수 종료

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

    // event
    like.addEventListener("click", (e)=>{
        const target = e.target; // i태그의 inputText를 바꿔주기
        
        // if(target.innerText === "favorite"){
        //     target.innerText = "favorite_border"
        // } else {
        //     target.innerText = "favorite";
        // }

        // 삼항연산자
        const text = target.innerText === "favorite" ? "favorite_border" : "favorite"
        target.innerText = text;
        
        // console.log(e) 
    })
    checkIcon.addEventListener("click", (e)=>{
        const target = e.target.parentNode.parentNode;
        // console.log(e) // event의 target 안에 parentNode안에 parentNode를 보면 li 선택되는 것을 볼 수 있음
        target.classList.add("done")
    })
    clearIcon.addEventListener("click", (e)=>{
        const target = e.target.parentNode.parentNode;
        list.removeChild(target)    // 선택된 li 삭제
    })

    li.appendChild(like)
    li.appendChild(item)
    li.appendChild(manage)
    list.appendChild(li)

    inputText.value = "";   // input 값 초기화
    inputText.focus()
}



inputText.addEventListener("keypress", e=>{ // 키를 누르는 이벤트를 인자로 받음
    //console.log(e)  // 엔터 입력 시 키 코드가 13으로 출력됨. 스페이스바 키 코드는 32
    if(e.keyCode == 13) {
        addItem()
    }    
})


addButton.addEventListener("click", addItem)    