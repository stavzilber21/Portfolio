import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PurProducts from './purProducts';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Cart from './Cart';
import { Typography,IconButton ,Container, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ListProducts = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [open,setOpen]=useState(false);

  const filterData = products.filter(pro =>
    (category !== '' && category !== 'All' ? pro.category === category : true) &&
    (price !== 0 ? pro.price <= price : true) &&
    (title !== '' ? pro.title.includes(title) : true)
  );

  const clearFilter = () => {
    setCategory('');
    setTitle('');
    setPrice(0);
  };

  return (
    
    <Container maxWidth="lg">
    <Grid container spacing={2} style={{ display: "flex" }}>
      {/* Cart Section */}
      <Grid item xs={12} md={open ? 3 : 0}>
          {open &&
            <>
              <Cart />
            </>
          }
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        {/* Products Section */}
        <Grid item xs={12} md={open ? 9 : 12}>
          <Box sx={{ p: 2,m: 5, border: '2px solid #ccc', borderRadius: 5 , bgcolor: '#f0ffff'}}>
            <Typography>Filter By: </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Select
                value={category}
                onChange={e => setCategory(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Select category...' }}
              >
                <MenuItem value="" disabled>
                  Select category...
                </MenuItem>
                <MenuItem value='All'>All</MenuItem>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
                ))}
              </Select>
              <Box sx={{ width: '200px' }}>
                <Typography>Price:</Typography>
                <Slider
                  aria-label="Price"
                  valueLabelDisplay="auto"
                  size='small'
                  step={1}
                  min={1}
                  max={1000}
                  value={price}
                  onChange={(e, value) => setPrice(value)}
                />
              </Box>
              <TextField
                label='Title'
                variant='outlined'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <Button variant='contained' onClick={clearFilter}>Clear</Button>
            </Box>
          </Box>
          <Box sx={{ p: 2,m: 5, border: '2px solid #ccc', borderRadius: 5, bgcolor: '#f0ffff'}}>
            {filterData.map(pro => (
              <PurProducts key={pro.id} product={pro} />
            ))}
          </Box>
        
          </Grid>
      </Grid>
    </Container>
    
  );
};

export default ListProducts;
