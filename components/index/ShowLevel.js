import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default class ShowLevel extends React.Component {
    constructor(props) {
        super(props);
        this.levelSelected = this.levelSelected.bind(this);
    }

    levelSelected(showNewOnly, showOldOnly) {
        this.props.updateLevel(showNewOnly, showOldOnly);
    }

    render() {
        var showNewOnly = this.props.showNewOnly;
        var showOldOnly = this.props.showOldOnly;

        return (
            <div>
                <ButtonGroup style={{margin:'20px', float:'right'}}>
                    <Button bsStyle={(showNewOnly || showOldOnly) ? 'default' : 'primary'} onClick={this.levelSelected.bind(this, false, false)}>All</Button>
                    <Button bsStyle={showNewOnly ? 'primary' : 'default'} onClick={this.levelSelected.bind(this, true, false)} >New Only</Button>
                    <Button bsStyle={showOldOnly ? 'primary' : 'default'} onClick={this.levelSelected.bind(this, false, true)}>Old Only</Button>
                </ButtonGroup>
                <div style={{ clear: 'both' }} />
            </div>
        );
    }
}