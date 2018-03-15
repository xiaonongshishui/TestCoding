import React, { Component } from 'react';
import "./static/css/main.less";
import Tab from 'components/Tab';
import Button from 'components/Button';
import TimeSlot from 'components/TimeSlot';
import Frequency from 'components/Frequency';

const TabPanel = Tab.TabPanel;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: -1,
      slotData: "",
      frequencyData: "",
      result: ""
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
      this.setState({ result: slotData });
    } else {
      this.setState({ result: frequencyData });
    }
  }

  render() {
    const { currentIndex, slotData, frequencyData, result } = this.state;
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
          {result ? <div>{result}</div> : null}
        </section>
      </div>
    );
  }
}

export default App;
