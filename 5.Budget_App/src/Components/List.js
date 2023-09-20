//rfce : 함수형컴포넌트생성
import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    money,
    completed,
    Items,
    setItems,
    provided,
    snapshot,
    handleClick,
  }) => {
    //State 생성
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedMoney, setEditedMoney] = useState(money);

    // 완료 되면 밑줄 좍?
    const handleCompleteChange = (id) => {
      let newItems = Items.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setItems(newItems);
      localStorage.setItem("Items", JSON.stringify([newItems]));
    };

    const handleEditChange = (event) => {
      setEditedTitle(event.target.value);
    };

    const handleEditChange2 = (event) => {
      setEditedMoney(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      let newItems = Items.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
          data.money = editedMoney;
        }
        return data;
      });
      setItems(newItems);
      localStorage.setItem("Items", JSON.stringify(newItems));
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div
          className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-400 bg-gray-200 border rounded`}
        >
          <div className="items-center">
            <form onSubmit={handleSubmit}>
              <span>지출항목 : </span>
              <input
                value={editedTitle}
                onChange={handleEditChange}
                className="px-3 py-2 text-gray-900 rounded"
              />

              <span className="m-2 mr-8"></span>
              <span>비용 : </span>
              <input
                value={editedMoney}
                onChange={handleEditChange2}
                className="px-3 py-2 text-gray-900 rounded"
              />
            </form>
          </div>
          <div className="items-center">
            <button
              className="px-4 float-right"
              onClick={() => handleClick(id)}
            >
              X
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 float-right"
              type="submit"
            >
              save
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-gray-200"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        >
          <div className="flex justify-start items-center">
            <span>
              <span className=" font-mono">{title}</span>
            </span>
            <span className="m-2 mr-8"></span>
            <span>
              <span className=" font-mono">{money}</span>
            </span>
          </div>
          <div className="items-center">
            <button
              className="px-4 float-right"
              onClick={() => handleClick(id)}
            >
              X
            </button>
            <button
              className="px-4 float-right"
              onClick={() => setIsEditing(true)}
            >
              edit
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
