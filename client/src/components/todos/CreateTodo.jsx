import { useState } from 'react';
import { Modal, Switch } from '@mui/material';
import GlassCard from '../common/GlassCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createTodo } from '../../api/api';

export default function CreateTodo({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [due, setDue] = useState(null);
  const [priority, setPriority] = useState('low');
  const [remindMe, setRemindMe] = useState(false);
  const [remindAt, setRemindAt] = useState(null);

  const onCancel = () => {
    setTitle('');
    setNotes('');
    setDue(null);
    setPriority('low');
    setRemindMe(false);
    setRemindAt(null);
    onClose(false);
  };

  const onCreate = async () => {
    try {
      await createTodo(title, notes || null, due, priority, remindMe ? remindAt : null);
      setTitle('');
      setNotes('');
      setDue(null);
      setPriority('low');
      setRemindMe(false);
      setRemindAt(null);
      onClose(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <GlassCard className="flex-col gap-6 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center w-1/2 px-8 py-10 !bg-white rounded-lg">
        <div className="font-semibold text-2xl">Add a New Task</div>
        <label htmlFor="task-title" className="w-full">
          <span className="text-xs text-gray-600">Title</span>
          <input
            id="task-title"
            className="mt-1 w-full rounded-lg px-3.5 py-[16px] bg-white border-2 border-[#EFEFEF] focus-visible:outline-[#0078d7]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Go grocery shopping"
          />
        </label>
        <label htmlFor="task-notes" className="w-full">
          <span className="text-xs text-gray-600">Notes (optional)</span>
          <textarea
            id="task-notes"
            className="mt-1 w-full rounded-lg px-3.5 py-[16px] bg-white border-2 border-[#EFEFEF] focus-visible:outline-[#0078d7] resize-none"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional details..."
          />
        </label>
        <div className="w-full">
          <span className="text-xs text-gray-600">Priority</span>
          <div className="mt-1 flex gap-2">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(level)}
                className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm capitalize transition-all ${
                  priority === level
                    ? level === 'high'
                      ? 'border-red-400 bg-red-50 text-red-600'
                      : level === 'medium'
                      ? 'border-yellow-400 bg-yellow-50 text-yellow-600'
                      : 'border-green-400 bg-green-50 text-green-600'
                    : 'border-[#EFEFEF] hover:border-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <label htmlFor="task-due" className="w-full text-gray-600">
            <span className="text-xs">Due Date</span>
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
          </label>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm">Remind me</span>
              <Switch
                checked={remindMe}
                onChange={(e) => setRemindMe(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#405064',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#405064',
                  },
                }}
              />
            </div>
            {remindMe && (
              <DateTimePicker
                value={remindAt}
                onChange={setRemindAt}
                sx={{
                  width: '100%',
                  mt: 1,
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
            )}
          </div>
        </LocalizationProvider>
        <div className="w-full flex justify-end gap-4 pt-2">
          <button className="text-gray-500 hover:scale-105 transition ease-in-out duration-300 hover:text-charcoal px-4 py-2" onClick={() => onCancel()}>Cancel</button>
          <button className="bg-babyBlue px-8 py-2.5 rounded-lg hover:scale-105 transition ease-in-out duration-300 hover:bg-darkBlue text-charcoal font-medium" onClick={onCreate}>Add Task</button>
        </div>
      </GlassCard>
    </Modal>
  );
}
