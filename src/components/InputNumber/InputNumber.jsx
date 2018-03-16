import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputNumberHandler from './InputNumberHandler';
import prompt from 'utils/prompt';

export default class InputNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            validValue:1,
            upDisabled: false,
            downDisabled: false
        }   
    }

    componentDidMount() { 
        const { setInputNumberValue } = this.props;
        setInputNumberValue(this.state.value);
    }

    componentWillUpdate(prevProps,prevState) { 
        
    }

    componentDidUpdate(prevProps,prevState) { 
        if (prevState.validValue !== this.state.validValue) {
            let validValue = this.state.validValue;
            const { min, max } = this.props;
            const { setInputNumberValue} = this.props;
            setInputNumberValue(validValue);
            if (max !== undefined) { 
                if (validValue >= max) {
                    this.setState({ upDisabled: true });
                } else { 
                    this.setState({ upDisabled: false });
                }
            }
            if (min !== undefined) { 
                if (validValue <= min) {
                    this.setState({ downDisabled: true });
                } else { 
                    this.setState({ downDisabled: false });
                }
            }
            
        }
    }

    handleOnChangeInputValue = (e) => {
        const value = e.target.value;
        if (value !== "-" && isNaN(value)) { 
            return false;
        }
        this.setState({ value:value});
    }

    handleOnBlurInputValue = () => { 
        let { max, min } = this.props;
        let { value,validValue } = this.state;
        if (isNaN(value)) {
            value = validValue;
        }
        if (String(value).indexOf('.') !== -1) { 
            value = parseInt(value);
        }
        let _value = value;
        if (max !== undefined) { 
            if (_value > max) {
                prompt({message:"Exceed maximum: " + max});
                value = validValue;
            }
        }
        if (min !== undefined) { 
            if (_value < min) {
                prompt({message:"Less than minimum: " + min})
                value = validValue;
            }
        }
        this.setState({value,validValue:value});
        
    }

    handleOnClickHandler = (type) => {
        let { value } = this.state;
        if (value === "") {
            value = 0;
            this.setState({ value,validValue:value });
        }
        if (type === "up") {
            value++;
        } else {
            value--;
        }
        this.setState({ value,validValue:value });
    }

    render() {
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
