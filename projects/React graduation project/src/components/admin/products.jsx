import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, TextareaAutosize, Container, Grid, Box } from '@mui/material';
import { add } from '../../firebase/firebaseFunctions';
import ProductItem from './product';

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
    const value = e.target.name === 'price' || e.target.name === 'inStock'? parseInt(e.target.value) : e.target.value;
    setNewProduct({ ...newProduct, [e.target.name]: value });
  };

  const addProductMode = () => {
    setInputProduct(!inputProduct);
  }

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
  }

  return (
    <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h4" align="center" style={{ color: '#87cefa', fontFamily: 'cursive', fontWeight: 'bold', margin: '10px' }}>
          Products
        </Typography>
        {products.map((pro) => (
          <ProductItem key={pro.id} product={pro} />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mx: 6, m:6}}>
        {inputProduct &&
          <Box sx={{ border: 1, borderColor: 'primary.main', borderRadius: 2, p: 2, mb: 2 }}>
            <Typography variant="h6" style={{ color: '#5f9ea0', fontFamily: 'cursive', fontWeight: 'bold', margin: '10px' }}>Enter data to add a new Product:</Typography>
            <TextField label="Title" name="title" value={newProduct.title} onChange={handleChange} margin="normal" /> <br/>
            <FormControl margin="normal" style={{ width: '210px'}}>
              <InputLabel>Category</InputLabel>
              <Select name="category" value={newProduct.category} onChange={handleChange} >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl> <br/>
            <TextField label="Price" type="number" name="price" value={newProduct.price} onChange={handleChange} margin="normal" /><br/>
            <TextField label="Link to image" name="image" value={newProduct.image} onChange={handleChange} margin="normal" /><br/>
            <TextareaAutosize name="description" value={newProduct.description} onChange={handleChange} aria-label="Description" rowsMin={5} placeholder="Description" fullWidth /><br/>
            <TextField label="In Stock" type="number" name="inStock" value={newProduct.inStock} onChange={handleChange} margin="normal" /><br/>
            <Button variant="contained" color="primary" onClick={addProduct} style={{ alignSelf: 'flex-end' ,marginRight:'10px'}}>Save</Button>
            <Button variant="contained" onClick={addProductMode} style={{ alignSelf: 'flex-end' }}>Cancel</Button>
          </Box>
        }
        
      </Box>

      <Grid item xs={12} sm={6} style={{margin: '20px'}}>
        {!inputProduct && 
          <Button variant="contained" color="primary" onClick={addProductMode}>Add New</Button>
        }
      </Grid>
    </Container>
  )
}

export default Products;
