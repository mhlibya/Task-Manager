# Task Manager

Task Manager is a web application that allows users to manage their tasks. Users can create, update, delete, and restore tasks. The application also supports user authentication and authorization.

## Features

- **User Authentication**: Users can register, log in, and log out.
- **Task Management**: Users can create, update, delete, and restore tasks.
- **Task Prioritization**: Tasks can be prioritized as high, medium, or low.
- **Task Status**: Tasks can have statuses such as "to do", "in progress", and "done".
- **Trashed Tasks**: Users can view and restore trashed tasks.
- **Time Tracker**: Users can start a countdown timer for tasks and track delays.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

1. **Clone the repository**:

     ```bash
    git clone https://github.com/your-username/task-manager.git
    cd task-manager
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=8800
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:

    ```bash
    npm start
    ```

    The application will be running at `http://localhost:8800`.

### Usage

1. **Register a new user**:

    Navigate to `http://localhost:8800/register` and create a new account.

2. **Log in**:

    Navigate to `http://localhost:8800/login` and log in with your credentials.

3. **Manage tasks**:

    - **Create a task**: Click on the "Create Task" button and fill out the form.
    - **Update a task**: Click on a task to view its details and click the "Edit Task" button.
    - **Delete a task**: Click on the "Delete" button next to a task.
    - **Restore a task**: Navigate to the "Trashed Tasks" page and click on the "Restore" button next to a task.

4. **Use the Time Tracker**:

    - **Start a countdown timer**: Click on a task to view its details and click the "Start Timer" button.
    - **Track delays**: The application will track any delays after the countdown timer ends.

5. **Log out**:

    Click on the "Logout" button at the bottom right of the page.