import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import toDoApp from './reducers/tutorialReducer';

import App from './App';

let store = createStore(toDoApp);

class Setup extends Component {

  constructor (props) {

    super (props);
  }

  render () {

    return (

      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Setup;