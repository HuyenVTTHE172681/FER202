import React from 'react';

class ClsComponent extends React.Component {
    render() {
        return (
            <div>
                <p>Address: {this.props.address}</p>
                <p>City: {this.props.city}</p>
            </div>
        )
    }
}

export default ClsComponent