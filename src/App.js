import React, { Component } from 'react';
import News from './components/News';
import Navbar from './components/Navbar';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'  
          progress={this.state.progress}
        />
        <Routes>
          <Route 
            path='/' 
            element={<News setProgress={this.setProgress} key='general' pageSize={6} country='us' category='general' />} 
          />
          <Route 
            path='/science' 
            element={<News setProgress={this.setProgress} key='science' pageSize={6} country='us' category='science' />} 
          />
          <Route 
            path='/business' 
            element={<News setProgress={this.setProgress} key='business' pageSize={6} country='us' category='business' />} 
          />
          <Route 
            path='/technology' 
            element={<News setProgress={this.setProgress} key='technology' pageSize={6} country='us' category='technology' />} 
          />
          <Route 
            path='/sports' 
            element={<News setProgress={this.setProgress} key='sports' pageSize={6} country='us' category='sports' />} 
          />
          <Route 
            path='/entertainment' 
            element={<News setProgress={this.setProgress} key='entertainment' pageSize={6} country='us' category='entertainment' />} 
          />
          <Route 
            path='/health' 
            element={<News setProgress={this.setProgress} key='health' pageSize={6} country='us' category='health' />} 
          />
        </Routes>
      </Router>
    );
  }
}
