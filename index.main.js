/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Alert,
} from 'react-native';
import CalendarView from "./CalendarView";

export default class MainView extends Component {
    render() {
        return (
            <View style={{marginTop:20}}>
            <CalendarView
                year={2017}
                month={9}
                isEN={true}
                // head={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                isShowHeader={true}
                selectDay={21}
                selectOnListener={(year,date) => {
                    Alert.alert("选择", "选中日期" + year+"-"+date);
                }}
                isScroll={true}
            />

            </View>
        );
    }
}