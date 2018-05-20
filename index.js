import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { createStore, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';
// Redux
import rootReducers from './reducers';
// Redux Saga

let store = createStore(rootReducers);

const ToyRobotApp = () => {

    return (
        <Provider store = {store}>
            
            <App/>

        </Provider>
    )
}

AppRegistry.registerComponent('ToyRobot', () => ToyRobotApp);
