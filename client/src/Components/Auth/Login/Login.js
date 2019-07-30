import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './Login.scss';

class Login extends Component {

    state = {
        modalIsOpen: false,
        username: '',
        password: '',
        errors: {},

    }

    modalAction = action => {
        
        if (action === 'show') {
            this.setState({ modalIsOpen: true })
        } else if (action === 'hide') {
            this.setState({ modalIsOpen: false })
        } else {
            alert('something went wrong')
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

    submitLogin = (e) => {
        e.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/api/users/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        })
        
        console.log(userData);
    }



    render() {

        const styles = {
            fadeIn: {
                animation: 'x 0.5s',
                animationName: Radium.keyframes(fadeIn, 'fadeIn'),
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
                    Login
                </Button>
                
                {
                    this.state.modalIsOpen ? <div className="LoginModalWrapper">
                        <StyleRoot>
                            <div className="LoginModal" style={styles.fadeIn}>
                                <h4 className="loginExit" onClick={() => this.modalAction('hide')}>X</h4>
                                <div className="LogInFields">
                                    <input type="text" name="username" error={errors.username} onChange={(e) => this.loginInputChange(e, 'username')} placeholder="Username..." />
                                    <input type="password" name="password" error={errors.password} onChange={(e) => this.loginInputChange(e, 'password')} placeholder="Password..." />
                                </div>
                                <div className="LoginBtnModalWrapper">
                                    <button className="LoginBtnModal" onClick={this.submitLogin}>Log In</button>
                                </div>
                            </div>
                        </StyleRoot>
                    </div> : null
                }
                
            </>
        )
    }
}




export default Login;