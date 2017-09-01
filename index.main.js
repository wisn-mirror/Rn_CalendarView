/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
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
                isShowHeader={false}
                selectDay={21}
                selectOnListener={(year,date) => {
                    Alert.alert("选择", "选中日期" + year+"-"+date);
                }}

            />
            </View>
        );
    }
}
/*
calendarStyle: View.propTypes.style,
        //星期的一行的样式
        titleHeaderRowStyle: View.propTypes.style,
        //星期字体的样式
        titleHeaderStyle: View.propTypes.style,
        //正常天数的样式
        dayStyle: View.propTypes.style,
        //正常天数的一行的样式
        dayRowStyle: View.propTypes.style,
        //选中的样式
        selectDayStyle: View.propTypes.style,
        //当天选中的样式


* */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});