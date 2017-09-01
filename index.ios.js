/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import MainView from './index.main'
export default class Rn_CalendarView extends Component {
  render() {
    return (
      <MainView/>
    );
  }
}

AppRegistry.registerComponent('Rn_CalendarView', () => Rn_CalendarView);
