import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import toDoApp from './reducers/tutorialReducer';

import App from './App';

let store = createStore(toDoApp);

/*
* Responsible for configuring middleware
* to be used by the entire app
*
* TODO - create different component to handle the store
* creation process
*/
class Setup extends Component {

  constructor (props) {

    super (props);
  }

  render () {

    return (

      //  Redux provider for our app
      <Provider store={store}>
        {/* Our app root component */}
        <App />
      </Provider>
    );
  }
}

export default Setup;