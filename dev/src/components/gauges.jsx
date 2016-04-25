import React from 'react';

const CIRCLE = {
    cx: '150',
    cy: '150',
    r: '100'
};

const CIRCUMFERENCE = 2 * Math.PI * CIRCLE.r;

const STYLEID = 'react-mini-chart-gauge';

// TODO
// https://css-tricks.com/svg-line-animation-works/
// - Great discussion on animation (still need to use dasharray).
// - example on how to get path lengths too.
// http://codepen.io/mrmckeb/pen/dMzBov


class BaseGauge extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            type: 'FullGauge'
        };
    }

    appendCss (head) {
        const style = document.createElement('style');
        style.id = STYLEID;
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
        if (!document.head.querySelector(`style[id='${STYLEID}']`)) {
            this.appendCss(head);
        }
    }

    getStyles () {
        let strokeDashoffset;
        if (this.state.type === 'HalfGauge') {
            // Note: Units ('px') are required for animation in Microsoft Edge.
            strokeDashoffset = Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE / 2) + 'px';
        } else {
            strokeDashoffset = Math.ceil((100 - this.props.value) / 100 * CIRCUMFERENCE) + 'px';
        }

        return {
            stroke: this.props.color,
            strokeWidth: this.props.width,
            strokeDashoffset
        };
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

}

BaseGauge.propTypes = {
    color: React.PropTypes.string,
    type: React.PropTypes.string,
    value (props, propName, componentName) {
        const prop = props[propName];
        const max = 100;
        const min = 0;
        if (prop) {
            if (typeof prop !== 'number') {
                return new Error(`Warning: Failed propType: Invalid prop \`${propName}\` of type ` +
                `\`${typeof prop}\` supplied to \`${componentName}\`, expected \`number\` ` +
                `between \`${min}\` and \`${max}\`.`);
            } else if (prop < 0 || prop > 100) {
                return new Error(`Warning: Failed propType: Invalid value \`${prop}\` for prop ` +
                `\`${propName}\` supplied to \`${componentName}\`, expected \`number\` between ` +
                `\`${min}\` and \`${max}\`.`);
            }
        }
        return null;
    },
    width: React.PropTypes.string
};

BaseGauge.defaultProps = {
    color: 'Orange',
    value: 50,
    width: '2em'
};

class FullGauge extends BaseGauge {}

class HalfGauge extends BaseGauge {

    constructor (props) {
        super(props);
        this.state = {
            type: 'HalfGauge'
        };
    }

}

export { FullGauge, HalfGauge };
