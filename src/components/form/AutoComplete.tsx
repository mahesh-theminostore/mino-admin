import React, { Fragment, useState } from 'react';
import Input from './input/InputField';

export interface Option {
  label: string;
  value: string;
}

interface AutoCompleteProps {
  label: string;
  name: string;
  placeholder?: string;
  options?: Option[];
  value: string;
  onInputChange: (val: string) => void;
  onChange: (val: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  label,
  name,
  placeholder,
  options = [],
  value,
  onInputChange,
  onChange,
}) => {
  const [searchInput, setSearchInput] = useState(options.find((opt) => opt.value === value)?.label || '');

  const [showOptions, setShowOptions] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    onInputChange(e.target.value);
  }

  function handleInputFocus() {
    setShowOptions(true);
  }

  function handleInputBlur() {
    setTimeout(() => {
      setShowOptions(false);
    }, 500);
  }

  function handleOptionClick(label: string, value: string) {
    onChange(value);
    setSearchInput(label);
  }

  return (
    <div>
      <Input
        label={label}
        type='text'
        name={`search-input-${name}`}
        value={searchInput}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder={placeholder}
      />

      <ul
        className={`absolute z-999999 flex max-h-48 flex-col gap-4 overflow-scroll border-2 bg-white p-2 ${showOptions ? 'block' : 'hidden'}`}
      >
        {options.map((opt, idx) => (
          <Fragment key={`option-${opt.value}`}>
            <div className={`${idx === 0 ? 'hidden' : 'border-t-2'}`} />
            <li value={opt.value} className='cursor-pointer' onClick={() => handleOptionClick(opt.label, opt.value)}>
              {opt.label}
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
