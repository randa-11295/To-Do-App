import { TextField } from "@mui/material";

const ReusableTextField =({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  variant = "filled",
  margin = "normal",
  fullWidth = true,
  multiline = false,
  rows,
  select = false,
  children,
}) =>{
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      name={name}
      variant={variant}
      margin={margin}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      select={select}
    >
      {children}
    </TextField>
  );
}

export default ReusableTextField;