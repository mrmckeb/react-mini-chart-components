# React Mini Chart Components
A collection of light-weight mini chart components, built with SVG - with no dependencies.

## Installation
This package is pre-release and is yet to be published to NPM. To install, install from this repository.
```javascript
npm install --save react-mini-chart-components
```

## Setup
*Note: The below is in ES2015, and can be transpiled with [Babel](https://github.com/babel/babel) or [TypeScript](https://github.com/Microsoft/TypeScript).*

You can import the whole library, or just the parts you want.
```javascript
import ReactMiniChartComponents from 'react-mini-chart-components';
const Gauge = ReactMiniChartComponents.Gauge;
```
Or, import just the chart(s) you want.
```javascript
import {Gauge} from 'react-mini-chart-components';
```
### Gauge
The Gauge component has the following configuration. All are optional.

| Property | Type | Description | Default |
| ------------- | ------------- | ------------- | ------------- |
| `type ` | `string` | `'full-gauge'` for a full-circle gauge (default).<br>`'half-gauge'` for a half-circle gauge. | `'full-gauge'` |
| `value` | `number` | Can be any `number` between `0` and `100`. | `50` |
| `color` | `string` | Can be any valid CSS color. For example, `'#ccc'` or `'rgb(150, 0, 150)'`. | `'Orange'` |
| `width` | `string` | Can be any valid CSS width. For example, `'5em'` or `'15px'`. | `'2em'` |

Below is a `'half-gauge'`, with a value of `15`, colored `'LimeGreen'` and with a width of `'5em'`.
```JSX
<Gauge type='half-gauge' value={15} color='LimeGreen' width='5em' />
```

## Example
To see these components in use, you can view [app.jsx](app.jsx).
