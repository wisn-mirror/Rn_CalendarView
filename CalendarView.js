import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';

import Dimensions from 'Dimensions';

export const SCREEN_WIDTH = Dimensions.get('window').width;
const weekCN = ['日', '一', '二', '三', '四', '五', '六'];
const weekEN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export default class CalendarView extends Component {
    static propTypes = {
        //日历背景的样式
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
        currentDayStyle: View.propTypes.style,
        //指定年 不传值默认本年
        year: PropTypes.number,
        //指定月 不传值默认本月
        month: PropTypes.number,
        //监听选择事件
        selectOnListener: PropTypes.func,
        //自定义表头
        head: PropTypes.array,
        //是否英文 表头
        isEN: PropTypes.bool,
        //是否显示头部
        isShowHeader: PropTypes.bool,
        //指定默认选中
        selectDay: PropTypes.number,
        //是否左右滑动
        isScroll: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year ? this.props.year : this.getNowYear(),
            month: (this.props.month && this.props.month <= 12 && this.props.month > 0) ? this.props.month : this.getNowMonth(),
            isShow: true,
            isShowStr: '收起',
            select: this.props.selectDay ? this.props.selectDay : -1,
            head: this.props.head ? this.props.head : (this.props.isEN ? weekEN : weekCN),
            isShowHeader: this.props.isShowHeader ? this.props.isShowHeader : false,
            currentScrollIndex: 1,
            isScroll: this.props.isScroll ? this.props.isScroll : true,
        };
    }

    componentDidMount() {
        if (this.state.isScroll) {
            this.refs.scrollView.scrollResponderScrollTo({x: (1 * SCREEN_WIDTH), y: 0, animated: false});
        }
    }

    componentDidUpdate() {
        if (this.state.isScroll) {
            this.refs.scrollView.scrollResponderScrollTo({x: (1 * SCREEN_WIDTH), y: 0, animated: false});
        }
    }

    componentWillReceiveProps(nextProps) {
        //动态更新
        if (this.state.year !== nextProps.year || this.state.month !== nextProps.month) {
            this.setState({
                year: nextProps.year ? nextProps.year : this.getNowYear(),
                month: (nextProps.month && nextProps.month <= 12 && nextProps.month > 0) ? nextProps.month : this.getNowMonth(),

            })
        }
        //更新头部显示中／英或自定义头部
        if (this.state.head !== nextProps.head || this.state.isEN !== nextProps.isEN) {
            this.setState({
                head: nextProps.head ? nextProps.head : (nextProps.isEN ? weekEN : weekCN),
            })
        }
        //是否显示顶部header control
        if (this.state.isShowHeader !== nextProps.isShowHeader) {
            this.setState({
                isShowHeader: nextProps.isShowHeader ? nextProps.isShowHeader : false,
            })
        }
        //更新选中天
        if (this.state.select !== nextProps.selectDay) {
            this.setState({
                select: nextProps.selectDay ? nextProps.selectDay : false,
            })
        } //更新选中天
        if (this.state.isScroll !== nextProps.isScroll) {
            this.setState({
                isScroll: nextProps.isScroll ? nextProps.isScroll : false,
            })
        }
    }

    //底部是否隐藏日历
    _PressIsShow() {
        this.setState({
            isShow: !this.state.isShow,
            isShowStr: this.state.isShow ? '展开' : '收起',
        });
    }

    render() {
        let content = this.state.isScroll ? <ScrollView
            ref='scrollView'
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            scrollEnabled={true}
            removeClippedSubviews={true}
            //当一帧滚动结束
            onMomentumScrollEnd={(e) => {
                var offSetX = e.nativeEvent.contentOffset.x;
                var currentPageIndex = Math.floor(offSetX / SCREEN_WIDTH);
                if (this.state.currentScrollIndex !== currentPageIndex && currentPageIndex !== 1) {
                    var month = currentPageIndex === 2 ? this.state.month + 1 : this.state.month - 1;
                    var year = this.state.year;
                    if (month > 12) {
                        year = this.state.year + 1;
                        month = 1;
                    } else if (month < 1) {
                        year = this.state.year - 1;
                        month = 12;
                    }
                    this.setState({
                        year: parseInt(year),
                        month: parseInt(month),
                    });
                    this.refs.scrollView.scrollResponderScrollTo({x: (1 * SCREEN_WIDTH), y: 0, animated: false});
                }
            }}
        >
            {this.getScrollDataView()}
        </ScrollView> : this.getDataListView(this.state.year, this.state.month);
        return (
            <View
                style={[styles.container, this.props.calendarStyle]}>
                {this.getHeader()}
                <View style={[styles.outLineViewStyle, this.props.titleHeaderRowStyle]}>
                    {this.getTitleView()}
                </View>
                {content}
                <TouchableOpacity onPress={() => this._PressIsShow()}>
                    <Text style={styles.bottomStyle}>{this.state.isShowStr}</Text>
                </TouchableOpacity>
            </View>
        );
    }


    getHeader() {
        if (this.state.isShowHeader) {
            return (<View style={[styles.outLineViewStyle, {backgroundColor: '#efefef'}]}>
                <TouchableOpacity onPress={() => this.changDate(false)}><Text>pre Month</Text></TouchableOpacity>
                <Text>{this.state.year}-{this.state.month}</Text>
                <TouchableOpacity onPress={() => this.changDate(true)}><Text>next Month</Text></TouchableOpacity>
            </View>);
        } else {
            return null;
        }
    }

    changDate(isAdd) {
        var month = isAdd ? this.state.month + 1 : this.state.month - 1;
        var year = this.state.year;
        if (month > 12) {
            year = this.state.year + 1;
            month = 1;
        } else if (month < 1) {
            year = this.state.year - 1;
            month = 12;
        }
        this.setState({
            year: parseInt(year),
            month: parseInt(month),
        });
    }

    getScrollDataView() {
        var views = [];
        views.push(<View key={1}>{this.getDataListView(this.state.year, this.state.month - 1)}</View>)
        views.push(<View key={2}>{this.getDataListView(this.state.year, this.state.month)}</View>)
        views.push(<View key={3}>{this.getDataListView(this.state.year, this.state.month + 1)}</View>)
        return views;
    }


    getDataListView(year, month) {
        var MonthDaySum = this.mGetDate(year, month);
        var weekStart = this.mGetDataWeek(year, month);
        var today = this.mGetTodyDate(year, month);
        var numItemByWeek = (MonthDaySum + weekStart) / 7;//4
        var OutViews = [];
        var ItemIndex = 0;
        var date = 1;
        var RowSum = (this.state.isShow) ? numItemByWeek : 1;
        console.log("tag date:" + date + " weekStart" + weekStart + " MonthDaySum" + MonthDaySum + " numItemByWeek" + numItemByWeek + " select " + this.state.select);
        for (var i = 0; i < RowSum; i++) {
            var RowViews = [];
            for (var j = 0; j < 7; j++) {
                ItemIndex++;
                if (ItemIndex <= weekStart) {
                    RowViews.push(<Text key={ItemIndex}
                                        style={styles.nullStyle}> </Text>)
                } else {
                    if ((MonthDaySum + weekStart) >= ItemIndex) {
                        var selectStyle = {};
                        var weekendStyle = {};
                        if (date === this.state.select) {
                            //选中的样式
                            selectStyle = this.props.selectDayStyle ? this.props.selectDayStyle : {
                                backgroundColor: "#ff9821",
                                color: 'white'
                            };
                        } else {
                            selectStyle = null;
                        }
                        if (j === 0 || j === 6) {
                            //周六周日的样式
                            weekendStyle = {color: "#ff6e32", backgroundColor: "#f4f4f4"};
                        } else {
                            weekendStyle = null;
                        }
                        if (ItemIndex === (today + weekStart)) {
                            var currentDayStyle = this.props.currentDayStyle? this.props.currentDayStyle: {backgroundColor: "#72ff17"};
                            //今天
                            RowViews.push(
                                <TouchableOpacity key={ItemIndex}
                                                  onPress={this._pressDay.bind(this, this.state.year, date)}>
                                    <Text
                                        style={[styles.monthDayStyle, weekendStyle,currentDayStyle, selectStyle]}
                                    >{date}</Text>
                                </TouchableOpacity>)
                        } else {
                            //除了今天的其他的所有天
                            RowViews.push(
                                <TouchableOpacity key={ItemIndex}
                                                  onPress={this._pressDay.bind(this, this.state.year, date)}>
                                    <Text
                                        style={[styles.monthDayStyle, this.props.dayStyle, weekendStyle, selectStyle]}>{date}</Text>
                                </TouchableOpacity>)

                        }
                    } else {
                        //空白留空
                        RowViews.push(<Text key={ItemIndex}
                                            style={styles.nullStyle}> </Text>)
                    }
                    date++;
                }
            }
            OutViews.push(<View key={i} style={[styles.outLineViewStyle, this.props.dayRowStyle]}>
                {RowViews}
            </View>)
        }
        return OutViews;
    }

    _pressDay(year, date) {
        this.setState({
            select: date,
        })
        if (this.props.selectOnListener) {
            this.props.selectOnListener(year, date);
        }
    }

    getTitleView() {
        var views = [];
        var arr = this.state.head;
        for (var i = 0; i < arr.length; i++) {
            views.push(<Text key={i}
                             style={[styles.titleStyle, this.props.titleHeaderStyle]}>{arr[i]}</Text>)
        }
        return views;
    }

    /**
     *  当月多少天
     * @returns {number}
     */
    mGetDate(year, month) {
        if (year !== null && month !== null) {
            //指定日期
            var d = new Date(year, month, 0);
            return d.getDate();
        } else {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var d = new Date(year, month, 0);
            return d.getDate();
        }
    }

    /**
     * 获取当前日
     * @returns {number}
     */
    mGetTodyDate(year, month) {
        var d = new Date();
        if (d.getFullYear() === year && (d.getMonth() + 1) === month) {
            return d.getDate();
        } else {
            return -1;
        }
    }

    /**
     * 当月第一天星期几
     * @returns {number}
     */
    mGetDataWeek(year, month) {
        if (year !== null && month !== null) {
            //指定日期
            var d = new Date(year, month, 0);
            d.setDate(1);
            return d.getDay();
        } else {
            var d = new Date();
            d.setDate(1);
            return d.getDay();
        }
    }

    /**
     * 获取当前时间year
     * @returns {number}
     */
    getNowYear() {
        var d = new Date();
        return d.getFullYear();
    }

    /**
     * 获取当前时间month
     * @returns {number}
     */
    getNowMonth() {
        var d = new Date();
        return d.getMonth();
    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    monthDayStyle: {
        width: 24,
        height: 24,
        textAlign: 'center',
        fontSize: 12,
        paddingTop: 4,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#ffc226",
        overflow: 'hidden',
    },
    nullStyle: {
        width: 24,
        height: 24,
        textAlign: 'center',
        fontSize: 12,
    },
    outLineViewStyle: {
        width: SCREEN_WIDTH,
        height: 40,
        marginTop: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
    },
    bottomStyle: {
        height: 40,
        textAlign: 'center',
        width: SCREEN_WIDTH,
        color: '#ffab3b'

    },
    titleStyle: {
        width: 30,
        textAlign: 'center',
        height: 30,
        fontSize: 14,
        marginTop: 4,
        color: '#ff3e08',
    }
});

