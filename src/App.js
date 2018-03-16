import React, { Component } from 'react';
import "./static/css/main.less";
import Tab from 'components/Tab';
import Button from 'components/Button';
import TimeSlot from 'components/TimeSlot';
import Frequency from 'components/Frequency';
import prompt from 'utils/prompt';
const TabPanel = Tab.TabPanel;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: -1,
      slotData: null,
      frequencyData: null,
      slotResult: "",
      frequencyResult:""
    }
  }

  onTabChange = (prevIndex, currentIndex) => {
    console.log(prevIndex, currentIndex);
    this.setState({ currentIndex });
  }

  handleSaveSlotData = (data) => {
    this.setState({ slotData: data });
  }

  handleSaveFrequency = (data) => {
    this.setState({ frequencyData: data });
  }

  handleSubmit = () => {
    const { currentIndex, slotData, frequencyData } = this.state;
    if (currentIndex === 0) {
      this.setState({ slotResult: slotData });
    } else {
      const { inputNumberValue, selectValue, constantWords } = frequencyData;
      if (inputNumberValue === "" || inputNumberValue === undefined || inputNumberValue === null) { 
        prompt({ message: "Illegal Frequency!" });
        return;
      }
      this.setState({frequencyResult:`${inputNumberValue}  ${constantWords}  ${selectValue}`})
    }
  }

  render() {
    const { currentIndex, slotResult, frequencyResult } = this.state;
    return (
      <div className="App">
        <h1 className="App-caption">Select Patient Self-Monitoring Schedule*</h1>
        <section className="App-option">
          <Tab onTabChange={this.onTabChange}>
            <TabPanel name="By Time Slot">
              <TimeSlot handleSaveSlotData={this.handleSaveSlotData} />
            </TabPanel>
            <TabPanel name="By Frequency">
              <Frequency handleSaveFrequency={this.handleSaveFrequency} />
            </TabPanel>
          </Tab>
          <Button onClick={this.handleSubmit}>Save</Button>
        </section>
        <section className="App-data">
          {currentIndex === 0 ? (slotResult ? <div>{slotResult}</div> : null) : (frequencyResult ? <div>{frequencyResult}</div>:null)}
        </section>
      </div>
    );
  }
}

export default App;
