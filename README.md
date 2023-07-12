# User Management Application

This is a Node.js application for user management. It provides RESTful endpoints to add, retrieve, update, and delete user information.

## Prerequisites

Before running the application, ensure that you have the following dependencies installed:

- Node.js (version X.X.X or higher)
- npm (Node Package Manager)
- MongoDB (connection string)

## Getting Started

To set up and run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/UncleH25/InternshipApp.git
2. Open the terminal within your IDE and type in the following:
    ```bash
   npm index.js
3. If it says 'Server is running on port 3000' and 'Connected to MongoDB', then it is currently running.
4. Then go to this link:
   ```bash
   hosting service website

### NOTE 
The application will be running at http://localhost:3000.

## API Endpoints

The following endpoints are available in the application:

- POST /add-user
  - Add a new user to the system.
- GET /get-users
  - Get a list of all users.
- GET /get-user/{username}
  - Get details of a specific user by username.
- DELETE /delete-user/{username}
  - Delete a user by username.
- PATCH /edit-user
  - Update user information.
 
## Dependencies
The application uses the following dependencies:

- express: Web framework for Node.js.
- mongoose: MongoDB object modeling tool.
- uuid: Library for generating UUIDs.

## Contributions
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
