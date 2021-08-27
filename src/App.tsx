import React from 'react';
import './App.css';
import Header from './containers/Header'
import Router from './containers/Router'
import Footer from './containers/Footer'

function App() {
  return (
    <div className="App">
      <div className="content">
        <Header />
        <Router />
      </div>
      <Footer />
    </div>
  );
}

export default App;
