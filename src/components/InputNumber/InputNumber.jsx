import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputNumberHandler from './InputNumberHandler';

export default class InputNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            upDisabled: false,
            downDisabled: false,
        }
    }

    componentDidMount() { 
        const { setInputNumberValue } = this.props;
        setInputNumberValue(this.state.value);
    }

    componentDidUpdate(prevProps,prevState) { 
        if (prevState.value !== this.state.value) { 
            const { setInputNumberValue } = this.props;
            setInputNumberValue(this.state.value);
        }
    }

    handleOnChangeInputValue = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            return false;
        }
        this.setState({ value:value});
    }

    handleOnBlurInputValue = () => { 
        let { value } = this.state;
        if (String(value).indexOf('.') !== -1) { 
            value = parseInt(value);
            this.setState({value});
        }
    }

    handleOnClickHandler = (type) => {
        const { min, max } = this.props;
        let { value, upDisabled, downDisabled } = this.state;
        if (value === "") {
            value = 0;
            this.setState({ value });
        }

        if (min !== undefined) { 
            if (value > min && downDisabled) { 
                this.setState({ downDisabled: false })
            }
        }
        if (max !== undefined) { 
            if (value < max && upDisabled) { 
                this.setState({ upDisabled: false });
            }
        }
        if (type === "up") {
            if (max !== undefined && value === max) { 
                this.setState({ upDisabled: true });
                return;
            }
            value++;
            if ((max !== undefined && value <= max) || max === undefined) {
                this.setState({ value })
                if (value === max) {
                    this.setState({ upDisabled: true })
                }
            }
        } else {
            if (min !== undefined && value === min) { 
                this.setState({ downDisabled: true });
                return;
            }
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
                    onChange={this.handleOnChangeInputValue}
                    onBlur={this.handleOnBlurInputValue}/>
            </div>
        </div>
    }
}

InputNumber.propTypes  = {
    max: PropTypes.number,
    min: PropTypes.number,
    setInputNumberValue:PropTypes.func.isRequired
}
