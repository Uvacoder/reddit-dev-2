import React, { FC } from 'react';

interface ISelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: React.ReactText;
  options: any[];
}

const Select: FC<ISelectProps> = (props) => {
  const { value, onChange, options } = props;
  const formattedOptions = options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
  return (
    <select value={value} onChange={onChange}>
      {formattedOptions}
    </select>
  );
};

export default Select;
