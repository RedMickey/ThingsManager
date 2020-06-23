import React, { Component } from 'react';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

export class SpaceTypeahead extends Component {
    onSelectedRoomUpdated(newValue, reason) {
        if (reason === "inp") {
            this.props.setFieldValue("space", newValue);
        } else {
            if (!newValue.name) return;
            this.props.setFieldValue("space", newValue);
        }
    }
    
    render() {
        return (
            <Typeahead
                labelKey="name"
                id="typeahead"
                options={this.props.options}
                placeholder="Выберите место хранения"
                onChange={(selected) => {
                    const space = selected.length > 0 ? selected[0] : {id: undefined, name: undefined};
                    this.onSelectedRoomUpdated(space, "sel");
                }}
                onInputChange={(text, event) => {
                    const space = {id: undefined, name: text};
                    this.onSelectedRoomUpdated(space, "inp");
                }}
                ref={this.props.getReference}
                selected={this.props.selected}
                defaultInputValue={this.props.defaultInputValue}
            />
        )
    }
}

export default SpaceTypeahead
