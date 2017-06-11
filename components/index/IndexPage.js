import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import DiffLine from './DiffLine';
import ShowLevel from './ShowLevel';
import 'whatwg-fetch';

class DiffPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showOldOnly: false, showNewOnly: false }
        this.updateLevel = this.updateLevel.bind(this);
    }

    updateLevel(showNewOnly, showOldOnly) {
        this.setState({ showOldOnly: showOldOnly, showNewOnly: showNewOnly });
    }

    render() {
        return (
            <div>
                <div>
                    <ShowLevel showOldOnly={this.state.showOldOnly} showNewOnly={this.state.showNewOnly} updateLevel={this.updateLevel} />
                </div>
                <Table responsive style={{ margin: '10px 15px' }}>
                    <tbody >
                        {this.props.diffs && this.props.diffs.map(
                            (line, index) => (<DiffLine key={index} line={line}
                                showNewOnly={this.state.showNewOnly} showOldOnly={this.state.showOldOnly} />))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

ReactDOM.render(<DiffPage diffs={window.configFromServer} />, document.getElementById('root'));