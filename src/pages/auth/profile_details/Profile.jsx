import React, { useState } from "react";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";

const Profile = () => {
  const [user, setUser] = useState([]);
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(endPoints.pages.profile);
      if (response.status === 200) {
        toast.success(response.data.message);
        setUser(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1250px",
          margin: "0 auto",
          paddingTop: "30px",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12} >
              <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={user?.profile_pic}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   {user?.first_name} {user?.last_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {user?.email}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Role: {user.role_data?.roleDisplayName}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
