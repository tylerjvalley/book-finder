import React, { Component } from 'react';
import Login from '../../Components/Auth/Login/Login';
import SignUp from '../../Components/Auth/SignUp/SignUp';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getFromStorage } from '../../assets/utils';
import '../../App.css';



class SearchForm extends Component {
   
    state = {
        token: '', // is signed in
        isLoading: false,
        currentUser: '',
    }

    componentDidMount() {
        const obj = getFromStorage('book_finder');

        if (obj && obj.token) {
            const token = obj.token;

            //verify token
            axios.get(`/api/users/verify?token=${token}`)
                .then(res => {
                    if (res) {
                        this.setState({
                            token: token,
                            isLoading: false
                        });

                        //get current user by id
                        axios.get(`/api/users/${res.data.id[0].userId}`)
                             .then(user => {             
                                 this.setState({ currentUser: user.data.firstName });
                             })
                             .catch(err => {
                                 console.log(err);
                             })

                    } else {
                        this.setState({
                            isLoading: false,
                        })
                    }
                })
                .catch(err => {
                    this.setState({ isLoading: false })
                })
        }
    }

    logout = () => {

        this.setState({ isLoading: true })

        const obj = getFromStorage('book_finder');

        if (obj && obj.token) {
            const token = obj.token;

            axios.post(`/api/users/logout?token=${token}`)
                .then(res => {
                    localStorage.removeItem('book_finder')
                    this.setState({
                        token: '',
                        isLoading: false
                    })

                    window.location.reload();
                })
                .catch(err => {
                    this.setState({
                        isLoading: false
                    })
                })
        } else {
            this.setState({ isLoading: false })
        }
    }


    render() {

        const styles = {

            buttons: {
                border: '1px solid white',
                color: 'white',
                margin: '1em'
            },

            top: {
                width: '100%',
                background: '#355C7D',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
            },

            titleContainer: {
                margin: 'auto'
            },

            title: {
                color: 'white',
                fontSize: '45px',
                fontFamily: 'DM Serif Display',

            },

            messageContainer: {
                background: '#66ff66',
                width: '100%',
                height: '30px'
            },

            message: {
                textAlign: 'center',
                fontFamily: 'DM Serif Display',
                margin: 'auto',

            },

            buttonsContainer: {
                display: 'flex',
                flexWrap: 'nowrap',
                background: '#355C7D',
                border: '1px solid #355C7D'
            },

            form: {
                background: '#355C7D',
                width: '100%',
            },

            search: {
                width: '30%',
                margin: 'auto',
            },

            searchButton: {
                width: '15%',
                margin: '1em auto',
                border: '1px solid white',
                color: 'white'
            },

            icon: {
                '&:hover': {
                    color: 'white'
                }
            },
        }

        let buttons;
        const { token } = this.state;

        if (!token) {
            buttons = (
                <div style={{ margin: 'auto' }}>
                    <Login />
                    <SignUp />    
                </div>
            )
        } else {
            buttons = (
                <div style={{ margin: 'auto' }}>
                    <Button variant="outlined" color="inherit" onClick={() => this.logout()} style={styles.buttons}>
                        Logout
                    </Button>
                    <Link to="/dashboard">
                        <Button variant="outlined" color="inherit" style={styles.buttons}>
                            Dashboard
                        </Button>
                    </Link>
                </div>
            )
        }

        let message, title;

        if (this.state.isLoading && !this.props.error) {
            message = (<div style={styles.messageContainer}><p style={styles.message}>Loading...</p></div>)
        } else if (!this.state.loading && this.props.error) {
            message = (<div style={styles.messageContainer}><p style={styles.message}>{this.props.error}</p></div>);
        } else if (!this.state.loading && !this.props.error) {
            message = null
        }

        
        if (this.state.currentUser) {
            title = (<h1 style={styles.title}>Hello {this.state.currentUser}!</h1>)
        } else {
            title = (<h1 style={styles.title}>Book Finder</h1>)
        }

        


        return (<>
                <div style={styles.top}>
                    {message}
                    <div style={styles.titleContainer}>   
                        {title}
                    </div>
                </div>

                <div style={styles.buttonsContainer}>
                    {buttons}
                </div>
            
                <form onSubmit={this.props.submit}>
                    <FormControl style={styles.form}>
                        <TextField type="text"
                                label="Search"
                                style={styles.search}
                                onChange={this.props.search}
                                variant="outlined"
                                className="textfield"
                                />
                                            
                        <Button style={styles.searchButton} type="submit"><SearchIcon style={styles.icon}/></Button>

                    </FormControl>
                </form>
                
                </>
                );
    }
}

export default SearchForm;