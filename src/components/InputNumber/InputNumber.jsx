import React, { Component } from 'react';
import InputNumberHandler from './InputNumberHandler';

export default class InputNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            upDisabled: false,
            downDisabled: false
        }
    }

    handleOnChangeInputValue = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            return false;
        }
        this.setState({ value });
    }

    handleOnClickHandler = (type) => {
        const { min, max } = this.props;
        let { value, upDisabled, downDisabled } = this.state;
        if (value === "") {
            value = 0;
        }
        if (min !== undefined && value >= min && downDisabled) {
            this.setState({ downDisabled: false })
        }
        if (max !== undefined && value <= max && upDisabled) {
            this.setState({ upDisabled: false })
        }
        if (type === "up") {
            value++;
            if ((max !== undefined && value <= max) || max === undefined) {
                this.setState({ value })
                if (value === max) {
                    this.setState({ upDisabled: true })
                }
            }
        } else {
            value--;
            if ((min !== undefined && value >= min) || min === undefined) {
                this.setState({ value })
                if (value === min) {
                    this.setState({ downDisabled: true })
                }
            }
        }
    }

    render() {
        const { min, max } = this.props;
        const { value, upDisabled, downDisabled } = this.state;
        return <div className="inputNumber">
            <InputNumberHandler type="down" disabled={downDisabled} handleOnClickHandler={this.handleOnClickHandler} />
            <InputNumberHandler type="up" disabled={upDisabled} handleOnClickHandler={this.handleOnClickHandler} />
            <div className="inputNumber-handler-input">
                <input type="text"
                    value={value}
                    onChange={this.handleOnChangeInputValue} />
            </div>
        </div>
    }
}
