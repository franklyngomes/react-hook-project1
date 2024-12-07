import { useForm } from "react-hook-form";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [image, setImage] = useState();
  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile_pic", image);
    try {
      const { data } = await axios.post(
        "https://wtsacademy.dedicateddevelopers.us/api/user/signup",
        formData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(ClickFunction)}>
      <TextField
        className={errors.firstName ? "input-error" : ""}
        {...register("firstName", {
          required: "First name is required",
        })}
        label="First Name"
        type="text"
        variant="outlined"
        color="secondary"
        error={errors.firstName}
        helperText={errors.firstName && errors.firstName.message}
      />
      <br />
      <TextField
        className={errors.lastName ? "input-error" : ""}
        {...register("lastName", {
          required: "Last name is required",
        })}
        label="Last Name"
        type="text"
        variant="outlined"
        color="secondary"
        error={errors.lastName}
        helperText={errors.firstName && errors.lastName.message}
      />
      <br />
      <TextField
        className={errors.email ? "input-error" : ""}
        {...register("email", {
          required: "email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
        label="Email"
        type="email"
        variant="outlined"
        color="secondary"
        error={errors.email}
        helperText={errors.email && errors.email.message}
      />
      <br />
      <TextField
        className={errors.password ? "input-error" : ""}
        {...register("password", {
          required: "Password is required",
        })}
        label="Password"
        type="password"
        variant="outlined"
        color="secondary"
        error={errors.password}
        helperText={errors.password && errors.password.message}
      />
      <br />
      <TextField
        {...register("profile_pic", {
          required: "profile_pic is required",
        })}
        type="file"
        variant="outlined"
        color="secondary"
        onChange={(e) => setImage(e.target.files[0])}
        error={!!errors.profile_pic}
        helperText={errors.profile_pic && errors.profile_pic.message}
        fullWidth
        sx={{ backgroundColor: "white", borderRadius: "5px", mb: 4 }}
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
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Selected file: {image.name}
          </Typography>
        )}
      </Stack>
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
