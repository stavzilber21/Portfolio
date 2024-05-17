import React, {useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { update } from '../../firebase/firebaseFunctions';
import Table from '../Table';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, TextareaAutosize, Container, Grid, Box,Card } from '@mui/material';

export const ProductItem = ({product}) => {
    const users = useSelector((state) => state.users.users);
    const categories = useSelector((state) => state.categories.categories);
    const orders = useSelector((state) => state.orders.orders);
    const [productData, setProductData] = useState({ 
        title: product.title, 
        price: parseInt(product.price), 
        category: product.category,
        image: product.image, 
        description: product.description,
        inStock: product.inStock
    });
    const [tableProducts, setTableProducts] = useState([]);

    const handleChange = (e) => {
        // If the field is 'price', convert the value to a number before setting the state
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
            inStock: productData.inStock
        });
    };

    useEffect(() => {
        // Extract relevant information from orders
        const ordersProducts = orders.flatMap(order => {
            // Filter products in the order that match the current product
            const filterProducts = order.products.filter(product => product.name === productData.title);
            const user = users.find((user)=>user.id===order.userId)
            // Map filtered products to the required format
            return filterProducts.map(product => ({
                name: user.firstName,
                qty: product.qty,
                date: order.date
            }));
        });
    
        // Update the tableProducts state
        setTableProducts(ordersProducts);
    }, [orders, productData.title]);
    
    

  return (
    <Box p={3} m={3} border={1} borderRadius={4} maxWidth="md">
  <Grid container alignItems="center" spacing={3}>
    <Grid item xs={12} sm={6}>
      <div style={{ paddingRight: '20px' }}>
        <TextField label="Title" name="title" defaultValue={product.title} onChange={e => handleChange(e)} /> <br/><br/>
        <FormControl >
          <InputLabel>Category</InputLabel>
          <Select name="category" value={product.category} onChange={e => handleChange(e)}>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl> <br/><br/>
        <Typography>Description:</Typography>
        <TextareaAutosize name="description" defaultValue={product.description} aria-label="Description" onChange={e => handleChange(e) }/><br/><br/>
        <TextField label="In Stock" type="number" name="inStock" defaultValue={product.inStock} onChange={e => handleChange(e)}/><br/><br/>
        <Button variant="contained" color="primary" onClick={handleUpdateProduct}>Save</Button>
      </div>
    </Grid>
    <Grid item xs={12} sm={6}>
      <div style={{ paddingLeft: '20px' }}>
        <TextField label="Price" type="number" name="price" defaultValue={product.price} onChange={e => handleChange(e)}/><br/>
        <TextField label="Link to pic" name="image" defaultValue={product.image} onChange={e => handleChange(e)} margin="normal" /><br/>
        <Typography>Bought By:</Typography>
        <Table
          titles={['name', 'qty', 'date']}
          data={tableProducts}
        />
      </div>
    </Grid>
  </Grid>
</Box>

  )
}
export default ProductItem
