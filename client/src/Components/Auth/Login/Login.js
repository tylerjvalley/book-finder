import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations'
import Button from '@material-ui/core/Button';
import { setInStorage } from '../../../assets/utils';
import './Login.scss';
import axios from 'axios';



class Login extends Component {

    state = {
        modalIsOpen: false,
        isLoading: false,
        isAuthenticated: false,
        loginError: '',
        username: '',
        password: '',
        token: '',
        

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
            this.setState({ username: username });
        } else if (type === 'password') {
            let password = e.target.value;
            this.setState({ password: password });
        }
    }

    submitLogin = (e) => {
       e.preventDefault();

       const userData = {
           username: this.state.username,
           password: this.state.password
       }

        axios.post('http://localhost:5000/api/users/login', userData)
            .then(res => {
                setInStorage('book_finder', { token: res.data.token });
                this.setState({
                    loginError: 'Successfully Logged In',
                    isLoading: false,
                    token: res.data.token
                })
                window.location.reload();
            }) //redirect to dashboard on success
            .catch(err => {
                console.log(err.response.data)
                this.setState({
                    loginError: err.response.data,
                    isLoading: false
                })

            })

       this.setState({isAuthenticated: true});

            
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
                margin: '1em',
            },


            messageContainer: {
                background: '#66ff66',
                width: '100%',
                
            },

            message: {
                textAlign: 'center',
                fontFamily: 'DM Serif Display',

            },

        }

       
        

        let loading, errors;

        
        if (this.state.isLoading) {
            loading = (
                <div style={styles.messageContainer}>
                    <p style={styles.message}>Loading...</p>
                </div>
            );
        } 
        

        if (this.state.loginError) {
            errors = Object.values(this.state.loginError);
            errors.map(error => {
                return ({error})
            })
        } else {
            errors = null;
        }

       
        
    

        return (
            <>  

                <Button variant="outlined" color="inherit" onClick={() => this.modalAction('show')} style={styles.loginButtons}>
                   Login
                </Button>         
            

                {
                    this.state.modalIsOpen ? <div className="LoginModalWrapper">
                        <StyleRoot>
                            <div className="LoginModal" style={styles.fadeIn}>
                                <div style={styles.messageContainer}>
                                    <p style={styles.message}>{errors}</p>
                                </div>
                                {loading}
                                <h4 className="loginExit" onClick={() => this.modalAction('hide')}>X</h4>
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
                
            </>
        )
    }
}




export default Login;