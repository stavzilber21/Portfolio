import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, TextareaAutosize, Container, Grid, Fab, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { add } from '../../firebase/firebaseFunctions';
import ProductItem from './product';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import MyTypography from '../Typography';

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const [inputProduct, setInputProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    category: '',
    image: '',
    description: '',
    inStock: 0
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'price' || e.target.name === 'inStock') {
      value = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    }
    setNewProduct({ ...newProduct, [e.target.name]: value });
  };
  

  const addProduct = () => {
    add("products", newProduct);
    setNewProduct({
      title: '',
      price: 0,
      category: '',
      image: '',
      description: '',
      inStock: 0
    });
    setInputProduct(false);
  };

  const handleDialogOpen = () => {
    setInputProduct(true);
  };

  const handleDialogClose = () => {
    setInputProduct(false);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyTypography title={"Products"}/>
        </Grid>
        <Grid item container xs={12} spacing={0.5}>
          {products.map((pro) => (
            <Grid item xs={6} key={pro.id}>
              <ProductItem product={pro} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
        onClick={handleDialogOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog className="productAdmin-card" open={inputProduct} onClose={handleDialogClose}>
        <DialogTitle className="product-title">Add New Product:</DialogTitle>
        <DialogContent >
            <TextField
              label="Title"
              name="title"
              value={newProduct.title}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                fullWidth
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Price"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Link to image"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <TextareaAutosize
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              aria-label="Description"
              placeholder="Description"
              style={{ width: '98%', marginTop: '16px' ,height: '6%'}}
            />
            <TextField
              label="In Stock"
              type="number"
              name="inStock"
              value={newProduct.inStock}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" variant="contained" startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={addProduct} color="primary" variant="contained" startIcon={<SaveIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products;
