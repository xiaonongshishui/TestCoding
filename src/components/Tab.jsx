import React, { Component } from 'react';
import PropTypes from 'prop-types';
class TabPanel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return this.props.children
    }
}

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 1
        }
    }

    componentDidUpdate(prevProps, prevState) { 
        if (prevState.currentIndex !== this.state.currentIndex) { 
            const { onTabChange } = this.props;
            if (onTabChange) { 
                onTabChange(prevState.currentIndex,this.state.currentIndex);
            }
        }
    }

    setActiveIndex = (currentIndex) => {
        this.setState({currentIndex});
    }

    render() {
        const { width } = this.props;
        const { currentIndex } = this.state;
        return <div className="tab" style={width ? { width } : {width:"inherite"}}>
            <ul className="tab-header">
                {
                    React.Children.map(this.props.children, (ele, index) => {
                        return <div className={"tab-header-item " + (index === currentIndex ?"active":"")}
                        onClick = {()=>this.setActiveIndex(index)}>{ele.props.name}</div>
                    })
                }
            </ul>
            <div className="tab-container">
                {
                    React.Children.map(this.props.children, (ele, index) => {
                        return <div className={"tab-container-item " + (index === currentIndex ?"active":"")}>{ele}</div>
                    })
                }
            </div>
        </div>
    }
}
Tab.TabPanel = TabPanel;


Tab.propTypes  = {
    onTabChange: PropTypes.func.isRequired,
    children:PropTypes.array.isRequired
}

export default Tab;