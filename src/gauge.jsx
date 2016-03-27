import React from 'react';

const CIRCLE = {
    cx: '150',
    cy: '150',
    r: '100'
}

const CIRCUMFERENCE = 2 * Math.PI * CIRCLE.r;

const Gauge = React.createClass({

    componentWillMount: function () {
        const head = document.head;
        if (!document.head.querySelector('style[id=\'radial-gauge\']')) {
            const style = document.createElement('style');
            style.id = 'radial-gauge';
            style.innerHTML = `
            .react-mini-chart.radial-gauge {
                width: 15em;
                height: auto;
            }
            .react-mini-chart.radial-gauge circle {

                fill: transparent;
                stroke-dashoffset: ${CIRCUMFERENCE};
                stroke-dasharray: ${CIRCUMFERENCE};
                transition: stroke-dashoffset .25s ease-in-out;
                transform-origin: center;
            }
            .react-mini-chart.radial-gauge.full-gauge circle {
                transform: rotate(-90deg);
            }`;
            head.appendChild(style);
        }
    },

    getDefaultProps: function () {
        return {
            color: 'Orange',
            type: 'full-gauge',
            value: 33,
            width: '2em'
        }
    },

    getStyles: function () {
        let strokeDashoffset;
        if (this.props.type === 'half-gauge') {
            strokeDashoffset = Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE / 2)
        } else {
            strokeDashoffset =  Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE)
        }

        return {
            stroke: this.props.color,
            strokeWidth: this.props.width,
            strokeDashoffset
        }
    },

    propTypes: {
        color: React.PropTypes.string,
        type: React.PropTypes.string.isRequired,
        value: function(props, propName, componentName) {
            const prop = props[propName];
            if (prop) {
                if (typeof prop !== 'number') {
                    return new Error(`Warning: Failed propType: Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected \`number\` between \`0\` and \`100\`. Check the render method of \`DemoApp\`.`);
                } else if (prop < 0 || prop > 100) {
                    return new Error(`Warning: Failed propType: Invalid value \`${prop}\` for prop \`${propName}\` supplied to \`${componentName}\`, expected \`number\` between \`0\` and \`100\`. Check the render method of \`DemoApp\`.`);
                }
                return null;
            }
            console.log(React.PropTypes);

        },
        width: React.PropTypes.string
    },

    getViewBox: function () {
        return this.props.type === 'half-gauge' ? '0 0 300 150' : '0 0 300 300';
    },

    render: function () {
        return (
            <svg viewBox={this.getViewBox()}
                preserveAspectRatio='xMaxYMax meet'
                className={'react-mini-chart radial-gauge ' + this.props.type}
                version='1.1' xmlns='http://www.w3.org/2000/svg'>
                <circle
                    cx={CIRCLE.cx} cy={CIRCLE.cy} r={CIRCLE.r}
                    style={this.getStyles()}>
                </circle>
            </svg>
        );
    }

});

export default Gauge;
