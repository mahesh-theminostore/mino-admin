import React from 'react';
import Radio, { RadioProps } from '../input/Radio';

interface ComponentProps {
  label: string;
  name: string;
  options: RadioProps[];
}

const RadioGroup: React.FC<ComponentProps> = ({ label, name, options }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium' htmlFor={name}>
        {label}
      </label>

      <div className='flex flex-row justify-between gap-2'>
        {options.map((option) => (
          <Radio key={option.id || `${name}-${option.value}`} {...option} />
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
