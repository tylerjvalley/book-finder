import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations'
import { setInStorage } from '../../../assets/utils';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../Login/Login.scss';


class SignUp extends Component {

    state = {
        modalIsOpen: false,
        isLoading: false,
        signUpError: '',
        username: '',
        firstName: '',
        password: '',
        password2: '',

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
        
        this.setState({ isLoading: true });

        const newUser = {
            username: this.state.username,
            firstName: this.state.firstName,
            password: this.state.password,
            password2: this.state.password2,
        }
       
        axios.post(`/api/users/sign-up`, newUser)
            .then(res => {
                this.setState({
                    signUpError: 'Successfully Signed In',
                    isLoading: false
                })

                axios.post('/api/users/login', newUser)
                     .then(res => {
                         setInStorage('book_finder', { token: res.data.token });
                         window.location.reload();
                     })
                     .catch(err => {
                         this.setState({
                             signUpError: 'Problem logging in'
                         })
                     })
            }) 
            .catch(err => {
                this.setState({
                    signUpError: 'Problem signing in',
                    isLoading: false
                })
                
            })

       
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
            },

            messageContainer: {
                background: '#66ff66',
                width: '100%',
            },

            message: {
                textAlign: 'center',
                fontFamily: 'DM Serif Display'

            },

        }

        let message;

        if (this.state.isLoading && !this.state.signUpError) {
            message = (
                <div style={styles.messageContainer}>
                     <p style={styles.message}>Loading...</p>
                </div>
                );
        } else if (!this.state.isLoading && this.state.signUpError) {
            message = (
                <div style={styles.messageContainer}>
                    <p style={styles.message}>{this.state.signUpError}</p>
                </div>
            )
        } else if (!this.state.isLoading && !this.state.signUpError) {
            message = null;
        }

        
        return (
            <>
                
                <Button variant="outlined" color="inherit" onClick={() => this.modalAction('show')} style={styles.loginButtons}>
                    Sign Up
                </Button>
                {
                    this.state.modalIsOpen ? <div className="LoginModalWrapper">
                        <StyleRoot>
                            <div className="SignUpModal" style={styles.fadeIn}>
                                {message}
                                <h4 className="loginExit" onClick={() => this.modalAction('hide')}>X</h4>
                                <div className="LogInFields">
                                    <input type="text" name="username" onChange={(e) => this.signUpInputChange(e, 'username')} placeholder="Username..." />
                                    <input type="text" name="firstName" onChange={(e) => this.signUpInputChange(e, 'firstName')} placeholder="First Name..." />
                                    <input type="password" name="password" onChange={(e) => this.signUpInputChange(e, 'password')} placeholder="Password..." />
                                    <input type="password" name="confirmPassword" onChange={(e) => this.signUpInputChange(e, 'confirmPass')} placeholder="Confirm Password..." />
                                </div>
                                <div className="LoginBtnModalWrapper">
                                    <button className="SignUpBtnModal" onClick={this.submitSignUp}>Sign Up</button>
                                </div>
                            </div>
                        </StyleRoot>
                    </div> : null
                }
                
            </>
        );
        
        
    }
}




export default SignUp;