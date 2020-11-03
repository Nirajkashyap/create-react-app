import * as React from 'react';
import './Login.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export default class Login extends React.Component {
    

   constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTestPage = this.handleTestPage.bind(this);
    }

    handleChange(event) {

        if(event.target.value) {
            this.setState({[event.target.id]:event.target.value})
        }
    }

    handleTestPage(event) {
        event.preventDefault();
        this.props.history.push('/org/testpage')
        
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.props.login(this.state.username,this.state.password);
        // api response 200, make cookie, LOGIN_FULLFILLED action is also called
        
    }

    componentWillMount(){
        if(cookies.get('isLoggedin') === "true"){
            this.props.history.push('/search')
        }
    }

     componentWillReceiveProps(nextProps){
        if(nextProps.loggedIn){
            if(nextProps.from && nextProps.from !== '/login'){
                this.props.history.push(nextProps.from);
            }else if(this.props.location.state && this.props.location.state.from) {
                const {pathname, search} = this.props.location.state.from;
                if (pathname && pathname !== '/login') {
                    this.props.history.push(pathname + search)
                }
            }else{
                this.props.history.push('/search');
            }

        } else {
            alert("not Login in ");
        }
    }

    render() {
        return (
            <div className="Login-component col-sm-12" id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" onSubmit={(e) => this.handleSubmit(e)}>
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label className="text-info">Username:</label>
                                        <br />
                                        <input onChange={(e) => this.handleChange(e)} required type="text" name="username" id="username" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-info">Password:</label><br />
                                        <input onChange={(e) => this.handleChange(e)} required type="password" name="password" id="password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input  type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#" onClick={(e) => this.handleTestPage(e)}> lazy loaded unsecured page </a>
            </div>
        );

    }
};