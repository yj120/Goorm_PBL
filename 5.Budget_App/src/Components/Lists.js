// rfce : 함수형 컴포넌트 생성시 extension 어플 설치해서
// rfce  입력하면 자동으로 생성
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ Items, setItems, handleClick }) => {
  console.log("Lists Component");

  // 목적지가 없으면 (이벤트 취소) 이 함수를 종료합니다.
  const handleEnd = (result) => {
    console.log("result", result);

    if (!result.destination) return;
    const newItems = [...Items];

    // 1. 변경시키는 아이템을 배열에서 지워준다.
    // 2. return 값으로 지워진 아이템을 잡아준다.
    const [reorderedItem] = newItems.splice(result.source.index, 1);

    // 3. 원하는 자리에 reorderItem을 Insert 해준다.
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    localStorage.setItem("Items", JSON.stringify(newItems));
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {Items.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      money={data.money}
                      completed={data.completed}
                      Items={Items}
                      setItems={setItems}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;
