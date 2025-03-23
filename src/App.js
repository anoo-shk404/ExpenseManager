import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExpenseSplitter from './components/ExpenseSplitter';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expense-splitter" element={<ExpenseSplitter />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple Home component
const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Expense Manager</h1>
      <p>Manage and split expenses with friends and family easily.</p>
      <div className="features">
        <div className="feature">
          <h2>Expense Splitter</h2>
          <p>Split bills equally among participants with our easy-to-use expense splitter.</p>
          <p>Your data is saved locally, so you won't lose your expenses when refreshing the page.</p>
        </div>
        {/* You can add more features here as you develop them */}
      </div>
    </div>
  );
};

export default App;