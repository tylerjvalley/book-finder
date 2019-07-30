import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations'
import Button from '@material-ui/core/Button';
import { registerUser } from '../../../assets/utils';
import { createBrowserHistory } from 'history';
import '../Login/Login.scss';


class SignUp extends Component {

    state = {
        modalIsOpen: false,
        username: '',
        firstName: '',
        password: '',
        password2: '',
        errors: {},

    }

    modalAction = action => {

        if (action === 'show') {
            this.setState({ modalIsOpen: true})
        } else if (action === 'hide'){
            this.setState({ modalIsOpen: false})
        } else {
            alert('something went wrong')
        }

    }


    signUpInputChange = (e, type) => {
        switch (type) {
            case 'username':
                this.setState({ username: e.target.value })
                break;
            case 'firstName':
                this.setState({ firstName: e.target.value });
                break;
            case 'password':
                this.setState({ password: e.target.value });
                break;
            case 'confirmPass':
                this.setState({ password2: e.target.value });
                break;
            default:
                console.log('something went wrong')
        }
    }


    submitSignUp = (e) => {        

        const newUser = {
            username: this.state.username,
            firstName: this.state.firstName,
            password: this.state.password,
            password2: this.state.password2,
        }

        registerUser(newUser, createBrowserHistory());

       
    }


    render() {

        const styles = {
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



        const { errors } = this.state;

        return (
            <>
                <Button variant="outlined" color="inherit" onClick={() => this.modalAction('show')} style={styles.loginButtons}>
                    Sign Up
                </Button>
                
                {
                    this.state.modalIsOpen ? <div className="LoginModalWrapper">
                        <StyleRoot>
                            <div className="LoginModal" style={styles.fadeIn}>
                                <h4 className="loginExit" onClick={() => this.modalAction('hide')}>X</h4>
                                <div className="LogInFields">
                                    <input type="text" name="username" error={errors.username} onChange={(e) => this.signUpInputChange(e, 'username')} placeholder="Username..." />
                                    <input type="text" name="firstName" error={errors.firstName} onChange={(e) => this.signUpInputChange(e, 'firstName')} placeholder="First Name..." />
                                    <input type="password" name="password" error={errors.password} onChange={(e) => this.signUpInputChange(e, 'password')} placeholder="Password..." />
                                    <input type="password" name="confirmPassword" error={errors.password2} onChange={(e) => this.signUpInputChange(e, 'confirmPass')} placeholder="Confirm Password..." />
                                </div>
                                <div className="LoginBtnModalWrapper">
                                    <button className="LoginBtnModal" onClick={this.submitSignUp}>Sign Up</button>
                                </div>
                            </div>
                        </StyleRoot>
                    </div> : null
                }
            </>
        )
    }
}




export default SignUp;