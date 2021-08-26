import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './containers/Header'
import Router from './containers/Router'
import Detail from './containers/Detail'
import List from './containers/List'
import Footer from './containers/Footer'


function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      {/* <List /> */}
      {/* <Detail /> */}
      <Footer />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello world</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
