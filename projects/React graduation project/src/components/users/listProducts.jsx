import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PurProducts from './purProducts';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { BsArrowLeftShort } from 'react-icons/bs';
import Cart from './Cart';

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
    <div style={{ display: "flex"}}>
      <div>
        {open &&
        <>
          <Cart/>
          
          </>
        }
      <BsArrowLeftShort onClick={()=>setOpen(!open)}></BsArrowLeftShort>
      </div>
      <div>
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 8 }}>
          <Box sx={{ mb: 2 }}>
            <strong>Filter By: </strong>
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
                Price:
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
          <Box>
            {filterData.map(pro => (
              <PurProducts key={pro.id} product={pro} />
            ))}
          </Box>
        </Box>
      </div>
    </div>
    
  );
};

export default ListProducts;
