import React, { Component } from 'react';

export default class inputNumberHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleOnClick = (type) => { 
        const { handleOnClickHandler } = this.props;
        handleOnClickHandler(type);
    }

    render() {
        const { disabled, type } = this.props;
        return <div className={`inputNumber-handler inputNumber-handler-${type}` + (disabled ? " disabled" : "")}
                    onClick={!disabled?()=>this.handleOnClick(type):null}>
            {
                <i className={`fa fa-angle-${type}`}></i>
            }
        </div>
    }
}
