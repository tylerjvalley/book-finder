import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations'
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

        this.setState({isLoading: true})

       
        axios.post('http://localhost:5000/api/users/sign-up', newUser)
            .then(res => {
                this.setState({
                    signUpError: 'Successfully Signed In',
                    isLoading: false
                })
            }) //redirect to dashboard on success
            .catch(err => {
                console.log(err.response.data)
                this.setState({
                    signUpError: err.response.data,
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
            }
        }

        let loading, errors;

        if (this.state.isLoading) {
            loading = (<div><p>Loading...</p></div>);
        } else {
            loading = (<Button variant="outlined" color="inherit" onClick={() => this.modalAction('show')} style={styles.loginButtons}>
                Sign Up
                </Button>);
        }

        if (this.state.signUpError) {
            errors = Object.values(this.state.signUpError);
            errors.map(error => {
                return (<p>{error}</p>)
            })
          
        } else {
            errors = null;
        }

        

        
        return (
            <>
                {errors}
                {loading}
                
                {
                    this.state.modalIsOpen ? <div className="LoginModalWrapper">
                        <StyleRoot>
                            <div className="LoginModal" style={styles.fadeIn}>
                                <h4 className="loginExit" onClick={() => this.modalAction('hide')}>X</h4>
                                <div className="LogInFields">
                                    <input type="text" name="username" onChange={(e) => this.signUpInputChange(e, 'username')} placeholder="Username..." />
                                    <input type="text" name="firstName" onChange={(e) => this.signUpInputChange(e, 'firstName')} placeholder="First Name..." />
                                    <input type="password" name="password" onChange={(e) => this.signUpInputChange(e, 'password')} placeholder="Password..." />
                                    <input type="password" name="confirmPassword" onChange={(e) => this.signUpInputChange(e, 'confirmPass')} placeholder="Confirm Password..." />
                                </div>
                                <div className="LoginBtnModalWrapper">
                                    <button className="LoginBtnModal" onClick={this.submitSignUp}>Sign Up</button>
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