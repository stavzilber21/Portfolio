# e-Commerce Web Site Project

## Overview

This project is an e-Commerce web application built using React and Redux for state management. The application is divided into two operation modes: Administration and Customer Usage. The target audience includes registered customers (users) and the admin of the website.

## Demo



https://github.com/stavzilber21/YanivAradCourse/assets/93096648/28e6facf-0e24-4849-a484-2be91abdce99



## Features

### General
- **User Authentication**: Users must log in to access the site. New users can register via the registration page.
- **User Roles**: The site supports two roles - Admin and Customer. Admin has access to management features, while Customers can browse and purchase products.

### Administration Mode
Accessible only to the admin after logging in. The admin can manage categories, customers, products, and view statistics.

1. **Categories Page**
   - Add, update, or delete product categories.
   - Update category names with an inline editable text box.

2. **Customers Page**
   - View data of all registered customers and their orders.

3. **Products Page**
   - Manage the product catalog (add, update, or delete products).
   - View customers who bought each product, along with quantity and order date.

4. **Statistics Page**
   - Dashboard with a pie chart showing all products sold.
   - Bar chart showing the quantity of products sold per customer. The admin can select different customers from a dropdown list.

### Customer Mode
Accessible to all logged-in customers. Customers can manage their accounts, view their orders, and browse the product catalog.

1. **My Account Page**
   - View and update personal data.

2. **My Orders Page**
   - View all past product orders.

3. **Products Catalog Page**
   - Browse all available products.
   - Filter products by category, price, and title.
   - View product details, including stock quantity and number of units sold.
   - Add products to the cart and adjust quantities.

4. **Cart Section**
   - View selected products, total price for each product, and the total order cost.
   - Place orders and log out upon completion.

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **React Material UI**: For designing the user interface.
- **CSS**: For additional styling.

### Contributing:

Contributions to this project are welcome. Feel free to submit bug reports, feature requests, or pull requests.

### Authors:

- Stav Zilber
  - Email: stavzilber@gmail.com

### Acknowledgments:

- Thanks to Yaniv Arad's course.
