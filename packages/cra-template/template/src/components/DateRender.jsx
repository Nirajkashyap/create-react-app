import * as React from 'react';
import * as moment from 'moment';

class DateRender extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            value: moment(this.props.value).format( 'MMM Do YYYY, h:mm:ss a')
        }
    }

    render() {
        return (

                <div className="DateRender-component">{this.state.value}</div>
        )
    }
};

export default DateRender;
