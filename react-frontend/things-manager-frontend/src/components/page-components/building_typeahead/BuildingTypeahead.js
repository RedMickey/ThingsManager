import React, { Component } from 'react'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

export class BuildingTypeahead extends Component {
    
    onSelectedBuildingUpdated(newValue, reason) {
        if (reason === "inp") {
            this.props.setFieldValue("building", newValue);
        } else {
            if (!newValue.name) return;
            this.props.setFieldValue("building", newValue);
        }
    }
    
    render() {
        return (
            <Typeahead
                labelKey="name"
                id="typeahead"
                options={this.props.options}
                placeholder="Выберите строение"
                onChange={(selected) => {
                    const building = selected.length > 0 ? selected[0] : {id: undefined, name: undefined};
                    this.onSelectedBuildingUpdated(building, "sel");
                }}
                onInputChange={(text, event) => {
                    const building = {id: undefined, name: text};
                    this.onSelectedBuildingUpdated(building, "inp");
                }}
                ref={this.props.getReference}
                selected={this.props.selected}
                defaultInputValue={this.props.defaultInputValue}
            />
        )
    }
}

export default BuildingTypeahead
