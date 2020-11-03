import * as React from 'react';

import {AgGridReact} from 'ag-grid-react';
import CellRender  from './CellRender'
import DateRender from './DateRender';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class GithubUserList extends React.Component {
    constructor(props) {
        super(props);
        this.methodFromParent= this.methodFromParent.bind(this);
        // Todo
        this.state = {
            columnDefs: [
                {headerName: "Github Url", cellRenderer: "CellRender", field: "url", colId: "url", width: 150},
                {headerName: "Name ", field: "full_name", width: 150},
                {headerName: "Created At", field: "created_at", cellRenderer: "DateRender", width: 250},



            ],
            rowData: this.props.githubUserRepoList,
            context: { componentParent: this },
            frameworkComponents: {
                CellRender,
                DateRender
            }

        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({rowData:nextProps.githubUserRepoList})
    }

    methodFromParent(cell) {
        alert(cell)
        // this.props.history.push('//'+ cell);
    }
    render() {
        return (
            <div
                className="col-sm-9 ag-theme-balham  GithubUserList-component"
                style={{
                    height: '500px'
                }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    enableSorting={true}
                    enableFilter={true}
                    context={this.state.context}
                    frameworkComponents={this.state.frameworkComponents}
                    enableColResize
                />

            </div>
        );
    }
}

export default GithubUserList;
