import React from 'react';
// import Input from './InputField';

interface ComponentProps {
  id: string;
  name: string;
  label: string;
  value: string;
  timeList?: string[];
  handleChange: (val: string) => void;
}

const TimeField: React.FC<ComponentProps> = ({ id, name, label, value = '', timeList = [], handleChange }) => {
  console.log('TimeField timeList:', timeList); // Debug log

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={id} className='text-sm font-medium'>
        {label}
      </label>

      <input
        id={id}
        name={name}
        type='time'
        value={value}
        list={`${name}-list`}
        onChange={(e) => handleChange(e.target.value)}
        className='w-full rounded border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
        step='1800' // 30 minutes step
      />

      <datalist id={`${name}-list`}>
        {timeList.map((time) => (
          <option key={`${name}-list-${time}`} value={time} />
        ))}
      </datalist>
    </div>
  );
};

export default TimeField;
