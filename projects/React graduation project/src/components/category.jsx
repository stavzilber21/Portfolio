import React, { useState } from 'react';
import { update, remove } from '../firebase/firebaseFunctions';

export const CategoryItem = ({ category }) => {
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
    <div>
      {editMode ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={handleChange}
            onBlur={handleUpdateCategory}
            autoFocus // Autofocus the input field when in edit mode
          />
          <button onClick={() => setEditMode(!editMode)}>Cancel</button>
        </>
      ) : (
        <h3>{category.name}</h3>
      )}
      <button onClick={handleUpdateCategory}>{editMode ? 'Save' : 'Update'}</button>
      <button onClick={handleRemoveCategory}>Remove</button>
    </div>
  );
};

export default CategoryItem;
