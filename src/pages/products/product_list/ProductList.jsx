import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { productImg } from "../../../api/axios";
import SweetAlertComponent from "../../ui/SweetAlert";
import Grid from "@mui/material/Grid";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState(false);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", deleteId);
    try {
      const response = await axiosInstance.post(
        endPoints.pages.delete,
        formData
      );
      if (response.status == 200) {
        const newResponse = await axiosInstance.post(endPoints.pages.list);
        setProducts(newResponse.data.data);
      } else {
        console.log("Failed to delete product");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setModal(false);
    }
  };
  useEffect(() => {
    axiosInstance.post(endPoints.pages.list).then((value) => {
      setProducts(value.data.data);
      console.log(value);
    });
  }, []);
  return (
    <>
      <Grid container spacing={2} padding="10px">
        {products?.map((item, index) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card sx={{ width: "100%" }} key={index}>
                <CardMedia
                  sx={{ height: 180 }}
                  image={productImg(item.image)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                  <Button
                    onClick={() => {
                      setDeleteId(item._id), setModal(true);
                    }}
                  >
                    delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {modal && (
        <SweetAlertComponent
          confirm={handleDelete}
          cancel={() => setModal(false)}
          title="Are You Sure?"
          type="warning"
          subtitle="You will not be able to recover this product"
        />
      )}
    </>
  );
};

export default ProductList;
