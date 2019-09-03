import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { addBook, getFromStorage } from '../../assets/utils';
import axios from 'axios';





const useStyles = makeStyles({
    booksSection: {
        marginTop: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    searchItem: {
        background: '#355C7D',
        opacity: '.75',
        width: '50%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid white',
        padding: '2em',
        margin: '2em'
    },

    title: {
        color: 'white',
        textAlign: 'center',
    },

    authors: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    author: {
        color: 'white',
        margin: '0 1em'
    },

    buttons: {
        padding: '1em',
    },

    button: {
        margin: '1em'
    }

});


const addBookHandler = (book) => {
    
    let user = getFromStorage('book_finder')
    axios.get(`http://localhost:5000/api/users/verify?token=${user.token}`)
         .then(res => {
             const addedBook = {
                 userId: res.data.id[0].userId,
                 book_title: book.title,
                 book_image: book.imageLinks.thumbnail,
                 book_in_progress: false,
                 book_completed: false
             }

             addBook(addedBook);
         })
    
    
}



function SearchResults(props) {
    const classes = useStyles();


    //pass in books array through props, map through each one and display.

    const results = (books) => {

       const result = books.map(book => {

           /* Only show results with images  */
            if (book.volumeInfo.imageLinks) {
                return (

                    <div className={classes.searchItem} key={book.id}>

                        <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book thumbnail" />

                        <h1 className={classes.title}>{book.volumeInfo.title}</h1>
                        <h4>Author:</h4>
                        <div className={classes.authors}>

                            {
                                book.volumeInfo.authors.map(author => {

                                    return (<h4 key={author} className={classes.author}>{author}</h4>)

                                })
                            }
                        </div>
                        <div className={classes.buttons}>
                            <Button variant="outlined" color="inherit" className={classes.button}>
                                Google Books Link
                            </Button>
                            <Button variant="outlined" color="inherit" className={classes.button} onClick={() => addBookHandler(book.volumeInfo)}>
                                Add to Bookshelf
                            </Button>
                        </div>
                    </div>

                )
            } else {
                return null //don't show the book without image 
            }
        })

        return result
    }
    





    
    return (
        <Container className={classes.booksSection}>
            {results(props.books)}
        </Container>
    );
}

export default SearchResults;