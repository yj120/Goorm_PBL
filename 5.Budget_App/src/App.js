import React, { useState, useCallback } from "react";
import "./App.css";
import Form from "./Components/Form";
import Lists from "./Components/Lists";

const initialItems = localStorage.getItem("Items")
  ? JSON.parse(localStorage.getItem("Items"))
  : [];

function App() {
  console.log("App Component");

  const [Items, setItems] = useState(initialItems);
  const [value, setValue] = useState([]); // 변수이름, State 를 정하는 함수
  const [cost, setCost] = useState([]); // 변수이름, State 를 정하는 함수

  // useCallback을 이용한 함수 최적화
  // 클릭했을 때 이벤트
  const handleClick = useCallback(
    (id) => {
      let newItems = Items.filter((data) => data.id !== id);
      console.log("newItems", newItems);
      setItems(newItems);
      localStorage.setItem("Items", JSON.stringify(newItems));
    },
    [Items] // Items가 바뀔 때만 다시생성
  );

  function Alert1() {
    alert("내용을 입력하세요.");
  }

  // input 에 입력하고 입력 키 누르면 발생 이벤트
  const handleSubmit = (e) => {
    // form 안에 input 을 전송할 때 페이지 리로드 되는 걸 막아줌
    // form 이 refresh 되면 state 가 초기화됨
    e.preventDefault();

    if (value === "" || cost === "") {
      //alert
      //console.log("비었다고!");
      Alert1();
    } else {
      // 새로운 할일 데이터
      let newTodo = {
        id: Date.now(),
        title: value,
        money: cost,
        completed: false,
      };

      console.log("newTodo:", newTodo);

      // 원래 있던 할 일에 새로운 할 일 더해주기
      setItems((prev) => [...prev, newTodo]);
      localStorage.setItem("Items", JSON.stringify([...Items, newTodo]));
      // 입력 submit 후에 다시 초기값으로 뜨게끔
      setValue("");
      setCost("");
    }
  };

  const handleRemoveClick = () => {
    setItems([]); //빈배열로주면 끝
    localStorage.setItem("Items", JSON.stringify([])); //빈배열로 동일하게
  };

  let sum = 0;
  let strsum = 0;
  // 총 지출
  const TotalSum = () => {
    console.log("Items: ", Items);

    const len = Items.length;
    console.log(len);

    for (let i = 0; i < len; i++) {
      console.log(Items[i].money);
      sum += Number(Items[i].money);
    }
    strsum = sum;
    //strsum.toLocaleString("ko_KR");
    //console.log("sum:", strsum.toLocaleString());
  };

  TotalSum();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-200">
      <div className="m-2 lg:w-3/4 lg:max-w-lg">
        <h1 className="ml-2 text-4xl font-bold">예산 계산기</h1>
      </div>

      <div className="w-full h-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="grid grid-cols-2">
          <h1>지출 항목</h1>
          <h1>비용</h1>
        </div>
        <Form
          handleSubmit={handleSubmit}
          value={value}
          cost={cost}
          setValue={setValue}
          setCost={setCost}
        />
        <Lists handleClick={handleClick} Items={Items} setItems={setItems} />
        <button
          className="w-50 mt-4 p-2 text-blue-500 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
          onClick={handleRemoveClick}
        >
          목록 지우기 🗑️
        </button>
      </div>
      <div className="relative">
        <h1 className=" mt-5 relative bottom-5 left-40 text-2xl c">
          총 지출: {strsum.toLocaleString()} 원
        </h1>
      </div>
    </div>
  );
}

export default App;
