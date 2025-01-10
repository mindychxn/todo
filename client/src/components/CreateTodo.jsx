import { useState } from 'react';
import { Modal } from '@mui/material';
import GlassCard from './GlassCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTodo } from '../api/api';

export default function CreateTodo({ open, onClose }) {
  const [description, setDescription] = useState('');
  const [due, setDue] = useState(null);
  const onCancel = () => {
    setDescription('');
    setDue();
    onClose(false);
  };
  const onCreate = async () => {
    try {
      await createTodo(description, due);
      setDescription('');
      setDue();
      onClose(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
          <button className="text-gray-500 hover:scale-105 transition ease-in-out duration-300 hover:text-charcoal" onClick={() => onCancel()}>Cancel</button>
          <button className="bg-babyBlue px-4 py-2 rounded-lg hover:scale-105 transition ease-in-out duration-300 hover:bg-darkBlue text-charcoal" onClick={onCreate}>Add</button>
        </span>
      </GlassCard>
    </Modal>
  );
}
