import React from "react"

class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
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