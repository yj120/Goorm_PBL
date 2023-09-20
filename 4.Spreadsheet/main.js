const data = new Array(11).fill("").map(()=> new Array(11).fill(""));
const col_name = {
  "col": [" ","A", "B", "C", "D", "E", "F", "G", "H", "I"],
  "row": ["",0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}

const header = document.querySelector(".header");
const cursor = document.querySelector(".cursor");
const middle = document.querySelector(".middle");
const columns = document.querySelector(".myTableColumns");
const rows = document.querySelector(".myTableRows");
const table = document.querySelector(".myTable");


let selectedCol = undefined;
let selectedRow = undefined;

/* 엑셀 파일 다운로드 */
const exportHandler = (data) => {
  const workSheet = XLSX.utils.aoa_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "sheet title");
  XLSX.writeFile(workBook, "엑셀_파일_명.xlsx");
};



/* 버튼 */
const create_button = ()=>{
  const btn =document.createElement("button");
  btn.classList.add("export_btn");
  btn.innerHTML = "Export SpreadSheet"
  btn.style = "border-radius : 5px";

  btn.addEventListener("click", () => {
    exportHandler(data);
  });
  header.appendChild(btn);
}


/* 셀 정보 업데이트 */
const updateCellInfo = (e) => {
  const { target } = e;
  const { value, id } = target;
  const [col, row] = id.split("-");
  data[col][row] = value;
  console.log(data[col][row]);

}

/* 커서 정보 업데이트 */
const cursor_now = (e) => {
  const { target } = e;
  const { value, id } = target;
  const [col, row] = id.split("-");
  console.log(`${col}-${row}`);
  cursor.textContent = `Cell : ${col-1}-${col_name["col"][row]}`;
}


/* 클릭 정보 업데이트 */
const cursor_click = (e)=>{
  const { target } = e;
  const { value, id } = target;
  const [col, row] = id.split("-");
  cursor_click_background(col,row);
}

/* 클릭 배경 업데이트 */
const cursor_click_background = (col, row) => {
  /* 일단 초기화 */
  if (selectedCol != undefined && selectedRow != undefined) {
    const prevCol = document.getElementById(`col-${selectedCol-1}`);
    const prevRow = document.getElementById(`row-${selectedRow-1}`);
    prevCol.classList.remove("selected");
    prevRow.classList.remove("selected");

  }

  /* 포커스 적용 */
  const currentCol = document.getElementById(`row-${col-1}`);
  const currentRow = document.getElementById(`col-${row-1}`);
  console.log("currentCol:", currentCol);
  currentCol.classList.add("selected");
  currentRow.classList.add("selected");


  // 이 다음에 클랙 업데이트 시 사용
  selectedCol = row;
  selectedRow = col;
}


/* 테이블 생성 */
const create_table = ()=>{
  for(var i =0;i<col_name["row"].length;i++){
    const new_line = document.createElement("tr");
    for(var j=0;j<col_name["col"].length;j++){
      const cell = document.createElement("td");
      const input_cell = document.createElement("input");
      // 제목 칼럼 행
      if(i==0){
        cell.setAttribute("id",`col-${col_name["row"][j]}`);
        cell.innerHTML = col_name["col"][j];
        cell.classList.add("title");
      }
      // 제목 행 번호 열
      if(j==0){
        cell.setAttribute("id", `row-${col_name["row"][i]}`);
        cell.classList.add("title");
        cell.innerHTML = col_name["row"][i];
      }
      // 일반 데이터가 들어갈 자리
      if(i!=0 && j!=0){
        input_cell.classList.add("cell");
        
        // 입력되는 셀에 아이디 부여
        input_cell.setAttribute("id",`${i}-${j}`);

        // 입력되는 셀에 이벤트 지정(keyup 되면 
        input_cell.addEventListener("keyup", updateCellInfo);
        input_cell.addEventListener("focus",cursor_now);
        input_cell.addEventListener("focus", cursor_click);
        console.log(input_cell.id);
        
        input_cell.classList.add("input_cell");

        cell.appendChild(input_cell);
      }
      cell.classList.add("cell");
      new_line.appendChild(cell);
    }
    rows.appendChild(new_line);
  }
}



/* 랜더링 */
const render = ()=>{
  create_button();
  create_table();
}



render();


