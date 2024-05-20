import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { update } from '../../firebase/firebaseFunctions';
import Table from '../Table';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, TextareaAutosize, Grid, Card, CardContent, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export const ProductItem = ({ product }) => {
  const users = useSelector((state) => state.users.users);
  const categories = useSelector((state) => state.categories.categories);
  const orders = useSelector((state) => state.orders.orders);
  const [editMode, setEditMode] = useState(false);
  const [productData, setProductData] = useState({
    title: product.title,
    price: parseInt(product.price),
    category: product.category,
    image: product.image,
    description: product.description,
    inStock: product.inStock,
  });
  const [tableProducts, setTableProducts] = useState([]);

  const handleChange = (e) => {
    const value = e.target.name === 'price' || e.target.name === 'inStock' ? parseInt(e.target.value) : e.target.value;
    setProductData({ ...productData, [e.target.name]: value });
  };

  const handleUpdateProduct = () => {
    update("products", product.id, {
      title: productData.title,
      price: productData.price,
      category: productData.category,
      image: productData.image,
      description: productData.description,
      inStock: productData.inStock,
    });
    setEditMode(false);
  };

  useEffect(() => {
    const ordersProducts = orders.flatMap(order => {
      const filterProducts = order.products.filter(p => p.name === productData.title);
      const user = users.find((user) => user.id === order.userId);
      return filterProducts.map(product => ({
        name: user.firstName,
        qty: product.qty,
        date: order.date,
      }));
    });

    setTableProducts(ordersProducts);
  }, [orders, productData.title]);

  return (
    <Card className="productAdmin-card">
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            {editMode ? (
              <div style={{ paddingRight: '20px' }}>
                <TextField
                  label="Title"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  fullWidth
                /> <br /><br />
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    fullWidth
                  >
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl> <br /><br />
                <Typography>Description:</Typography>
                <TextareaAutosize
                  name="description"
                  value={productData.description}
                  aria-label="Description"
                  onChange={handleChange}
                /><br /><br />
                <TextField
                  label="In Stock"
                  type="number"
                  name="inStock"
                  value={productData.inStock}
                  onChange={handleChange}
                  fullWidth
                /><br /><br />
              </div>
            ) : (
              <div>
                <Typography variant="h6" className="product-title">Title: </Typography> 
                <Typography>{product.title}</Typography> <br />
                <Typography variant="h6" className="product-title">Category: </Typography>
                <Typography>{product.category}</Typography> <br />
                <Typography variant="h6" className="product-title">Description:</Typography>
                <Typography>{product.description}</Typography> <br />
                <Typography variant="h6" className="product-title">In Stock: </Typography> 
                <Typography>{product.inStock}</Typography> <br />
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {editMode ? (
              <div >
                <TextField
                  label="Price"
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  fullWidth
                /><br /><br />
                <TextField
                  label="Link to pic"
                  name="image"
                  value={productData.image}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                /><br /><br />
              </div>
            ) : (
              <div style={{ paddingLeft: '20px' }}>
                <Typography variant="h6" className="product-title">Price: </Typography>
                <Typography>{product.price}</Typography> <br />
                <Typography variant="h6" className="product-title">Image:</Typography>
                <img src={product.image} alt={product.title} width={'100px'} height={'100px'} /> <br />
              </div>
            )}
            <Typography variant="h6" className="product-title">Bought By:</Typography>
            <Table
              titles={['name', 'qty', 'date']}
              data={tableProducts}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {editMode ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProduct}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditMode(false)}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditMode(true)}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductItem;
