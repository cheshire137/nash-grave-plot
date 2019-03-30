import React, { Component } from 'react';
import IntermentList from './components/IntermentList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="container d-flex flex-items-center flex-justify-between">
            <h1>NashGravePlot</h1>
            <h2 className="f6 text-normal">
              Data from <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://data.nashville.gov/Geneology/Davidson-County-Cemetery-Survey/ttqg-mpiz"
              >Davidson County Cemetery Survey</a>
            </h2>
          </div>
        </header>
        <IntermentList />
      </div>
    );
  }
}

export default App;
