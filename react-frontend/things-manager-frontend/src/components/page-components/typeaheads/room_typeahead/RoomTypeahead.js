import React, { Component } from 'react';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

export class RoomTypeahead extends Component {
    onSelectedRoomUpdated(newValue, reason) {
        if (reason === "inp") {
            this.props.setFieldValue("room", newValue);
        } else {
            if (!newValue.name) return;
            this.props.setFieldValue("room", newValue);
        }
    }
    
    render() {
        return (
            <Typeahead
                labelKey="name"
                id="typeahead"
                options={this.props.options}
                placeholder="Выберите помещение"
                onChange={(selected) => {
                    const room = selected.length > 0 ? selected[0] : {id: undefined, name: undefined};
                    this.onSelectedRoomUpdated(room, "sel");
                }}
                onInputChange={(text, event) => {
                    const room = {id: undefined, name: text};
                    this.onSelectedRoomUpdated(room, "inp");
                }}
                ref={this.props.getReference}
                selected={this.props.selected}
                defaultInputValue={this.props.defaultInputValue}
            />
        )
    }
}

export default RoomTypeahead
