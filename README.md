
![header](https://github.com/Swichu553/bookcase-back/assets/142433450/7aa16609-ecce-4ff4-a779-12300a174c17)
# Bookcase API

Bookcase API is the backend component of an application designed to manage books. It utilizes Node.js, Express.js, MariaDB, and TypeScript. Authentication is handled using JWT tokens.

## Technologies

- Node.js
- Express.js
- MariaDB
- TypeScript

## Features

### Adding Books

To add a new book to the database, make a POST request to the `/book` endpoint, providing the necessary book information in JSON format.

### Deleting Books

To delete a book, make a DELETE request to the `/book/:id` endpoint, where `:id` is the book identifier.

### Searching for Books

To search for books, make a GET request to the `book/search/:title` endpoint, providing data in JSON format.

### Managing Bookshelf

The API allows users to manage their own bookshelves by adding, deleting, and editing books.

## Account Overview

A GET request to the `user/:id` endpoint enables users to view information about their accounts, such as login details, statistics, and other relevant information.

## JWT Token Authentication

To access protected resources, log in using a JWT token. The token is generated after a successful login process and should be included in the header of each request requiring authentication.

## Link to Frontend Repository: 
https://github.com/Swichu553/bookcase-front

## SQL File
You can find the SQL file https://github.com/Swichu553/bookcase-back/tree/main/SQL

# Running the Backend Application

1. **Clone the Repository:**
   Clone the backend application repository to your local machine:
   ```bash
   git clone https://github.com/Swichu553/bookcase-back.git
   ```

2. **Install Dependencies:**
   Navigate to the project directory and install necessary dependencies using the command:
   ```bash
   cd bookcase-back
   npm install
   ```

3. **Run the Application:**
   Start the local server on port 3001:
   ```bash
   ts-node index.ts
   ```

   The application will be accessible at: http://localhost:3000

# Importing SQL File via phpMyAdmin

1. **Open phpMyAdmin:**
   Visit http://localhost/phpmyadmin/ in your browser.

2. **Log in to phpMyAdmin:**
   Log in to phpMyAdmin using the appropriate login credentials.

3. **Choose Database:**
   Select the database to which you want to import the SQL file.

4. **"Import" Tab:**
   Go to the "Import" tab in the top menu.

5. **Choose SQL File:**
   Click the "Choose file" button and select the bookcase.sql file from the project's local directory: '\bookcase-back\SQL'.

6. **Import SQL File:**
   Click the "Go" button to import the contents of the SQL file into the selected database.

After completing these steps, the backend application should be running locally, and the SQL file should be imported into the database using phpMyAdmin.
``` ````

## Frontend Screenshots
![Login](https://github.com/Swichu553/bookcase-back/assets/142433450/c39e7111-d70d-46f9-b8e1-499e56dbd557)
![MyBook](https://github.com/Swichu553/bookcase-back/assets/142433450/6b171fc7-f5f3-4cda-ae5e-ae366cd43433)
![Search](https://github.com/Swichu553/bookcase-back/assets/142433450/494cb72a-aae2-414e-a1c4-e108ce81e052)
![DescriptionBook](https://github.com/Swichu553/bookcase-back/assets/142433450/df652d28-ccb3-45c1-aaeb-8fe085f75779)

