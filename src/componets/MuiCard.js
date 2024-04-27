import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function MediaCard({ data, onAddToCart }) {
  // separately call the function name if passing data is showing undefined
  const Swal = require("sweetalert2");
  const handleAddToCart = () => {
    onAddToCart(data);
    Swal.fire({
      title: "Success",
      text: "Added To Cart",
      icon: "success",
      confirmButtonText: "Okay",
    });
  };
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia sx={{ height: 140 }} image={data.img} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {data.price} tk/kg
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {data.seller}
        </Typography>
      </CardContent>
      <CardActions>
        <NavLink>
          <Button
            variant="outlined"
            size="small"
            //use arrow function to pass any data to parent component function
            onClick={/*() => onAddToCart(data)*/ handleAddToCart}
          >
            Add to Cart
          </Button>
        </NavLink>
        <Rating name="read-only" value={data.ratting} readOnly />
      </CardActions>
    </Card>
  );
}
