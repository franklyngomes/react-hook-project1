import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import { useContext } from "react";
import { TokenContext } from "../../../App";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import { Link } from "react-router-dom";

export default function Login() {
  const tokenContext = useContext(TokenContext);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    tokenContext.setToken(newToken);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      const response = await axiosInstance.post(endPoints.auth.login, formData);
      if (response.status === 200) {
        updateToken(response.data.token);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          p: 2,
          width: "400px",
          border: "1px solid",
          borderRadius: "10px",
          margin: "0 auto",
          marginTop: "30px",
          padding: "30px",
          bgcolor: "#002E6E",
        }}
      >
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <h2 style={{ marginBottom: "20px", color: "white" }}>Sign in</h2>
          <FormControl
            sx={{
              m: 1, 
              width: '25ch',
              mb: 3,
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              borderRadius: "5px",
            }}
            variant="filled"
          >
            <FilledInput
              id="filled-adornment-email"
              type="email"
              {...register("email")}
            />
            <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
          </FormControl>
          <FormControl
            sx={{
              m: 1, 
              width: '25ch',
              mb: 3,
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              borderRadius: "5px",
            }}
            variant="filled"
          >
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <Button
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              fontWeight: "bold"
            }}
            type="submit"
            disabled={tokenContext.token}
          >
            Sign in
          </Button>
        </form>
      </Box>
      <h6 style={{ marginTop: "30px", color:"#002E6E" }}>Not a member ? <Link to='/register'>Sign up</Link></h6>
    </>
  );
}
