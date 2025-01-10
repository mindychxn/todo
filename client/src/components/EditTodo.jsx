import { Modal } from '@mui/material';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import GlassCard from './GlassCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { editTodo } from '../api/api';

export default function EditTodo({ todo, onEdit }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const [due, setDue] = useState(dayjs(todo.due));

  const onCancel = () => {
    setDescription(todo.description);
    setDue(dayjs(todo.due));
    setOpen(false);
  }

  const onSave = async () => {
    await editTodo(todo.todo_id, description, due, todo.complete);
    onEdit();
    setOpen(false);
  }

  return (
    <div>
      <button className=" hover:scale-105 transition ease-in-out duration-300 text-gray-500 hover:text-charcoal" onClick={() => setOpen(true)}>
        <CreateIcon />
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
      <GlassCard className="flex-col gap-6 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center w-1/2 p-6 !bg-white">
        <div className="font-semibold text-2xl">Add a New Task</div>
        <label htmlFor="task-description" className="w-full">
          <span className="text-xs text-gray-600">Task Description</span>
          <input
            id="task-description"
            className="mt-1 w-full rounded-lg px-3.5 py-[16px] bg-white border-2 border-[#EFEFEF] focus-visible:outline-[#0078d7]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Go grocery shopping"
          />
        </label>
        <label htmlFor="task-description" className="w-full text-gray-600">
          <span className="text-xs">Due Date</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={due}
              onChange={setDue}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root' : {
                  '& fieldset': {
                    borderColor: '#EFEFEF',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#EFEFEF'
                  },
                  '&:focus-within fieldset': {
                    borderColor: '#0078d7'
                  },
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  '& fieldset': {
                    borderColor: '#0078d7'
                  },
                }
              }}
            />
          </LocalizationProvider>
        </label>
        <span className="w-full flex justify-between">
          <button className="text-gray-500 hover:scale-105 transition ease-in-out duration-300 hover:text-charcoal" onClick={onCancel}>Cancel</button>
          <button className="bg-babyPurple px-4 py-2 rounded-lg hover:scale-105 transition ease-in-out duration-300 hover:bg-darkPurple text-charcoal" onClick={onSave}>Save</button>
        </span>
      </GlassCard>
    </Modal>
    </div>
  );
}
