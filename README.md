# Rn_CalendarView
[![download][download-image]][download-url]

[npm-image]:https://github.com/wisn-mirror/Rn_CalendarView
[npm-url]:https://github.com/wisn-mirror/Rn_CalendarView
[download-image]: https://github.com/wisn-mirror/Rn_CalendarView
[download-url]: https://github.com/wisn-mirror/Rn_CalendarView

An  calendar component for react-native.

## Usage

```js
import CalendarView from "./CalendarView";

module.exports = React.createClass({
  render () {
    return (<CalendarView
                year={2017}
                month={7}
                isEN={true}
                //head={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                selectOnListener={(date) => {
                    Alert.alert("??", "????" + date);
                }}
               />);
  }
});
```

## Props

Property  | Description | Type | Default | note
----------|-------------|------|---------|------
year | year. | string | current year |
month | month. | string | current month |
selectOnListener | selected CallBack. | fun | null |
isEN | isEnglish header | boolean | ['?', '?', '?', '?', '?', '?', '?']; |
head | head of the calendar | array | `['S', 'M', 'T', 'W', 'T', 'F', 'S']` |


### ScreenShot

<img width="30%" src="./img/screenshot_en.jpg" />

### ScreenShot

<img width="30%" src="./img/screenshot.jpg" />

## License

The MIT License
