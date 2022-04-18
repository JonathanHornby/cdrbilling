import React from 'react';

import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

/** Main App, container for Navigation, Header, Main and Footer. Most of the work happens in Main */

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      view: 'Home',
      loggedIn: {status: true}
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({'view': view});
  }

  render() {
      return (
        <div className="App">
            <Navigation selected={this.state.view} changeView={this.changeView} />
            <Header />
            <Main view={this.state.view} />
            <Footer />
        </div>
      );
  }
}

export default App;
