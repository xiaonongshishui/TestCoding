import React, { Component } from 'react';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { onClick } = this.props;
        return <div className="btn" onClick={onClick}><span>{this.props.children}</span></div>
    }
}   