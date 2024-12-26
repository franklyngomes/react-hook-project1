import { useForm } from "react-hook-form";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { useState} from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import toast from "react-hot-toast";
import { endPoints } from "../../../api/endPoints";
import axiosInstance from "../../../api/axios";

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [image, setImage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile_pic", image);
    try {
      const response = await axiosInstance.post( endPoints.auth.register, formData)
      if (response.status === 200) {
        toast.success(response.data.message);
        toast.success('Please Login', {
          position: "bottom-center"
        })
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
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
        <form onSubmit={handleSubmit(ClickFunction)}>
          <h2 style={{ marginBottom: "20px", color: "white" }}>Sign Up</h2>
          <FormControl
            sx={{
              width: "30ch",
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              borderRadius: "5px",
              mb:1
            }}
            variant="filled"
          >
          <FilledInput
              id="filled-adornment-text"
              type="text"
              className={errors.first_name ? "input-error" : ""}
              {...register("first_name", {
              required: "First name is required",
            })}
            error={errors.first_name}
            />
            <InputLabel htmlFor="filled-adornment-text">First Name</InputLabel>
          </FormControl>
          <FormControl
            sx={{
              width: "30ch",
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              borderRadius: "5px",
              mb:1
            }}
            variant="filled"
          >
          <FilledInput
              type="text"
              className={errors.last_name ? "input-error" : ""}
              {...register("last_name", {
              required: "Last name is required",
            })}
            error={errors.last_name}
            />
            <InputLabel htmlFor="filled-adornment-text">Last Name</InputLabel>
          </FormControl>
          <FormControl
            sx={{
              width: "30ch",
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              borderRadius: "5px",
            }}
            variant="filled"
          >
            <FilledInput
              type="email"
              className={errors.email ? "input-error" : ""}
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
          </FormControl>
          <FormControl
            sx={{
              m: 1, 
              width: "30ch",
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
              {...register("password", {
              required: "Password is required",
            })}
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
          <TextField
            {...register("profile_pic", {
              required: "profile_pic is required",
            })}
            type="file"
            variant="outlined"
            onChange={(e) => setImage(e.target.files[0])}
            error={!!errors.profile_pic}
            helperText={errors.profile_pic && errors.profile_pic.message}
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              mb: 2,
              width: "30ch",
            }}
          />
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            style={{
              display: `${image ? "flex" : "none"}`,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
              gap: "1rem",
            }}
          >
            <img
              src={image && URL.createObjectURL(image)}
              height={100}
              width={"auto"}
              style={{ borderRadius: "10px" }}
            />
            {image && (
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: 1, color: "#fff" }}
              >
                Selected file: {image.name}
              </Typography>
            )}
          </Stack>
          <br />
          <Button
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              fontWeight: "bold",
            }}
            type="submit"
            disabled={isSubmitting}
            onClick={ClickFunction}
          >
            Sign up
          </Button>
        </form>
      </Box>
      <h6 style={{ marginTop: "20px", color: "#002E6E" }}>
        Already a member ? <Link to="/">Sign in</Link>
      </h6>
    </>
  );
}
