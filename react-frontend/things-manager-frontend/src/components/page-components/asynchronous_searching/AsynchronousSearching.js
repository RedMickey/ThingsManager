import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import ListItem from './list_item/ListItem';

import { 
    Form, 
    InputGroup,
    FormControl,
} from 'react-bootstrap';

export class AsynchronousSearching extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allowNew: false,
            isLoading: false,
            options: [],
          };
    }

    _renderCheckboxes() {
        const checkboxes = [
            {label: 'Multi-Select', name: 'multiple'},
            {label: 'Allow custom selections', name: 'allowNew'},
        ];
    
        return checkboxes.map(({label, name}) => (
            <Form.Control
                checked={this.state[name]}
                key={name}
                name={name}
                onChange={this._handleChange}
                type="checkbox">
                {label}
            </Form.Control>
        ));
    }
    
    _handleChange = (e) => {
        const {checked, name} = e.target;
        this.setState({[name]: checked});
    }
    
    _handleSearch = (query) => {
        this.setState({isLoading: true});
        makeAndHandleRequest(query)
            .then(({options}) => {
                this.setState({
                    isLoading: false,
                    options,
                });
            });
    }
    
    render() {
        return (
            <div>
                <AsyncTypeahead
                    {...this.state}
                    labelKey="login"
                    minLength={3}
                    onSearch={this._handleSearch}
                    placeholder="Search for a Github user..."
                    renderMenuItemChildren={(option, props) => (
                    <ListItem key={option.id} name={option} />
                    )}
                />
                <Form.Group>
                    {this._renderCheckboxes()}
                </Form.Group>
            </div>
        )
    }
}

export default AsynchronousSearching
