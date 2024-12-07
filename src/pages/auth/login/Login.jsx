import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";

export default function Login() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        try{
          const response = await axiosInstance.post(endPoints.auth.login, formData)
            if(response.status === 200){
              localStorage.setItem("token",response.data.token)
              toast.success(response.data.message)
            }else{
              toast.error(response.data.message)
            }
        }catch(error){
          toast.error(error)
        }
    }
  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <TextField
          label="Email"
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          {...register("email")}
        />
        <br />
        <TextField
          label="Password"
          required
          variant="outlined"
          color="secondary"
          type="password"
          sx={{ mb: 3 }}
          {...register("password")}
        />
        <br />
        <Button variant="outlined" color="secondary" type="submit">
          Login
        </Button>
      </form>
    </>
  );
}
