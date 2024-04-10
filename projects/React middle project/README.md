# React Data Management Project

This project is a React application designed to manage and display data obtained from a server. It utilizes server data provided by the following endpoints:

- [Users Endpoint](https://jsonplaceholder.typicode.com/users)
- [Posts Endpoint](https://jsonplaceholder.typicode.com/posts)
- [Todos Endpoint](https://jsonplaceholder.typicode.com/todos)

## Project Overview

The application manages a client-side database initialized with server data obtained from the provided endpoints. It offers various functionalities including displaying user data, searching users, updating and deleting user data, displaying additional user data on hover, managing user selection, adding new todos and posts, and adding new users.

### Features

1. **User Display**
   - On application start, all user data is presented ordered by user ID.
   - Users with uncompleted tasks (todos) are marked with a red border, while others have a green border.

2. **Search**
   - Entering text in the search box filters the user list to display only users whose name or email contains the entered text.

3. **Additional Data Display**
   - Hovering over the "Other Data" section displays more data.
   - Clicking on the "Other Data" section closes the section.

4. **Update/Delete Data**
   - Editing user data and pressing "Update" updates the user's data.
   - Pressing "Delete" deletes all user data.

5. **Selecting User**
   - Clicking on the ID label colors the user region orange and displays the user's posts and todos.
   - Uncompleted todos have a "Mark Completed" button to complete the task.

6. **Add New ToDo**
   - Pressing "Add" above the "ToDo" list allows adding a new todo. Pressing "cancel" brings back the todo list.

7. **Add New Post**
   - Pressing "Add" above the "Posts" list allows adding a new post. Pressing "cancel" brings back the post list.

8. **Add New User**
   - Pressing "Add" above the "Users" list navigates to a new user screen where a new user can be created. Additional data cannot be provided during user creation but only when updating user data.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:

   ```bash
   cd react-data-management-project
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

   The application will start at `http://localhost:3000`.

## Technologies Used

- React
- JavaScript
- HTML
- CSS

## Credits

This project was created as part of a React application development assignment.

![image](https://github.com/stavzilber21/YanivAradCourse/assets/93096648/d9374bba-67a1-46db-9f24-932087556a9b)

