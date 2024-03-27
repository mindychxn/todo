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
    <div className="flex flex-col justify-center items-center gap-10  w-full h-1/3">
      <form onSubmit={submitHandler}>
        <label className="flex w-full justify-center gap-4 rounded-full shadow-inset px-3 py-3 bg-[#f1f1f5]">
          <input
            placeholder="I want to accomplish..."
            type="text"
            className="bg-transparent outline-none mx-6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 rounded-full py-2 px-4 text-sm text-white shadow-pop"
          >
            ADD
          </button>
        </label>
      </form>
    </div>
  );
}
