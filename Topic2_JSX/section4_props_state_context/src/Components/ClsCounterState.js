import { Component } from "react";

class ClsCounterState extends Component {
    // Khai báo và gán giá trị ban đầu cho biến count
    state = { count: 0, message: "Count not change" };

    incrementCount= () => {
        this.setState({ count: this.state.count + 1 , message: "Count change" });
    }
    render() {
        return (
            <div>
                <div>Count: {this.state.count}</div>
                <div>Message: {this.state.message}</div>
                <button onClick={this.incrementCount}>Increment Count</button>
            </div>
        )
    }
}

export default ClsCounterState