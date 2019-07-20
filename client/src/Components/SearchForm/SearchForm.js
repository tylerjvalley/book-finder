import React from 'react';
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

    form: {
        background: '#355C7D',  /* fallback for old browsers */
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
            <div className={classes.titleContainer}>
            <h1 className={classes.title}>Book Finder</h1>
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