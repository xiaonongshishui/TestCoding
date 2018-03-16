import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Options extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return <li className="select-dorpdown-item" onClick={this.props.onClick}>
            {this.props.children}
        </li>
    }
};


export default class SelectDropdown extends Component {
    constructor(props) {
        super(props);
    }

    renderOptions = (opts) => {
        const { isOpen } = this.props;
        return <ul
            className={`select-dropdown ${isOpen ? "select-dropdown-active" : "select-dropdown-leave"}`}>
            {opts.map((ele, i) => {
                return <Options key={`options-${i}`} onClick={()=>this.handleOnClickItem(ele)}>
                    {ele.name}
                </Options>
            })}
        </ul>
    }

    handleOnClickItem = (ele) => { 
        const { handleSetValue , handleCloseDropdown } = this.props;
        handleSetValue(ele.name);
        handleCloseDropdown();
    }


    render() {
        const { options ,classname} = this.props;
        return <div>

            {this.renderOptions(options)}

        </div>
    }
}   

SelectDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleSetValue: PropTypes.func.isRequired,
    handleCloseDropdown:PropTypes.func.isRequired
}