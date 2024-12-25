import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Navbar from "../components/Navbar"
import img from "../images/linkedin.png";
import img1 from "../images/Instagram.webp";
import img2 from "../images/Facebook.jpg";
import img3 from "../images/WhatsApp.jpg";
import img4 from "../images/To-Do.jpg";
// import useStyles from "../styles/styles";

const Dashboard = () => {
  const navigate = useNavigate();
  // const classes = useStyles();

  const handleTodoNavigation = () => {
    navigate("/todo");
  };

  const images = [
    { src: img, alt: "LinkedIn", link: "https://www.linkedin.com" },
    { src: img1, alt: "Instagram", link: "https://www.instagram.com" },
    { src: img2, alt: "Facebook", link: "https://www.facebook.com" },
    { src: img3, alt: "WhatsApp", link: "https://web.whatsapp.com" },
    { src: img4, alt: "To-Do", onClick: handleTodoNavigation },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />


      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  maxWidth: "100%",
                  cursor: image.link || image.onClick ? "pointer" : "default",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
                onClick={() => {
                  if (image.link) {
                    window.open(image.link, "_blank");
                  } else if (image.onClick) {
                    image.onClick();
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={image.src}
                  alt={image.alt}
                  sx={{
                    height: 250,
                    width: "auto",
                    objectFit: "cover",
                    margin: "0 auto",
                  }}
                />
                <CardContent sx={{ textAlign: "center", backgroundColor: "#f7f7f7" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {image.alt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
