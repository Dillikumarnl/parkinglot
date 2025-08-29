# Frontend 
Follow these steps to get the project up and running on your local machine.

## Open your terminal or any IDE you want.
You can use *vs code*, *webStorm*,etc., Or simple use Terminal.

## Clone the main Repo to get the copy of it.
```
git clone https://github.com/Dillikumarnl/parkinglot.git
```
## Switch to the project/frontend folder 
```
cd parkinglot/frontend
```
make sure you have been in the current directory in /frontend.

## 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/en/download) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

## 🔧 Installation
To install all the necessary dependencies for the project, navigate to the root directory of the frontend project in your terminal and run the following command:

```
npm install

```

This command reads the package.json file and downloads the required libraries into the node_modules folder.

## 🏃 Running the Application
Once the dependencies are installed, you can start the development server by running this command:

```
npm start

```


This will launch the application and typically open it in your default web browser at http://localhost:3000. The server will automatically reload when you make changes to the code.

---


# Backend 
This section provides instructions for setting up and running the backend application.
Note: For better user experience you may open the backend root in *intellij idea* IDE.

## Switch the present working directory to project/backend folder to run backend.
```
cd parkinglot/backend
```
make sure you have been in the current directory in /backend .

## 🛠️ Database Setup
Before you can run the backend, you'll need to set up a database instance, either on your local machine or a remote server.

### Local Database
For local development, you can install a database server like MySQL, PostgreSQL, or MongoDB (depending on the project's requirements) and create a new database instance for the application.

### Remote Database
Alternatively, you can use a managed database service from a cloud provider like Google Cloud, AWS, or Azure and connect to it remotely.

Regardless of your choice, you will need to create a new database and a dedicated user with permissions to access it.

for more info [visit](https://www.postgresql.org/docs/current/sql-createdatabase.html) or you can create your db using any DBMS GUI.

Once the database is created, you can use the credentials for the .env file.

## 📄 Environment Variables
For the application to connect to the database, you need to create a .env file in the root directory of the backend project. This file stores sensitive configuration details.

The .env file should contain the following variables with corresponding values:

```
DB_HOST='your host address'
DB_PORT='your db port number'
DB_USER='your db username'
DB_PASSWORD='your db password'

```

Replace the placeholder values with your actual database connection information.

## 📦 Dependency Management
This project uses Maven for dependency management. If you need to reload or install the dependencies, you can do so from your IDE or by using the command line.

Navigate to the backend project's root directory in your terminal and run the following command:

```
mvn clean install
```

This command will clean the previous build and install all the dependencies specified in the pom.xml file.

## 🚀 Running the Application
After setting up the environment variables and installing the dependencies, you can run the backend application from your IDE by running the main class, or by using the following command:

```
mvn spring-boot:run
```

This will start the backend server, and you can now connect your frontend application to it.
