'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CIRCLE = {
    cx: '150',
    cy: '150',
    r: '100'
};

var CIRCUMFERENCE = 2 * Math.PI * CIRCLE.r;

var Gauge = _react2.default.createClass({
    displayName: 'Gauge',


    componentWillMount: function componentWillMount() {
        var head = document.head;
        if (!document.head.querySelector('style[id=\'radial-gauge\']')) {
            var style = document.createElement('style');
            style.id = 'radial-gauge';
            style.innerHTML = '\n            .react-mini-chart.radial-gauge {\n                width: 15em;\n                height: auto;\n            }\n            .react-mini-chart.radial-gauge circle {\n\n                fill: transparent;\n                stroke-dashoffset: ' + CIRCUMFERENCE + ';\n                stroke-dasharray: ' + CIRCUMFERENCE + ';\n                transition: stroke-dashoffset .25s ease-in-out;\n                transform-origin: center;\n            }\n            .react-mini-chart.radial-gauge.full-gauge circle {\n                transform: rotate(-90deg);\n            }';
            head.appendChild(style);
        }
    },

    getDefaultProps: function getDefaultProps() {
        return {
            color: 'Orange',
            type: 'full-gauge',
            value: 33,
            width: '2em'
        };
    },

    getStyles: function getStyles() {
        var strokeDashoffset = void 0;
        if (this.props.type === 'half-gauge') {
            strokeDashoffset = Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE / 2);
        } else {
            strokeDashoffset = Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE);
        }

        return {
            stroke: this.props.color,
            strokeWidth: this.props.width,
            strokeDashoffset: strokeDashoffset
        };
    },

    propTypes: {
        color: _react2.default.PropTypes.string,
        type: _react2.default.PropTypes.string.isRequired,
        value: function value(props, propName, componentName) {
            var prop = props[propName];
            if (prop) {
                if (typeof prop !== 'number') {
                    return new Error('Warning: Failed propType: Invalid prop `' + propName + '` of type `' + (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) + '` supplied to `' + componentName + '`, expected `number` between `0` and `100`. Check the render method of `DemoApp`.');
                } else if (prop < 0 || prop > 100) {
                    return new Error('Warning: Failed propType: Invalid value `' + prop + '` for prop `' + propName + '` supplied to `' + componentName + '`, expected `number` between `0` and `100`. Check the render method of `DemoApp`.');
                }
                return null;
            }
            console.log(_react2.default.PropTypes);
        },
        width: _react2.default.PropTypes.string
    },

    getViewBox: function getViewBox() {
        return this.props.type === 'half-gauge' ? '0 0 300 150' : '0 0 300 300';
    },

    render: function render() {
        return _react2.default.createElement(
            'svg',
            { viewBox: this.getViewBox(),
                preserveAspectRatio: 'xMaxYMax meet',
                className: 'react-mini-chart radial-gauge ' + this.props.type,
                version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('circle', {
                cx: CIRCLE.cx, cy: CIRCLE.cy, r: CIRCLE.r,
                style: this.getStyles() })
        );
    }

});

exports.default = Gauge;