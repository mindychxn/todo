import { Modal, IconButton, Button } from '@mui/material';
import { useState } from 'react';

export default function EditTodo({ todo }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(todo.description);

  // edit description function
  const updateDesc = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      console.log(body);
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      window.location = '/';
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button className="bg-blue-100 px-4 py-2 rounded-full" onClick={() => setOpen(true)}>
        Edit
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col gap-4 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center w-1/2 p-6 bg-[#f1f1f5]">
          <div className="font-extrabold text-2xl">Edit Task</div>
          <input
            className="flex w-full justify-center gap-4 rounded-full shadow-inset px-3 py-3 bg-[#f1f1f5]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/*  <IconButton onClick={() => setEditing(0)} sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon /> 
          </IconButton>*/}
          <span className="w-full flex justify-between">
            <button onClick={() => (setOpen(false), setDescription(todo.description))}>
              Cancel
            </button>
            <button onClick={(e) => updateDesc(e)}>Save</button>
          </span>
        </div>
      </Modal>
    </div>
  );
}
