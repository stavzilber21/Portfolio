import React, { useState } from 'react';
import { Typography, TextField, Button, Card, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { update, remove } from '../../firebase/firebaseFunctions';

const CategoryItem = ({ category, isNew, newCategoryName, setNewCategoryName, handleAddCategory, handleCancelAdd }) => {
  const [editMode, setEditMode] = useState(isNew || false);
  const [editedName, setEditedName] = useState(category.name || '');

  const handleUpdateCategory = () => {
    if (editMode) {
      update("categories", category.id, { name: editedName });
    }
    setEditMode(!editMode);
  };

  const handleRemoveCategory = () => {
    remove("categories", category.id);
  };

  const handleChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleSave = () => {
    if (isNew) {
      handleAddCategory();
    } else {
      handleUpdateCategory();
    }
  };

  return (
    <Card className="category-card">
      <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {editMode ? (
          <TextField
            fullWidth
            value={isNew ? newCategoryName : editedName}
            onChange={isNew ? (e) => setNewCategoryName(e.target.value) : handleChange}
            autoFocus
            style={{ marginRight: '8px' }} 
          />
        ) : (
          <Typography variant="h6" className="category-title">{category.name} </Typography>
        )}

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="outlined"
            onClick={handleSave}
            startIcon={editMode ? <SaveIcon /> : <EditIcon />}
          >
            {editMode ? 'Save' : 'Edit'}
          </Button>
          {!isNew && (
            <Button
              variant="outlined"
              onClick={handleRemoveCategory}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
          {editMode && (
            <Button
              variant="outlined"
              onClick={isNew ? handleCancelAdd : () => setEditMode(false)}
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
