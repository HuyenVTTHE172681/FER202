// Cách khởi tạo state (object) ban đầu cho class component
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class ClsState extends Component {
    state = {
        first: false,
        second: true,
    };

    render() {
        return (
            <div>
                <Button disabled={this.state.first}>First</Button>
                <br />
                <Button disabled={this.state.second}>Second</Button>
            </div>
        )
    }

}

export default ClsState