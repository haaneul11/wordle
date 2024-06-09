const 정답 = "APPLE";

let index = 0; //인덱스 번호
let attempts = 0; //몇 번 시도했는지(한 줄을 나타내는 단위)
let timer; //타이머

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    //TODO 정중앙으로 위치시키기
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh;, left:45vw;, background-color: white;, width: 200px;, height: 100px";
    document.body.append(div);
  };

  const gameover = () => {
    //게임오버
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  //다음줄로 이동
  const nextLine = () => {
    if (attempts === 6) return gameover(); //6번까지만 시도가 되기 때문에 6번째 줄이 되면 더이상 실행되지 않도록
    attempts++; //시도 횟수 증가(다음줄로 넘어가기 위해)
    index = 0; //인덱스 초기화
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        //입력한 글자와 정답글자가 같은가
        맞은_갯수++;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        //입력한 글자가 정답 글자 안에 포함되는가
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  //뒤로가기 버튼
  const handleBackspace = () => {
    if (index > 0) {
      //원래있던 단어를 지운 후 index 하나 줄이기
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );

      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 경과_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 경과_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 경과_시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const handleKeydown = (event) => {
    console.log("키가 눌렸습니다!", event.key, event.keyCode);
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }

    // document.querySelector(".board-column[data-index='00']").textContent = key;
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
