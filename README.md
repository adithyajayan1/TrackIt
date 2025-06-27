# TrackIt:
TrackIt is a full-stack web application designed to help users efficiently manage their income and expenses. Built with the MERN stack, it offers secure user authentication, robust transaction tracking, and intuitive data visualization, all wrapped in a sleek dark-themed user interface.

## 🚀 Features
User Authentication: Secure registration and login using JSON Web Tokens (JWT).

Income Management: Add, view, and delete income records.

Expense Management: Add, view, and delete expense records.

Dashboard Overview: Get a quick summary of total balance, total income, and total expenses.

Data Visualization: Interactive charts showing income vs. expense trends and category-wise breakdowns using Recharts.

Recent Transactions: A glance at your latest financial activities on the dashboard.

Excel Export: Download detailed income and expense reports in Excel format.

Responsive Design: Optimized for a seamless experience across various devices (desktop, tablet, mobile).

Modern UI: A clean, dark-themed interface built with Tailwind CSS.

## 🛠️ Technologies Used
Backend (Server):

Node.js: JavaScript runtime environment.

Express.js: Web framework for Node.js.

MongoDB: NoSQL database for flexible data storage.

Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.

JWT (jsonwebtoken): For secure, stateless authentication.

Bcryptjs: For hashing passwords securely.

CORS: Middleware to enable Cross-Origin Resource Sharing.

Express-Async-Handler: Simplifies error handling for async Express routes.

ExcelJS: For generating .xlsx Excel reports.

Dotenv: To manage environment variables.

Frontend (Client):

React: JavaScript library for building user interfaces.

React Router DOM: For declarative routing in React applications.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Zustand: A small, fast, and scalable bear-necessities state-management solution for React.

React Icons (Fa): A collection of popular icon libraries.

Recharts: A composable charting library built on React components.

Moment.js: For parsing, validating, manipulating, and formatting dates.

React Hot Toast: For beautiful, accessible, and customizable notifications.

## 💻 Setup and Run Locally
Follow these steps to get your TrackIt application up and running on your local machine.

Prerequisites
Node.js (v16 or higher)

npm (Node Package Manager)

MongoDB Atlas Account (for cloud database) or local MongoDB instance

1. Clone the Repository
First, clone the project from your GitHub repository:

git clone https://github.com/adithyajayan1/TrackIt.git
cd TrackIt

2. Backend Setup
Navigate into the server directory, install dependencies, and set up your environment variables.

cd server
npm install

Create a .env file in the server directory with the following content:

PORT=5000
MONGO_URI=mongodb+srv://<your_mongodb_username>:<your_mongodb_password>@cluster0.your_cluster_id.mongodb.net/expense-tracker-db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here

Important:

Replace <your_mongodb_username> and <your_mongodb_password> with the credentials of a new database user you create in MongoDB Atlas.

Replace cluster0.your_cluster_id.mongodb.net with your actual MongoDB Atlas cluster connection string.

Ensure your IP address is whitelisted in MongoDB Atlas Network Access settings.

Replace your_super_secret_jwt_key_here with a strong, random string for JWT.

Start the Backend Server:

npm run dev
Or, for a simple start: npm start

The server will run on http://localhost:5000. Keep this terminal window open.

3. Frontend Setup
Open a new terminal window, navigate into the client directory, and install dependencies.

cd ../client
npm install

Note: If you encounter npx tailwindcss init -p errors, ensure npm install completed successfully. Create React App (CRA) handles Tailwind compilation automatically with the config files.

Start the Frontend Development Server:

npm start

This will open the application in your browser at http://localhost:3000 (or another available port).
