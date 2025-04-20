import { Card, CardContent, Typography, Button } from "@mui/material";

const ProductCard = () => {
  return (
    <Card sx={{ width: 280, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Tomato
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          ₹20/kg
        </Typography>
        <Button variant="contained" fullWidth>
          Add to Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
