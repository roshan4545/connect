import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.Email}
                </td>
                <td>
                    {this.props.obj.Password}
                </td>
            </tr>
        );
    }
}

export default DataTable;