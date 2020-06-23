import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

export class CategoryTypeahead extends Component {
    onSelectedCategoryUpdated(newValue, reason) {
        if (reason === "inp") {
            this.props.setFieldValue("category", newValue);
        } else {
            if (!newValue.name) return;
            this.props.setFieldValue("category", newValue);
        }
    }
    
    render() {
        return (
            <Typeahead
                labelKey="name"
                id="typeahead"
                options={this.props.options}
                placeholder="Выберите категорию (необязательно)"
                onChange={(selected) => {
                    const category = selected.length > 0 ? selected[0] : {id: undefined, name: undefined};
                    this.onSelectedCategoryUpdated(category, "sel");
                }}
                onInputChange={(text, event) => {
                    const category = {id: undefined, name: text};
                    this.onSelectedCategoryUpdated(category, "inp");
                }}
                ref={this.props.getReference}
                selected={this.props.selected}
                defaultInputValue={this.props.defaultInputValue}
            />
        )
    }
}

export default CategoryTypeahead
