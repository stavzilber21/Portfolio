import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import CategoryItem from './category';
import { add } from '../../firebase/firebaseFunctions';

const Categories = () => {
  const categories = useSelector((state) => state.categories.categories);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    const newCat = { name: newCategory };
    add("categories", newCat);
    setNewCategory('');
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" style={{ color: '#87cefa', fontFamily: 'cursive', fontWeight: 'bold', margin: '10px' }}>
            Categories
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {categories.map((cat) => (
            <CategoryItem key={cat.id} category={cat} />
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Add new category"
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={addCategory}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Categories;
