import React from 'react';

const CIRCLE = {
    cx: '150',
    cy: '150',
    r: '100'
}

const CIRCUMFERENCE = 2 * Math.PI * CIRCLE.r;

const CLASSNAME = 'react-mini-chart-gauge';

class BaseGauge extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            type: 'FullGauge'
        };
    }

    appendCss (head) {
        const style = document.createElement('style');
        style.id = CLASSNAME;
        style.innerHTML = `
        .react-mini-chart.radial-gauge {
            width: 15em;
            height: auto;
        }
        .react-mini-chart.radial-gauge circle {
            fill: transparent;
            stroke-dashoffset: ${CIRCUMFERENCE}px;
            stroke-dasharray: ${CIRCUMFERENCE};
            transition: stroke-dashoffset .25s ease-in-out;
        }
        .react-mini-chart.radial-gauge.full-gauge {
            transform: rotate(-90deg);
            transform-origin: center;
        }`;
        head.appendChild(style);
    }

    componentWillMount () {
        const head = document.head;
        if (!document.head.querySelector(`style[id='${CLASSNAME}']`)) {
            appendCss(head);
        }
    }

    getStyles () {
        let strokeDashoffset;
        if (this.state.type === 'HalfGauge') {
            // Note: Units ('px') are required for animation in Microsoft Edge.
            strokeDashoffset = Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE / 2) + 'px';
        } else {
            strokeDashoffset =  Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE) + 'px';
        }

        return {
            stroke: this.props.color,
            strokeWidth: this.props.width,
            strokeDashoffset
        }
    }

    getViewBox () {
        return this.state.type === 'HalfGauge' ? '0 0 300 150' : '0 0 300 300';
    }

    render () {
        return (
            <svg viewBox={this.getViewBox()}
                preserveAspectRatio='xMaxYMax meet'
                className={'react-mini-chart radial-gauge ' + this.state.type}
                version='1.1' xmlns='http://www.w3.org/2000/svg'>
                <circle
                    cx={CIRCLE.cx} cy={CIRCLE.cy} r={CIRCLE.r}
                    style={this.getStyles()}>
                </circle>
            </svg>
        );
    }

};

Gauge.propTypes = {
    color: React.PropTypes.string,
    type: React.PropTypes.string,
    value (props, propName, componentName) {
        const prop = props[propName];
        if (prop) {
            if (typeof prop !== 'number') {
                return new Error(`Warning: Failed propType: Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected \`number\` between \`0\` and \`100\`. Check the render method of \`DemoApp\`.`);
            } else if (prop < 0 || prop > 100) {
                return new Error(`Warning: Failed propType: Invalid value \`${prop}\` for prop \`${propName}\` supplied to \`${componentName}\`, expected \`number\` between \`0\` and \`100\`. Check the render method of \`DemoApp\`.`);
            }
            return null;
        }
    },
    width: React.PropTypes.string
};

Gauge.defaultProps = {
    color: 'Orange',
    value: 50,
    width: '2em'
};

class FullGauge extends BaseGauge {};

class HalfGauge extends BaseGauge {

    constructor (props) {
        super(props);
        this.state = {
            type: 'HalfGauge'
        };
    }

};

export {FullGauge, HalfGauge};
