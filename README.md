# React Mini Chart Components
A collection of lightweight mini chart components, built with SVG - with no dependencies.

Please use GitHub issues for all bugs, suggestions, and other feedback.


## Installation
Note: This library is pre-release, and component names and options may change between releases. A final release is expected in the coming weeks (during April 2016).

First install Node.js, which ships with npm. Then run the following from terminal / PowerShell:
```javascript
npm install --save react-mini-chart-components
```


## Setup
*The below is in ES2015, and can be transpiled with [Babel](https://github.com/babel/babel) or [TypeScript](https://github.com/Microsoft/TypeScript).*

You can import the whole library, or just the parts you want.
```javascript
import ReactMiniChartComponents from 'react-mini-chart-components';

const FullGauge = ReactMiniChartComponents.FullGauge;
const HalfGauge = ReactMiniChartComponents.HalfGauge;

// Or using ES2015 destructuring
const {FullGauge, HalfGauge} = ReactMiniChartComponents;
```
Or, import just the chart(s) you want.
```javascript
import {FullGauge, HalfGauge} from 'react-mini-chart-components';
```


## Components
This library will continue to grow over time, if you have suggestions for additional types of charts, please [create an issue](https://github.com/mrmckeb/react-mini-chart-components/issues/new) on GitHub.

### Gauges

#### Types
There are two gauge types, `FullGauge` (a complete circle) and `HalfGauge` (a semi-circle).
```JSX
class MyGaugeTest extends React.Component {
    render () {
        return (
            <div>
                <HalfGauge value={this.props.value1} />
                <FullGauge value={this.props.value2} />
            </div>
        );
    }
}

ReactDOM.render(<MyGaugeTest value1="74" value2="26" />, mountNode);
```


#### Options
The `FullGauge` and `HalfGauge` components share the following options. None are required.

| Property | Type | Description | Default |
| ------------- | ------------- | ------------- | ------------- |
| `value` | `number` | Can be any `number` between `0` and `100`. | `50` |
| `color` | `string` | Can be any valid CSS color. For example, `'#ccc'` or `'rgb(150, 0, 150)'`. | `'Orange'` |
| `width` | `string` | Can be any valid CSS width. For example, `'5em'` or `'15px'`. | `'2em'` |


Below is a `HalfGauge`, with a value of `15`, colored `'LimeGreen'` and with a width of `'5em'`.
```JSX
<HalfGauge value={15} color='LimeGreen' width='5em' />
```


## Examples
See [app.jsx](app.jsx) for usage examples (replace `'./src/index'` with `'react-mini-chart-components'`).

For a live test page, clone this repository, run `npm install` and then `npm run dev` to start a development server. Then visit the url displayed in your console (at the top of the webpack logs).


## Support
These components are tested on Chrome, Firefox, and Microsoft Edge.

If you find any bugs, please report them [as new issues](https://github.com/mrmckeb/react-mini-chart-components/issues) on GitHub.
