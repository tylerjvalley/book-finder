import React from 'react';
import Login from '../../Components/Auth/Login/Login';
import SignUp from '../../Components/Auth/SignUp/SignUp';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';







  
const useStyles = makeStyles({

    top: {
        width: '100%',
        background: '#355C7D', 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titleContainer: {
        margin: 'auto',
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


    return (<>
            <div className={classes.top}>
                <div className={classes.titleContainer}>
                    <h1 className={classes.title}>Book Finder</h1>
                </div>

                <div className={classes.buttonsContainer}>
                    <Login />
                    <SignUp />
                </div>
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