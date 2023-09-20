const todoInput = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
console.log(savedTodoList)




if (savedTodoList) { // 로컬에서 데이터 가져오기
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i])// 실행시켜라~ 이부분
  }
}
/*savedTodoList가 있으면 즉, 로컬에 데이터가 존재하면 갯수만큼 createtTodo를 실행 */






function keyCodeCheck() { // 엔터키로 추가
  if (window.event.keyCode === 13 && todoInput.value !== '') {
    createTodo();
  }
}




addBtn.addEventListener('click', () => { // + 버튼으로 추가
  if (todoInput.value !== '') {
    createTodo();
  }
});




// todolist 생성(2가지 경우 고려
//storageData에 데이터가 없는 경우 todoinput.value로 생성 / storageData에 데이터있는 경우 storageData로 생성
function createTodo(storageData) { // 할 일 추가 기능
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents
  }

  const todoList = document.querySelector('#todoList');
  const newLi = document.createElement('li');
  const newBtn = document.createElement('button');
  const newSpan = document.createElement('span');
  const deleteAll = document.querySelector('.delete-btn-wrap');

  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);

  newSpan.textContent = todoContents

  todoList.appendChild(newLi);

  todoInput.value = '';

  newBtn.addEventListener('click', () => { // 체크박스 클릭
    newLi.classList.toggle('complete');

    saveItemsFn();
  });

  newLi.addEventListener('dblclick', () => { // 더블 클릭
    newLi.remove();

    saveItemsFn();
  });

  // 스토리지데이터가 있고, 그 안에 complete 표시가 true 이면 완료표시로 똑같이해준다.
  if (storageData && storageData.complete === true) {
    newLi.classList.add('complete')
  }

  saveItemsFn();//저장
};




function deleteAll() { // 전체 삭제 버튼
  const liList = document.querySelectorAll('#todoList li');
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn();//저장
};




function saveItemsFn() { // 로컬에 데이터 저장하기
  const saveItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector('span').textContent,
      complete: todoList.children[i].classList.contains('complete')
    };
    saveItems.push(todoObj);
    console.log(todoObj);
  }

  if (saveItems.length === 0) {
    localStorage.removeItem('saved-items')
  } else {
    // localStorage 에 저장 형식은 < localStorage(key,value) > 
    localStorage.setItem('saved-items', JSON.stringify(saveItems));
    //JSON.parse() 문자열을 객체나 배열로 변환하는 메소드
  }
}