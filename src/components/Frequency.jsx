import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputNumber from 'components/InputNumber/InputNumber';
import Select from 'components/Select/Select';

const style = {
  marginLeft: "8px",
  marginRight:"10px"
};
export default class Frequency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNumberValue: "",
      selectValue: "",
      constantWords:"times a"
    }
  }
  componentDidMount() {
    const { handleSaveFrequency } = this.props;
    handleSaveFrequency(this.state);
  }

  componentDidUpdate(prevProps,prevState) { 
    if (prevState.inputNumberValue !== this.state.inputNumberValue ||
      prevState.selectValue !== this.state.selectValue) {
        const { handleSaveFrequency } = this.props;
        handleSaveFrequency(this.state);
      }
  }

  setInputNumberValue = (inputNumberValue) => { 
    this.setState({inputNumberValue});
  }

  setSelectValue = (selectValue) => { 
    this.setState({ selectValue });
}


  render() {
    const { handleSaveFrequency } = this.props;
    const { constantWords } = this.state;
    return <div>
      <InputNumber min={0} setInputNumberValue={this.setInputNumberValue}/>
      <span className="colorBase" style={style}>{constantWords}</span> 
      <Select handleSaveFrequency={handleSaveFrequency} setSelectValue={this.setSelectValue}/>
    </div>
  }
}

Frequency.propTypes  = {
  handleSaveFrequency:PropTypes.func.isRequired
}