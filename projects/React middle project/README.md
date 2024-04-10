React Data Management Project
This project is a React application designed to manage and display data obtained from a server. It utilizes server data provided by the following endpoints:

Users Endpoint
Posts Endpoint
Todos Endpoint
Project Overview
The application manages a client-side database initialized with server data obtained from the provided endpoints. It offers various functionalities including displaying user data, searching users, updating and deleting user data, displaying additional user data on hover, managing user selection, adding new todos and posts, and adding new users.

Features
User Display

On application start, all user data is presented ordered by user ID.
Users with uncompleted tasks (todos) are marked with a red border, while others have a green border.
Search

Entering text in the search box filters the user list to display only users whose name or email contains the entered text.
Additional Data Display

Hovering over the "Other Data" section displays more data.
Clicking on the "Other Data" section closes the section.
Update/Delete Data

Editing user data and pressing "Update" updates the user's data.
Pressing "Delete" deletes all user data.
Selecting User

Clicking on the ID label colors the user region orange and displays the user's posts and todos.
Uncompleted todos have a "Mark Completed" button to complete the task.
Add New ToDo

Pressing "Add" above the "ToDo" list allows adding a new todo. Pressing "cancel" brings back the todo list.
Add New Post

Pressing "Add" above the "Posts" list allows adding a new post. Pressing "cancel" brings back the post list.
Add New User

Pressing "Add" above the "Users" list navigates to a new user screen where a new user can be created. Additional data cannot be provided during user creation but only when updating user data.
Setup Instructions
Clone the repository:

bash
Copy code
git clone <repository_url>
Install dependencies:

bash
Copy code
cd react-data-management-project
npm install
Run the application:

bash
Copy code
npm start
The application will start at http://localhost:3000.

Technologies Used
React
JavaScript
HTML
CSS
Credits
This project was created as part of a React application development assignment.
