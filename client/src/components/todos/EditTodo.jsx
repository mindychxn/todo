import { Modal, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import GlassCard from '../common/GlassCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { editTodo } from '../../api/api';

export default function EditTodo({ todo, onEdit }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [notes, setNotes] = useState(todo.notes || '');
  const [due, setDue] = useState(dayjs(todo.due));
  const [priority, setPriority] = useState(todo.priority || 'low');
  const [remindMe, setRemindMe] = useState(!!todo.remind_at);
  const [remindAt, setRemindAt] = useState(todo.remind_at ? dayjs(todo.remind_at) : null);

  const onCancel = () => {
    setTitle(todo.title);
    setNotes(todo.notes || '');
    setDue(dayjs(todo.due));
    setPriority(todo.priority || 'low');
    setRemindMe(!!todo.remind_at);
    setRemindAt(todo.remind_at ? dayjs(todo.remind_at) : null);
    setOpen(false);
  }

  const onSave = async () => {
    await editTodo(todo.todo_id, title, notes || null, due, priority, remindMe ? remindAt : null, !!todo.completed_at);
    onEdit();
    setOpen(false);
  }

  return (
    <div>
      <button className=" hover:scale-105 transition ease-in-out duration-300 text-gray-500 hover:text-charcoal" onClick={() => setOpen(true)}>
        <CreateIcon />
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
      <GlassCard className="flex-col gap-6 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center w-1/2 p-6 !bg-white rounded-lg">
        <div className="font-semibold text-2xl">Edit Task</div>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={remindMe}
                  onChange={(e) => setRemindMe(e.target.checked)}
                  sx={{ '&.Mui-checked': { color: '#405064' } }}
                />
              }
              label={<span className="text-sm">Remind me</span>}
            />
            {remindMe && (
              <DateTimePicker
                value={remindAt}
                onChange={setRemindAt}
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
            )}
          </div>
        </LocalizationProvider>
        <span className="w-full flex justify-between">
          <button className="text-gray-500 hover:scale-105 transition ease-in-out duration-300 hover:text-charcoal" onClick={onCancel}>Cancel</button>
          <button className="bg-babyPurple px-4 py-2 rounded-lg hover:scale-105 transition ease-in-out duration-300 hover:bg-darkPurple text-charcoal" onClick={onSave}>Save</button>
        </span>
      </GlassCard>
    </Modal>
    </div>
  );
}
