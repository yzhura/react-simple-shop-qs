import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppProvider from "../appContext";

import { MainView, ChangeView, CartView } from "../pages";

function App() {

  return (
    <div id='wrapper'>
      <AppProvider>
        <Router>
          <Switch>
            <Route path="/create-view">
              <ChangeView/>
            </Route>
            <Route path='/edit-view/:id' component={ChangeView}/>
            <Route path="/cart-view">
              <CartView/>
            </Route>
            <Route path='/'>
              <MainView/>
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    </div>
  )
}

export default App;
