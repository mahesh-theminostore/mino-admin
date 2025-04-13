import React from 'react';

import TimeField from '../input/TimeField';

interface ComponentProps {
  label?: string;
  name: string;
  start: string;
  end: string;
  onChange: (val: { start: string; end: string }) => void;
}

const TimeRange: React.FC<ComponentProps> = ({ label, name, start = '', end = '', onChange }) => {
  return (
    <div className='flex flex-col gap-4'>
      {label && <label>{label}</label>}
      <div className='flex gap-4'>
        <TimeField
          id={`${name}-start`}
          value={start}
          label='Start'
          name={`${name}-start`}
          timeList={['00:00', '00:30', '01:00']}
          handleChange={(val) => onChange({ start: val, end })}
        />

        <TimeField
          id={`${name}-end`}
          value={end}
          label='End'
          name={`${name}-end`}
          timeList={['00:00', '00:30', '01:00']}
          handleChange={(val) => onChange({ start, end: val })}
        />
      </div>
    </div>
  );
};

export default TimeRange;
