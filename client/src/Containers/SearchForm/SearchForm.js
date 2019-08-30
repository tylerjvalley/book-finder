import React, { Component } from 'react';
import Login from '../../Components/Auth/Login/Login';
import SignUp from '../../Components/Auth/SignUp/SignUp';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getFromStorage } from '../../assets/utils';


class SearchForm extends Component {
   
    state = {
        token: '', // is signed in
        isLoading: false
    }

    componentDidMount() {
        const obj = getFromStorage('book_finder');

        if (obj && obj.token) {
            const token = obj.token;
            //verify token
            axios.get(`http://localhost:5000/api/users/verify?token=${token}`)
                .then(res => {
                    if (res) {
                        this.setState({
                            token: token,
                            isLoading: false
                        });
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

            axios.post(`http://localhost:5000/api/users/logout?token=${token}`)
                .then(res => {
                    localStorage.removeItem('book_finder')
                    this.setState({
                        token: '',
                        isLoading: false
                    })
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
                marginLeft: '41%',
            },

            title: {
                color: 'white',
                fontSize: '45px',
                fontFamily: 'DM Serif Display',

            },

            buttonsContainer: {
                display: 'flex',
                flexWrap: 'nowrap',
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
                marginTop: '1%',
                zIndex: '2',
            },

            searchButton: {
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
        }

        let buttons;
        const { token } = this.state;

        if (!token) {
            buttons = (
                <div>
                    <Login />
                    <SignUp />    
                </div>
            )
        } else {
            buttons = (
                <div>
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

        let loading;

        if (this.state.isLoading) {
            loading = (<p>Loading...</p>)
        } else {
            loading = null;
        }


        return (<>
                <div style={styles.top}>
                    <div style={styles.titleContainer}>
                        {loading}
                        <h1 style={styles.title}>Book Finder</h1>
                    </div>

                    <div style={styles.buttonsContainer}>
                        {buttons}
                    </div>
                </div>
            

                <FormControl style={styles.form}>
                
                    <InputLabel style={styles.label}>Search</InputLabel>
                    <Input type="text"
                            style={styles.search}
                            onChange={this.props.search}
                            ></Input>
                <Button style={styles.searchButton} onClick={this.props.submit}><SearchIcon style={styles.icon}/></Button>

                </FormControl>
                
                </>
                );
    }
}

export default SearchForm;