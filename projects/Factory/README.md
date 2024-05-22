## Factory Management System Readme

### Description:
The Factory Management System is a comprehensive tool built using Node.js, Express, MongoDB, and HTML/CSS/JS. It facilitates efficient management of employees, departments, shifts, and users within a factory environment. The system ensures robust security through JWT token authentication and monitors user activities to enforce daily usage limits.

### Installation:

1. Clone the repository from [repository URL].
2. Install dependencies by running `npm install`.
3. Set up MongoDB and configure connection settings in `config.js`.
4. Start the server using `npm start`.

### Dependencies:

- Node.js
- Express
- MongoDB
- JWT for authentication
- HTML/CSS/JS for front-end

### Usage:

#### Login Page:

- Users must log in using their username and email, authenticated against the provided JSONPlaceholder API.
- Upon successful login, a JWT token is generated and stored in the client's browser.

#### Employees Page:

- Displays a table of all employees with their full name, department, and shifts.
- Clicking on an employee's name redirects to the "Edit Employee" page.
- Clicking on a department's name redirects to the "Edit Department" page.
- Allows filtering employees by department.
- Provides a "New Employee" button to add a new employee.

#### Edit Employee Page:

- Allows editing employee details, updating or deleting an employee, and managing their shifts.

#### New Employee Page:

- Allows adding a new employee with relevant details.

#### Departments Page:

- Displays a table of all departments with their manager and employees.
- Clicking on an employee's name redirects to the "Edit Employee" page.
- Clicking on a department's name redirects to the "Edit Department" page.
- Provides a "New Department" button to add a new department.

#### Edit Department Page:

- Allows editing department details, updating or deleting a department, and managing its employees.

#### New Department Page:

- Allows adding a new department with relevant details.

#### Shifts Page:

- Allows creating new shifts, modifying existing shifts, and allocating employees to shifts.

#### Users Page:

- Displays a table of all users with their maximum actions allowed and current actions taken.
- Users cannot be changed or deleted.

#### System Users:

- Only registered users are allowed to log in.
- All users are pre-declared in the database.
- User actions are logged and tracked. Once the maximum allowed actions per day are reached, the user is logged out until the following day.

### Logging:

- User actions are logged in a JSON file on the server.

### Notes:

- Shifts cannot be deleted once created.
- Maximum actions per user are enforced to prevent excessive usage.

### Contributing:

Contributions to this project are welcome. Feel free to submit bug reports, feature requests, or pull requests.

### Authors:

- Stav Zilber
  - Email: stavzilber@gmail.com

