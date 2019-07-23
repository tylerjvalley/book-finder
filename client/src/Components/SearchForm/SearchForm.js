import React, { useState } from 'react';
import { fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import './Login.scss';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';






  
const useStyles = makeStyles({

    titleContainer: {
        width: '100%',
        height: '20%',
        background: '#355C7D',
    },

    title: {
        color: 'white',
        padding: '1rem',
        fontSize: '45px',
        fontFamily: 'DM Serif Display',
        textAlign: 'center'
    },

    login: {
        background: '#355C7D',
        position: 'absolute',
        top: '8%',
        right: '0',
    },

    loginButton: {
        border: '1px solid white',
        color: 'white',
        margin: '1em',
    },

    

    form: {
        background: '#355C7D', 
        width: '100%',
    },
    
    search: {
        width: '25%',
        margin: '2em auto',
        border: 0,
        background: 'white',
        color: 'black',
        borderRadius: 3,
        height: 48,
        padding: '0 30px',
    },

    label: {
        marginLeft: '48%',
        marginTop: '-0.2%',
        zIndex: '2',
    },

    button: {
        width: '15%',
        margin: '1em auto',
        border: '1px solid #2B4570',
        '&:hover': {
            border: '1px solid white'
        }
    },

    icon: {
        '&:hover': {
            color: 'white'
        }
    }

    
});

function SearchForm(props) {
    const classes = useStyles();

    // modal state
    const [loginIsOpen, setLoginOpen] = useState({
        open: false
    });

    const [signUpIsOpen, setSignUpOpen] = useState({
        open: false
    });

    const showLogin = () => {
        setLoginOpen({ ...loginIsOpen, open: true });
    }

    const hideLogin = () => {
        setLoginOpen({ ...loginIsOpen, open: false });
    }

    const showSignUp = () => {
        setSignUpOpen({ ...signUpIsOpen, open: true });
    }

    const hideSignUp = () => {
        setSignUpOpen({ ...signUpIsOpen, open: false });
    }
    // animate login modal
    const loginStyles = {
        fadeIn: {
            animation: 'x 0.5s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        }
    }

    return (<>
            <div className={classes.titleContainer}>
            <h1 className={classes.title}>Book Finder</h1>
            </div>
            <div className={classes.login}>
               
                <Button variant="outlined" color="inherit" onClick={showLogin} className={classes.loginButton}>
                    Login
                </Button>
                <Button variant="outlined" color="inherit" onClick={showSignUp} className={classes.loginButton}>
                    Sign Up
                </Button>

                {/* modal login */}
                {loginIsOpen.open ? <div className="LoginModalWrapper">
                    <StyleRoot>
                        <div className="LoginModal" style={loginStyles.fadeIn}>
                            <h4 className="loginExit" onClick={hideLogin}>X</h4>
                            <div className="LogInFields">
                                <input type="text" name="username" placeholder="Username..." />
                                <input type="password" name="password" placeholder="Password..." />
                            </div>
                            <div className="LoginBtnModalWrapper">
                                <button className="LoginBtnModal">Log In</button>
                            </div>
                        </div>
                    </StyleRoot>
                </div> : null}
            {/* modal Sign Up */}
            {signUpIsOpen.open ? <div className="LoginModalWrapper">
                <h4 className="signUpExit" onClick={hideSignUp}>X</h4>
                <StyleRoot>
                    <div className="LoginModal" style={loginStyles.fadeIn}>
                        <i className="far fa-window-close LoginClose" onClick={hideSignUp}></i>
                        <div className="LogInFields">
                            <input type="text" name="username" placeholder="Username..." />
                            <input type="text" name="firstName" placeholder="First Name..." />
                            <input type="password" name="password" placeholder="Password..." />
                            <input type="password" name="confirmPassword" placeholder="Confirm Password..." />
                        </div>
                        <div className="LoginBtnModalWrapper">
                            <button className="LoginBtnModal">Sign Up</button>
                        </div>
                    </div>
                </StyleRoot>
             </div> : null}

            </div>

            <FormControl className={classes.form}>
               
                <InputLabel className={classes.label}>Search</InputLabel>
                <Input type="text"
                        onChange={props.search}
                        className={classes.search}></Input>
                <Button className={classes.button} onClick={props.submit}><SearchIcon className={classes.icon}/></Button>

            </FormControl>
            
            </>
            );
}

export default SearchForm;