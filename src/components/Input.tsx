import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

const STextField = styled(TextField)({
  marginBottom: '0.5rem',
});

interface InputProps {
  label: string;
  type: string;
  value: string;
  helperText?: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

const Input: React.FC<InputProps> = ({ value, label, type, helperText, onChange, ...props }) => {
  return <STextField
  error={typeof(helperText)=='string'}
  helperText={helperText}
  margin="normal"
  fullWidth
  id={label}
  label={label}
  name={type}
  type={type}
  value={value}
  autoFocus
  {...props}
  onChange={onChange}
/>
};

export default Input;
