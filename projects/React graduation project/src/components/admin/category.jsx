import React, { useState } from 'react';
import { Typography, TextField, Button, Grid,Card, CardContent, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { add, update, remove } from '../../firebase/firebaseFunctions';

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
const CategoryItem = ({ category, setShowAddCategory }) => {
  const [editMode, setEditMode] = useState(isObjectEmpty(category)  ? true : false);
  const [editedName, setEditedName] = useState(isObjectEmpty(category) ? '' : category.name);

  const addCategory = () => {
    const newCat = { name: editedName };
    add("categories", newCat);
    setEditMode(!editMode);
    setShowAddCategory(false);
  };

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

  const saveEdit = () =>{
    if(editMode){
      if(isObjectEmpty(category)){
        addCategory()
      } else {
        handleUpdateCategory()
      }
    } else {
      setEditMode(!editMode)
    }
  }

  const handleButtonClick = () => {
    setEditMode(false);
    setShowAddCategory(false);
  };

  return (
    <Card className="category-card">
    <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {editMode ? (
        <TextField
          fullWidth
          value={editedName}
          onChange={handleChange}
          autoFocus
          style={{ marginRight: '8px' }} 
        />
      ) : (
        <Typography style={{ color: '#87cefa', fontFamily: 'cursive', fontWeight: 'bold', marginRight: '8px' }} variant="h6">{category.name}</Typography>
      )}

      <div style={{ display: 'flex', gap: '8px' }}> 
        <Button
          variant="outlined"
          onClick={saveEdit}
          startIcon={editMode ? <SaveIcon /> : <EditIcon />}
        >
          {editMode ? 'Save' : 'Edit'}
        </Button>
        {
          !isObjectEmpty(category) &&  <Button
              variant="outlined"
              color="secondary"
              onClick={handleRemoveCategory}
              startIcon={<DeleteIcon />}
              >
              Delete
          </Button>
        }
       
        {editMode && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleButtonClick}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
  );
};

export default CategoryItem;
