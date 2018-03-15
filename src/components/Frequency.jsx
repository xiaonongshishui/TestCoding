import React, { Component } from 'react';
import InputNumber from 'components/InputNumber/InputNumber';

export default class Frequency extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      <InputNumber max={3} min={0}/>
            <span>times a</span> 
    </div>
  }
}