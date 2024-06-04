import React from "react"

class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        console.log(`${this.props.id} componentDidMount() is called.`)
    }
    componentDidUpdate() {
        console.log(`${this.props.id} componentDidUpdate() is called.`)
    }
    componentWillUnmount() {
        console.log(`${this.props.id} componentWillUnmount() is called.`)
    }

    render() {
        return (
            <div>
                <span>
                    {this.props.message}
                </span>
            </div>
        )
    }
}

export default Notification