# Library App

## Description

LibraryApp is a full-featured web application built with React for managing a library's books, publishers, authors, and borrowing records. The app allows users to Add, Update, and Delete entries for books and publishers, while also handling categories and related operations. The goal of the project is to simplify the management of library resources, with a user-friendly interface and smooth interaction across multiple operations.

This project utilizes reusable components to maintain modularity and flexibility in UI elements, enabling easy future enhancements. It is fully integrated with a backend API, allowing persistent data storage and live updates for all resources.

[View the deployed website here!](https://library-app-beste.netlify.app/)

## Features

- **Book Management:** Add, update, and delete books with associated information such as title, category, publisher, and other metadata.

- **Publisher Management:** Manage a list of publishers, including adding, updating, and deleting entries.

- **Category Selection:** Support for multiple categories using Select input, which allows users to choose one or more categories for a book.

- **Author Management:** Add, update, and delete author information, and associate them with books. Each book can have one author, and authors can be reused across multiple books.

- **Borrowing Management:** Track which books have been borrowed, by whom, and the borrowing duration. Maintain records of borrowed and returned books, allowing the library staff to manage the borrowing lifecycle easily.

- **Reusability:** Core components like forms, modals, buttons, and tables are designed to be reusable across different sections of the app.

- **Modal Windows:** Modals are used to update the content without navigating away from the main page, ensuring a smooth user experience.

- **Error Handling:** Graceful handling of operations like empty inputs, non-existent categories, and more.

- **Backend Integration:** The app is integrated with a backend API, enabling real-time operations and persistence across different entities (books, publishers, authors, etc.).

- **Dockerized Setup:** Both frontend and backend are containerized using **Docker**, simplifying deployment and development across different environments.

## Technologies Used

- **React.js:** The main framework used for building the dynamic front-end of the application.

- **Material-UI (MUI):** A React component library used to provide pre-designed components and ensure a polished look.

- **JavaScript (ES6+):** For client-side logic.

- **CSS:** Styling of the components.

- **Docker:** Used for containerizing the frontend and backend projects, enabling easy setup and scaling.

- **Axios:** To handle HTTP requests for backend integration.

## Installation

### Prerequisites

- **Node.js:** Make sure you have Node.js installed (version 12 or higher).

-- **Docker:** Ensure Docker is installed and running.

- **npm** or **yarn:** For managing dependencies.

### Clone the Reporsitory

```
git clone https://github.com/besteceltek/LibraryApp.git
cd LibraryApp
```

### Install Dependencies

```
npm install
# or if you're using yarn
yarn install
```

### Running the App (via Docker)

This project is fully dockerized, including both frontend and backend.

1. Start the app by running the following command:

```
docker-compose up
```

2. Docker will build and start both the frontend and backend services. You can access the frontend at:

```
http://localhost:3000
```

### Manual Run (without Docker)

To start the frontend locally without Docker:

```
npm start
# or if you're using yarn
yarn start
```

Make sure your backend is running separately before you start the frontend. The backend API URL is configured in the environment variables.

## Contributing

Contributions are welcome! If you’d like to contribute:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Submit a pull request with a clear explanation of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENCE) file for details.