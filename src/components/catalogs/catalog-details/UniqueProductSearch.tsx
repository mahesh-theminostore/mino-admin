'use client';

import AutoComplete, { Option } from '@/components/form/AutoComplete';
import { useEffect, useState } from 'react';

interface ComponentProps {
  value: string;
  options?: Option[];
  onChange: (val: string) => void;
}

const UniqueProductSearch: React.FC<ComponentProps> = ({ value, options = [], onChange }) => {
  const [filteredOptions, setFilteredOptions] = useState(options);

  function handleInputChange(val: string) {
    setFilteredOptions(options.filter((opt) => opt.label.toLowerCase().includes(val.toLowerCase())));
  }

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <AutoComplete
      label='Product'
      name='catalog_pid'
      value={value}
      options={filteredOptions}
      placeholder='Select Product to classify this under. Leave blank to create a new Product.'
      onInputChange={handleInputChange}
      onChange={onChange}
    />
  );
};

export default UniqueProductSearch;
