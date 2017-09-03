/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    ScrollView,
} from 'react-native';



// npm i react-timer-mixin --save 更新定时器的类库
//注册定时器的类库
// var TimerMixin=require('react-timer-mixin');

import Dimensions from 'Dimensions';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export  default class C extends Component{
    render(){
        return (
            <ScrollView
            ref='scrollView'
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            scrollEnabled={true}
            removeClippedSubviews={true}
            onMomentumScrollEnd={()=>{
                console.log("dongle")

                this.refs.scrollView.scrollResponderScrollTo({x: (1*SCREEN_WIDTH), y: 0, animated: false});
            }}
            >
                {this.renderChildView()}
            </ScrollView>
        );
    }
    renderChildView(){
        var allChild=[];
        var color=['green','green','green'];
        for(var i=0;i<color.length;i++){
            allChild.push(
              <View key={i} style={{backgroundColor:color[i], width:SCREEN_WIDTH,height:200}}>
                  <Text>{i}</Text>
              </View>
            );
        }
        return allChild;
    }
}