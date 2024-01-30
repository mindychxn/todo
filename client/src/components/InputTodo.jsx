import { useState } from 'react';

export default function InputTodo() {
  const [description, setDescription] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // data type being sent is json
        body: JSON.stringify(body),
      });
      window.location = '/'; // reset window
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="font-bold font-sans text-3xl">To Do List</div>
      <form onSubmit={submitHandler}>
        <label className="flex justify-center gap-4 rounded-full drop-shadow-pop px-3 py-3 bg-[#f1f1f5]">
          <input
            placeholder="I want to accomplish..."
            type="text"
            className="bg-transparent outline-none mx-6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="bg-[#678cdc] rounded-full py-2 px-4 text-sm text-white">
            ADD
          </button>
        </label>
      </form>
    </div>
  );
}
