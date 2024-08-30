import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export default function Password(props) {
  const { placeHolder, value, onChange } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl
      id={placeHolder}
      variant="outlined"
      required={true}
      color="secondary"
      className="m-2"
      value={value}
      onChange={onChange}
    >
      <InputLabel htmlFor={placeHolder}>{placeHolder}</InputLabel>
      <OutlinedInput
        id={placeHolder}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={placeHolder}
      />
    </FormControl>
  );
}
