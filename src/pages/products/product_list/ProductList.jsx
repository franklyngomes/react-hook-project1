import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { productImg } from "../../../api/axios";
import SweetAlertComponent from "../../ui/SweetAlert";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import toast from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", deleteId);
    try {
      const response = await axiosInstance.post(endPoints.pages.delete, formData);
      if (response.status === 200) {
        toast.success("Product deleted successfully!");   
        const updatedResponse = await axiosInstance.post(endPoints.pages.list, {
          page:currentPage,
          perPage: 10,
        });
        setProducts(updatedResponse.data.data);
        setTotalPage(updatedResponse.data.totalPages || 1);
        if (updatedResponse.data.data.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting the product.");
    } finally {
      setModal(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const formData = new FormData();
      formData.append("page", currentPage);
      formData.append("perPage", 10);

      try {
        const response = await axiosInstance.post(endPoints.pages.list, formData);

        if (response.status === 200) {
          setProducts(response.data.data);
          setTotalPage(response.data.totalPages || 1);
        } else {
          toast.error(response.data.message || "Failed to fetch products.");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred while fetching products.");
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
;
  };
  return (
    <>
      <Grid container spacing={2}  sx={{maxWidth: '1250px', margin: '0 auto', marginTop: "30px" }}>
        {products?.map((item, index) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card sx={{ width: 200}} key={index}>
                <CardMedia
                sx={{ height: 200}}
                  image={productImg(item.image)}
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="span">
                    {item.title}
                  </Typography>
                </CardContent>
                <CardActions>
                <Link to={`/details/${item._id}`} underline="none" key={index}>
                  <Button size="small">Details</Button>
                </Link>
                  <Button
                    onClick={() => {
                      setDeleteId(item._id), setModal(true);
                    }}
                    size="small"
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
      {products?.length !== 0 ? <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box> : ""}
    </>
  );
};

export default ProductList;