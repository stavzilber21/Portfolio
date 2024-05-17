import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid ,Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryItem from './category';


const Categories = () => {
  const categories = useSelector((state) => state.categories.categories);
const [showAddCategory, setShowAddCategory] = useState(false)
 
 

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" style={{ color: '#87cefa', fontFamily: 'cursive', fontWeight: 'bold', margin: '10px' }}>
            Categories
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={0.5}>
          {categories.map((cat) => (
            <Grid item xs={6} key={cat.id}>
              <CategoryItem category={cat} setShowAddCategory={setShowAddCategory}/>
            </Grid>
          ))}
           {showAddCategory && <Grid item xs={6}>
              <CategoryItem category={{}} setShowAddCategory={setShowAddCategory} />
            </Grid>}
           
        </Grid>
        
        <Fab
        color="primary"
        aria-label="add"
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
        onClick={() => setShowAddCategory(true)}
      >
        <AddIcon />
      </Fab>
      </Grid>
    </Container>
  );
};

export default Categories;
