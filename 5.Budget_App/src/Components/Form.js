import React from "react";

export default function Form({ handleSubmit, value, setValue, setCost, cost }) {
  console.log("Form Component");

  // input 입력했을 때 이벤트
  const handleChange_1 = (e) => {
    setValue(e.target.value);
  };

  const handleChange_2 = (e) => {
    setCost(e.target.valueAsNumber); // valueAsNumber
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col pt-2">
        <div className="flex flex-row justify-stratch">
          <input
            className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
            type="text"
            name="value"
            placeholder="해야 할 일을 입력하세요"
            value={value}
            onChange={handleChange_1}
          />
          <input
            className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
            type="number"
            name="cost"
            placeholder="0"
            value={cost}
            onChange={handleChange_2}
          />
        </div>
        <input
          className="w-20 mt-4 p-2 text-blue-500 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
          type="submit"
          value="제출 ➤"
        />
      </form>
    </div>
  );
}
