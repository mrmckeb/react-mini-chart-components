import React from 'react';
import ReactDOM from 'react-dom';
import { FullGauge, HalfGauge } from '../src/index';

const DemoApp = React.createClass({

    getInitialState: function () {
        return {
            gauge1: 35,
            gauge2: 75
        };
    },

    generateRandomValues: function () {
        this.setState({
            gauge1: Math.floor((Math.random() * 100) + 1),
            gauge2: Math.floor((Math.random() * 100) + 1)
        });
    },

    render: function () {
        return (
            <div onClick={this.generateRandomValues}>
                <div>
                    <FullGauge value={this.state.gauge1} />
                    {this.state.gauge1}
                </div>
                <div>
                    <HalfGauge value={this.state.gauge2} color='LimeGreen' width='5em' />
                    {this.state.gauge2}
                </div>
            </div>
        );
    }
});

ReactDOM.render(<DemoApp />, document.getElementById('demo-app'));
