import React from 'react';


var addedColor = '#a0e22d';
var invisibleAddedColor = '#283a0b';
var removedColor = '#f12772';
var invisibleRemovedColor = '#500d26';
var defaultColor = '#e7f8f2';

export default class DiffLine extends React.Component {

    render() {
        var line = this.props.line;
        var showOldOnly = this.props.showOldOnly;
        var showNewOnly = this.props.showNewOnly;

        console.log(this.props);
        var style = {
            color: (line.added && (showOldOnly ? invisibleAddedColor : addedColor))
            || (line.removed && (showNewOnly ? invisibleRemovedColor : removedColor)) || defaultColor,
        }
        return (
            <tr style={style}>
                <td style={{ borderWidth: '0px', width: '20px', padding: '4px' }}>{(line.added && '+') || (line.removed && '-' || '')}</td>
                <td style={{ borderWidth: '0px', padding: '4px' }}>{line.value}</td>
            </tr>
        );
    }
}