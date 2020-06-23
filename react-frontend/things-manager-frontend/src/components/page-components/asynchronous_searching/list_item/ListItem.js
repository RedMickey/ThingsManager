import React, { Component } from 'react'

export class ListItem extends Component {
    render() {
        return (
            <div>
                {this.props.name}
            </div>
        )
    }
}

export default ListItem
