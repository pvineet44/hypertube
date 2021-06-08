import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import i18n from './translations/i18n';
import './translations/i18n';

function App() {
  const [language, setLanguage] = useState('en');

  const changeLang = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className='App'>
      <Router>
        <Header lang={language} changeLang={changeLang} />
        <Switch>
          <Route exact path='/'>
            <Login lang={language} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
