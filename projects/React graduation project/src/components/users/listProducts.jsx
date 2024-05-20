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
import { Typography, IconButton, Container, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ListProducts = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);

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
      <Grid container spacing={2}>
        {/* Cart Section */}
        <Grid item xs={12} md={open ? 3 : 1} style={{ transition: 'width 0.3s' }}>
          {open && (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
              <Cart />
              <IconButton onClick={() => setOpen(!open)} sx={{ alignSelf: 'flex-start', mt: 2 }}>
                <ArrowBackIcon />
              </IconButton>
            </Box>
          )}
          {!open && (
            <IconButton onClick={() => setOpen(!open)} sx={{ alignSelf: 'flex-start' }}>
              <ArrowBackIcon />
            </IconButton>
          )}
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} md={open ? 9 : 11} style={{ transition: 'width 0.3s' }}>
          <Box className="box-products">
            <Typography>Filter By:</Typography>
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

          <Box className="box-products">
            <Grid container spacing={2}>
              {filterData.map(pro => (
                <Grid item xs={12} lg={6} key={pro.id}>
                  <PurProducts product={pro} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListProducts;
