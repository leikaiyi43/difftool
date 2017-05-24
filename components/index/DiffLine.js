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
        var added = line.some(term => term.added);
        var removed = line.some(term => term.removed);

        console.log(this.props);
        var style = {
            color: (added && (showOldOnly ? invisibleAddedColor : addedColor))
            || (removed && (showNewOnly ? invisibleRemovedColor : removedColor)) || defaultColor,
            height: '28px'
        }
        return (
            <tr style={style}>
                <td style={{ borderWidth: '0px', width: '20px', padding: '4px' }}>{(added && '+') || (removed && '-' || '')}</td>
                <td style={{ borderWidth: '0px', padding: '4px' }}>
                    {line.map(function (term, idx) {
                        if ( term.added && term.value !== '') {
                            return (<mark style={{backgroundColor: showOldOnly ? invisibleAddedColor : addedColor, color:showOldOnly ? '#272924' : 'black' }} key={idx}>{term.value}</mark>);
                        }
                        if ( term.removed && term.value !== '') {
                            return (<mark style={{backgroundColor: showNewOnly ? invisibleRemovedColor : removedColor, color: showNewOnly ? '#272924' : 'black' }} key={idx}>{term.value}</mark>);
                        }
                        return term.value;
                    })}
                </td>
            </tr>
        );
    }
}