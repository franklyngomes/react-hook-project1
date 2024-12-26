import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Grid,
  TextField,
  Stack,
  Avatar,
  Input,
} from "@mui/material";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';

const ProductUpdate = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", product.image);
    }

    try {
      const response = await axiosInstance.post(
        endPoints.pages.update,
        formData
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Product created successfully!");
      } else {
        toast.error(response.data.message || "Failed to create product!");
      }
    } catch (error) {
      toast.error(error, "An error occurred!");
    }
    setImage(null);
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(endPoints.pages.details + id);
        if (response.status === 200 && response.data.data) {
          setProduct(response.data.data);
        } else {
          toast.error("Failed to fetch product details.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching product details."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    setValue("title", product?.title);
    setValue("description", product?.description);
    setValue("image", image);
  }, [product]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "60vh", padding: 20 }}
      >
        <Paper
          style={{
            width: "100%",
            maxWidth: 500,
            padding: 20,
            borderRadius: 15,
            border: "1px solid #000",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{ marginBottom: 10 }}
          >
            Update Product
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
              {...register("description", {
                required: "Description is required",
              })}
              label="Description"
              placeholder="Enter product description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            {/* <TextField
                            {...register("image", { required: "Image is required" })}
                            type="file"
                            variant="outlined"
                            onChange={(e) => setImage(e.target.files[0])}
                            error={!!errors.image}
                            helperText={errors.image?.message}
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "5px", mb: 2 }}
                        /> */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 1 }}
            >
              <Avatar
                alt="Product Picture"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : product?.image
                    ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`
                    : ""
                }
                sx={{ width: 90, height: 90, border:'1px solid gray' }}
              />
              <label htmlFor="product-pic-upload">
                <Input
                  accept="image/*"
                  id="product-pic-upload"
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            </Stack>
            <Button
              variant="contained"
              onClick={handleSubmit(ClickFunction)}
              sx={{ mt: 3, color: "#fff",textTransform: "capitalize" }}
              disabled={isSubmitting}
            >
              Save{isSubmitting ? <Spinner animation="border" size="sm" style={{marginLeft: "10px"}}/> : " "}
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default ProductUpdate;
