import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { productImg } from "../../../api/axios";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(endPoints.pages.details + id);
      if (response.status === 200) {
        setProduct(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "1100px",
        margin: "0 auto",
        marginTop: "20px",
      }}
    >
      {product && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 8, md: 8 }}>
            <Item>
              <img
                style={{ height: 350}}
                src={productImg(product?.image)}
                title="green iguana"
              />
            </Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Item>
              <Typography gutterBottom variant="h5" component="div">
                {product?.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product?.description}
              </Typography>
              <CardActions>
                <Link to={`/update/${product?._id}`} underline="none">
                  <Button size="small">Update</Button>
                </Link>
              </CardActions>
            </Item>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProductDetails;
