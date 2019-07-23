import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations'
import Button from '@material-ui/core/Button';
import './Login.scss';

class Login extends Component {

    state = {
        loginIsOpen: false,
        signUpIsOpen: false,
        usernameSignIn: '',
        firstName: '',
        passwordSignIn: '',
        confirmPassword: '',
        usernameLogin: '',
        passwordLogin: '',

    }

    modalAction = (type, action) => {
        
        if (type === 'login' && action === 'show') {
            this.setState({loginIsOpen: true})
        } else if (type === 'login' && action === 'hide') {
            this.setState({loginIsOpen: false})
        } else if (type === 'signIn' && action === 'show') {
            this.setState({signUpIsOpen: true})
        } else if (type === 'signIn' && action === 'hide') {
            this.setState({signUpIsOpen: false})
        } else {
            console.log('something went wrong');
        }
  
    }

   

    loginInputChange = (e, type) => {
        if (type === 'username') {
            let username = e.target.value;
            this.setState({usernameLogin: username});
        } else if (type === 'password') {
            let password = e.target.value;
            this.setState({passwordLogin: password});
        }
    }


    signInInputChange = (e, type) => {
        switch (type) {
            case 'username':
                this.setState({usernameSignIn: e.target.value})
                break;
            case 'firstName':
                this.setState({firstName: e.target.value});
                break;
            case 'password':
                this.setState({passwordSignIn: e.target.value});
                break;
            case 'confirmPass':
                this.setState({confirmPassword: e.target.value});
                break;
            default:
                console.log('something went wrong')
        }
    }

    submitLogin = () => {
        console.log({'username': this.state.usernameLogin, 'password': this.state.passwordLogin})
    }

    submitSignUp = () => {
        console.log({'username': this.state.usernameSignIn, 'first name': this.state.firstName, 'password': this.state.passwordSignIn, 'confirm password': this.state.confirmPassword})
    }


    render() {

        const loginStyles = {
            fadeIn: {
                animation: 'x 0.5s',
                animationName: Radium.keyframes(fadeIn, 'fadeIn'),
            },

            buttonsWrapper: {
                position: 'absolute',
                top: '10%',
                right: '5%',        
            },

            loginButtons: {
                border: '1px solid white',
                color: 'white',
                margin: '1em'
            }
        }

       

    

        return (
            <div style={loginStyles.buttonsWrapper}>
                <Button variant="outlined" color="inherit" onClick={() => this.modalAction('login', 'show')} style={loginStyles.loginButtons}>
                    Login
                </Button>
                <Button variant="outlined" color="inherit" onClick={() => this.modalAction('signIn', 'show')} style={loginStyles.loginButtons}>
                    Sign Up
                </Button>
                {
                    this.state.loginIsOpen ? <div className="LoginModalWrapper">
                        <StyleRoot>
                            <div className="LoginModal" style={loginStyles.fadeIn}>
                                <h4 className="loginExit" onClick={() => this.modalAction('login', 'hide')}>X</h4>
                                <div className="LogInFields">
                                    <input type="text" name="username" onChange={(e) => this.loginInputChange(e, 'username')} placeholder="Username..." />
                                    <input type="password" name="password" onChange={(e) => this.loginInputChange(e, 'password')} placeholder="Password..." />
                                </div>
                                <div className="LoginBtnModalWrapper">
                                    <button className="LoginBtnModal" onClick={this.submitLogin}>Log In</button>
                                </div>
                            </div>
                        </StyleRoot>
                    </div> : null
                }
                {
                    this.state.signUpIsOpen ? <div className="LoginModalWrapper">
                        <StyleRoot>
                            <div className="LoginModal" style={loginStyles.fadeIn}>
                                <h4 className="loginExit" onClick={() => this.modalAction('signIn', 'hide')}>X</h4>
                                <div className="LogInFields">
                                    <input type="text" name="username" onChange={(e) => this.signInInputChange(e, 'username')} placeholder="Username..." />
                                    <input type="text" name="firstName" onChange={(e) => this.signInInputChange(e, 'firstName')} placeholder="First Name..." />
                                    <input type="password" name="password" onChange={(e) => this.signInInputChange(e, 'password')} placeholder="Password..." />
                                    <input type="password" name="confirmPassword" onChange={(e) => this.signInInputChange(e, 'confirmPass')} placeholder="Confirm Password..." />
                                </div>
                                <div className="LoginBtnModalWrapper">
                                    <button className="LoginBtnModal" onClick={this.submitSignUp}>Sign Up</button>
                                </div>
                            </div>
                        </StyleRoot>
                    </div> : null
                }
            </div>
        )
    }
}




export default Login;