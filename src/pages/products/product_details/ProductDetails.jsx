import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { productImg } from "../../../api/axios";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));
const ProductDetails = () => {
  const [details, setDetails] = useState(null);
  let { id } = useParams();
  const fetchData = async () => {
      try {
        const response = await axiosInstance.get(endPoints.pages.details + id);
        if (response.status === 200) {
          setDetails(response.data.data)
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    fetchData()
  }, [id]);
  if (!details) {
    return <div>Loading...</div>; // Or any loading spinner/indicator
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: '1250px', margin: '0 auto', marginTop: "30px" }}>
        <Grid container spacing={2} key={details._id}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Item>
              <img src={productImg(details.image)} alt={details.title} width={"70%"}/>
            </Item>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Item>
              <Typography gutterBottom variant="h4" component="div" style={{color:"black",fontSize: "2rem", fontWeight: "700", textAlign:"left"}}>
                {details.title}
              </Typography>
              <Typography gutterBottom variant="p" component="div" style={{color:"black", textAlign:"left"}}>
                Description
              </Typography>
              <Typography gutterBottom variant="h6" component="div" style={{color:"black",textAlign:"left"}}>
                {details.description}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetails;
