import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from './SelectDropdown';

export default class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Day(s)",
            isDropdownOpen: false,
            options: [{
                id: 0,
                name: "Day(s)",
                value: 0
            }, {
                id: 1,
                name: "Week(s)",
                value: 1
            }, {
                id: 2,
                name: "Month(s)",
                value: 2
                }],
                classname:"select-hide"
        }
    }
    componentDidMount() { 
        const { setSelectValue } = this.props;
        setSelectValue(this.state.value);
    }

    componentWillUpdate(prevProps, prevState) { 
        if (prevState.isDropdownOpen !== this.state.isDropdownOpen) { 
            let { classname } = this.state;
            if (this.state.isDropdownOpen) { 
                classname = "select-hide";
                setTimeout(() => { 
                    this.setState({classname})
                },300)
            } else{ 
                classname = "select-open";
                this.setState({classname})
            }
        }
    }

    componentDidUpdate(prevProps, prevState) { 
        if (prevState.value !== this.state.value) { 
            const { setSelectValue } = this.props;
            setSelectValue(this.state.value);
        }
    }

    handleSwithDropdown = () => { 
        let { isDropdownOpen } = this.state;
        this.setState({ isDropdownOpen: !isDropdownOpen });
        
    }

    handleSetValue = (value) => { 
        this.setState({value})
    }

    handleCloseDropdown = ()=> { 
        this.setState({isDropdownOpen:false})
    }

    render() {
        const { value , options ,isDropdownOpen ,classname} = this.state;
        return <div className={"select " + classname}>
            <div className="select-render" onClick={this.handleSwithDropdown}>{value}</div>
            <span className="select-arrow" onClick={this.handleSwithDropdown}>
                <i className="fa fa-sort-desc"></i>
            </span>
            <SelectDropdown options={options}   
                isOpen={isDropdownOpen}
                handleSetValue={this.handleSetValue}
                handleCloseDropdown={this.handleCloseDropdown}/>
        </div>
            }
}   

Select.propTypes = {
    handleSaveFrequency: PropTypes.func.isRequired,
    setSelectValue:PropTypes.func.isRequired
}