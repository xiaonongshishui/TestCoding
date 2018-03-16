import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TimeSlotItem = ({ timeSlot, checked , handleOnClickItem }) => {
    const isChecked = checked.indexOf(timeSlot.id) !== -1;
    const id = timeSlot.id;
    return <div key={timeSlot.id}
        className={"timeSlot-item " + (isChecked ? "active" : "")}
        onClick={()=>handleOnClickItem(id)}>
        <span>{timeSlot.name}</span>
    </div>
}

export default class TimeSlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSlots: [
                {
                    id: 0,
                    name: "Before Breakfast"
                },
                {
                    id: 1,
                    name: "Before Lunch"
                },
                {
                    id: 2,
                    name:"Before Dinner"
                },
                {
                    id: 3,
                    name:"Before Supper"
                },
                {
                    id: 4,
                    name:"After Breakfast"
                },
                {
                    id: 5,
                    name:"After Lunch"
                },
                {
                    id: 6,
                    name:"After Dinner"
                },
                {
                    id: 7,
                    name:"After Supper"
                }
            ],
            checked:[]
        }
    }

    componentDidMount() { 
        this.timeSlotsMap = new Map();
        this.state.timeSlots.forEach(ele => {
            this.timeSlotsMap.set(ele.id, ele.name);
        });
    }

    componentDidUpdate(prevProps, prevState) { 
        if (prevState.checked !== this.state.checked) { 
            const { handleSaveSlotData } = this.props;
            const { checked } = this.state;
            const checkedItems = checked.map((ele,index) => { 
                return this.timeSlotsMap.get(ele);
            }).join(',');
            handleSaveSlotData(checkedItems);
        }
    }

    handleOnClickItem = (id) => { 
        let { checked } = this.state;
        let position = checked.indexOf(id);
        if (position === -1) {
            checked = [...checked, id]
        } else { 
            checked.splice(position,1)
        }
        this.setState({checked:Object.assign([],checked)});
    }

    render() {
        const { timeSlots , checked } = this.state;
        return <div className="timeSlot">
            {
                timeSlots.map((timeSlot,index) => { 
                    return <TimeSlotItem key={index}
                        timeSlot={timeSlot}
                        checked={checked}
                        handleOnClickItem={this.handleOnClickItem}/>
                })
            }
        </div>
    }
}

TimeSlot.propTypes = {
    handleSaveSlotData:PropTypes.func.isRequired
}
