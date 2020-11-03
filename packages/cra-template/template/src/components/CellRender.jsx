import * as React from 'react';
import './CellRender.css'

class CellRender extends React.Component {
    constructor(props) {
        super(props);

        this.invokeParentMethod = this.invokeParentMethod.bind(this);
    }

    invokeParentMethod() {
        this.props.context.componentParent.methodFromParent(`${this.props.value}`)
    }

    render() {
        return (
            <div className="CellRender-component btn"
                    style={{height: 20, lineHeight: 0.5}}
                    onClick={this.invokeParentMethod}
                    >{this.props.value}</div>
        )
    }
};

export default CellRender;
