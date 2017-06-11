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
        var added = line.every(term => term.added);
        var removed = line.every(term => term.removed);

        console.log(this.props);
        var style = {
            color: defaultColor,
            height: '28px'
        }

        var removedStyle = {
            color: showNewOnly ? invisibleRemovedColor : removedColor,
        }

        return (
            <tr style={style}>
                <td style={{ borderWidth: '0px', padding: '4px' }}>
                    {line.filter(term => (!term.added && !term.removed) || (term.added && !showOldOnly) || (term.removed && !showNewOnly)).map(function (term, idx) {
                        if (term.added && term.value !== '') {
                            return (<span style={{ color: showOldOnly ? invisibleAddedColor : addedColor }} key={idx}>{term.value}</span>);
                        }
                        if (term.removed && term.value !== '') {
                            if (!showOldOnly) {
                                return (<span style={removedStyle} key={idx}><s>{term.value}</s></span>);
                            }
                            return (<span style={removedStyle} key={idx}>{term.value}</span>);
                        }
                        return term.value;
                    })}
                </td>
            </tr>
        );
    }
}