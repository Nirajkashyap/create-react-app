import * as React from 'react';
import * as qs from 'query-string';
import GithubUserList from './GithubUserList';





export class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            githubUserName: "",
            hideShow: "hide",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleRepos = this.handleRepos.bind(this);
        this.handleReposCancel = this.handleReposCancel.bind(this);
    }

    handleRepos(){
        if (!this.props.githubUserReposLoading) {
            this.props.fetchGithubUserReposStart();
        }
    }

    handleReposCancel(){
        this.props.fetchGithubUserReposCancel();
    }

    handleCancel(){
        this.props.fetchGithubUserCancel();
    }

    handleChange(event) {
        if (event.target.value) {
            this.setState({hideShow: "hide", githubUserName: event.target.value});
        } else {
            this.setState({hideShow: "show", githubUserName: ""});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.githubUserName) {
            this.setState({hideShow: "show"});
        } else {
            // both below line of code are required to trigger api call from componentWillReceiveProps
            // this.props.fetchGithubUserStart();
            this.props.history.push('/search?githubUserName=' + this.state.githubUserName);

        }
    }

    componentWillReceiveProps( nextProps) {
        console.log(this.props  ,nextProps);
        // nextProps.githubUserLoading flag is used when handleChange is called and will update state but we don't want to call api
        // when handleSubmit is called will update  nextProps.githubUserLoading via action and then updating url that will trigger same cmp
        // and will go to  componentWillReceiveProps section
        if (nextProps.githubUserLoading && qs.parse(nextProps.location.search).githubUserName) {
             this.props.fetchGithubUser(qs.parse(nextProps.location.search).githubUserName);
         }

         if(qs.parse(this.props.search).githubUserName !== qs.parse(nextProps.location.search).githubUserName && !nextProps.githubUserLoading){
                      this.props.fetchGithubUserStart();
                  }

        // code for repos fetch
        if (nextProps.githubUserReposLoading) {
            this.props.fetchGithubUserRepos(this.props.githubUserName);
        }
    }

    componentDidMount() {
        const githubUserName =  qs.parse(this.props.search).githubUserName;
        // console.log(githubUserName);
        if (githubUserName) {
            this.setState({githubUserName});
            this.props.fetchGithubUserStart();
            // console.log(qs);
            // this.props.fetchGithubUser(qs.parse(this.props.search, {ignoreQueryPrefix: true}).githubUserName);
        }
    }

    render() {
        return (
            <div className="col-sm-9 Landing-component">
                <div className="search-css">
                    <h3><span className="badge badge-secondary"> Dashboard</span></h3>
                    <br/><br/>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="input-group">
                            <input disabled = {this.props.githubUserLoading} type="text" value={this.state.githubUserName} onChange={this.handleChange}
                                   className="form-control" placeholder="github username"
                                   data-toggle="tooltip" data-placement="bottom" title="Enter github username"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit">Search</button>
                                <button onClick={this.handleCancel} className="btn btn-outline-secondary" type="button">cancel</button>
                            </div>
                        </div>
                        <div className={`alert alert-danger ${this.state.hideShow} `} role="alert">
                            Please enter github username.
                        </div>
                    </form>
                </div>

                <pre>{JSON.stringify(this.props.githubUserDetails, null, 2) }</pre>
                <h3>github repos</h3>

                <button onClick={this.handleRepos} className="btn btn-outline-secondary" type="button">get repos</button>
                <button onClick={this.handleReposCancel} className="btn btn-outline-secondary" type="button">cancel</button>


                {this.props.githubUserReposDetails &&
                <GithubUserList githubUserRepoList={this.props.githubUserReposDetails} history={this.props.history}/>
                }



            </div>
        );

    }
};
