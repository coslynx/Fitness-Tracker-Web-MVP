import React, { useState } from 'react';

interface SelectProps {
  label: string;
  options: { value: string | number; label: string }[];
  defaultValue?: string | number;
  onChange: (value: string | number) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        value={selectedValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;