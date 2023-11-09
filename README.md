
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

### Editing Books

To edit information about a book, make a PUT request to the `/book/:id` endpoint, providing new data in JSON format.

### Searching for Books

To search for books, make a GET request to the `book/search/:title` endpoint, providing data in JSON format.

### Managing Bookshelf

The API allows users to manage their own bookshelves by adding, deleting, and editing books.

## Account Overview

A GET request to the `/account` endpoint enables users to view information about their accounts, such as login details, statistics, and other relevant information.

## JWT Token Authentication

To access protected resources, log in using a JWT token. The token is generated after a successful login process and should be included in the header of each request requiring authentication.

## Link to Frontend Repository: 
https://github.com/Swichu553/bookcase-front

## SQL File
You can find the SQL file https://github.com/Swichu553/bookcase-back/tree/main/SQL

## Frontend Screenshots
![Login](https://github.com/Swichu553/bookcase-back/assets/142433450/c39e7111-d70d-46f9-b8e1-499e56dbd557)
![MyBook](https://github.com/Swichu553/bookcase-back/assets/142433450/6b171fc7-f5f3-4cda-ae5e-ae366cd43433)
![Search](https://github.com/Swichu553/bookcase-back/assets/142433450/494cb72a-aae2-414e-a1c4-e108ce81e052)
![DescriptionBook](https://github.com/Swichu553/bookcase-back/assets/142433450/df652d28-ccb3-45c1-aaeb-8fe085f75779)
