import { useState, useEffect } from "react";
import {
  Stack,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";

const CreateProduct = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful, isSubmitting} } = useForm();
  const [image, setImage] = useState(null);

  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    try {
      const response = await axiosInstance.post(endPoints.pages.create, formData);

      if (response.status === 200) {
        toast.success(response.data.message || "Product created successfully!"); 
      } else {
        toast.error(response.data.message || "Failed to create product!");
      }
    } catch (error) {
      toast.error(error, "An error occurred!");
    }
  };
  useEffect(() => {
    reset({
      title: " ",
      description: " ",
    })
    setImage(null)
  }, [isSubmitSuccessful])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", background: "#f4f6f8", padding: 20 }}
    >
      <Paper style={{ width: "100%", maxWidth: 500, padding: 20 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ marginBottom: 20 }}
        >
          Add Product
        </Typography>
        <form>
          <TextField
            {...register("title", { required: "Title is required" })}
            label="Title"
            placeholder="Enter product title"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            {...register("description", { required: "Description is required" })}
            label="Description"
            placeholder="Enter product description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register("image", { required: "Image is required" })}
            type="file"
            variant="outlined"
            onChange={(e) => setImage(e.target.files[0])}
            error={!!errors.image}
            helperText={errors.image?.message}
            fullWidth
            sx={{ backgroundColor: "white", borderRadius: "5px", mb: 2 }}
          />
          {image && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ marginBottom: "1rem", gap: "0.5rem" }}
            >
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                height={100}
                width="auto"
                style={{ borderRadius: "10px" }}
              />
              <Typography variant="caption" display="block">
                Selected file: {image.name}
              </Typography>
            </Stack>
          )}
          <Button variant='contained' onClick={handleSubmit(ClickFunction)}  sx={{ mt: 3, fontSize: 14,textTransform: "capitalize", color: '#ffff' }} disabled={isSubmitting}>Add Product  {isSubmitting ? <Spinner animation="border" size="sm" style={{marginLeft: "10px"}}/> : " "}</Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default CreateProduct;