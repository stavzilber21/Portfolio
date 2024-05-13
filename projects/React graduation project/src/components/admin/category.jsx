import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { update, remove } from '../../firebase/firebaseFunctions';

const CategoryItem = ({ category }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(category.name);

  const handleUpdateCategory = () => {
    if (editMode) {
      // Update category name in Firebase
      update("categories", category.id, { name: editedName });
    }
    // Toggle edit mode
    setEditMode(!editMode);
  };

  const handleRemoveCategory = () => {
    // Remove category from Firebase
    remove("categories", category.id);
  };

  const handleChange = (e) => {
    setEditedName(e.target.value);
  };

  return (
    <Box p={2} border={1} borderRadius={4} m={3}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={editMode ? 3 : 5}>
          {editMode ? (
            <TextField
              fullWidth
              value={editedName}
              onChange={handleChange}
              autoFocus
            />
          ) : (
            <Typography style={{ color: '#87cefa', fontFamily: 'cursive', fontWeight: 'bold'}} variant="h6">{category.name}</Typography>
          )}
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={editMode ? handleUpdateCategory : () => setEditMode(!editMode)}
            startIcon={editMode ? <SaveIcon /> : <EditIcon />}
          >
            {editMode ? 'Save' : 'Edit'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="error"
            onClick={handleRemoveCategory}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Grid>
        {editMode && (
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditMode(false)}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CategoryItem;
