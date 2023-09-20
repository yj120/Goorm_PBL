import React from 'react'

export default function Form_Cost({handleSubmit, value,setValue}) {

  console.log("Form Component");

  // input 입력했을 때 이벤트
  const handleChange = (e) => {
    setValue(e.target.value);
  };


  return (
    <div>
      <div><h1>비용</h1></div>
      <form onSubmit={handleSubmit} className='flex pt-2'>
        <input className='w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow'
          type="text"
          name="value"
          placeholder="0"
          value={value}
          onChange={handleChange}
        />
      </form>


    </div>
  )
}
