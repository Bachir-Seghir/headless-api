# Headless API : Node.js Express API with RBAC and Permissions

This is a Node.js Express API that demonstrates how to implement Role-Based Access Control (RBAC) and permissions to manage user authentication, authorization, and CRUD operations.

## Features

- User registration and login with password hashing using bcrypt.
- JWT-based authentication and token-based authorization for protected routes.
- Role-based access control to restrict certain actions to specific roles (e.g., admin).
- Middleware for ownership verification to allow owners to perform specific operations.
- Centralized management of RBAC roles and permissions.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd headless-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster-name...
   SECRET_KEY=your-secret-key
   ```

Replace the values accordingly.

5. Start the development server:
   ```bash
   npm start
   ```

The server should now be running on `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /api/users/register`: Register a new user. Required data: `username`, `email`, `password`.
- `POST /api/users/login`: Login an existing user. Required data: `username`, `password`.

### User Routes (Protected)

- `PUT /api/users/:id`: Update the user's own data. Requires authentication and ownership.
- `DELETE /api/users/:id`: Delete Account. Requires authentication and ownership.

### Admin Routes (Protected)

- `GET /api/admin/users`: Get all users. Requires admin role.
- `DELETE /api/admin/user/:id`: Delete a user by Id. Requires admin role.
- `PUT /api/admin/user/:id`: Update all user's data. Requires admin role.

## RBAC Roles

- `user`: Default role for registered users.
- `admin`: Role for administrators.

## Permissions

- `read`: Read data (e.g., get user data).
- `write`: Create or update data (e.g., user registration).
- `delete`: Delete data (e.g., delete user).

## Authentication and Authorization

This API uses JWT-based authentication for user login and registration. It also implements token-based authorization with RBAC to restrict access to specific routes based on user roles and permissions.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to improve this API.

## Authors

- [Bachir Seghir](https://github.com/bachir-seghir)
