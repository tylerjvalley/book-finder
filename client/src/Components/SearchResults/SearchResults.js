import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { getFromStorage } from '../../assets/utils';
import axios from 'axios';

 


class SearchResults extends Component {

    state = {
        isLoading: false,
        error: '',
        book: '',

    }


    addBookHandler = (book) => {

        this.setState({ isLoading: true });

        let user = getFromStorage('book_finder');

        if (user) {

            axios.get(`/api/users/verify?token=${user.token}`)
                .then(res => {

                    const addedBook = {
                        userId: res.data.id[0].userId,
                        book_title: book.volumeInfo.title,
                        book_image: book.volumeInfo.imageLinks.thumbnail,
                        book_link: book.accessInfo.webReaderLink,
                        book_in_progress: false,
                        book_completed: false
                    }

                    axios.post(`/api/books/add-book`, addedBook)
                        .then(res => {
                            this.setState({
                                isLoading: false,
                                error: 'Book added successfully',
                                book: book.id
                            })
                        })
                        .catch(err => {
                            this.setState({
                                isLoading: false,
                                error: 'Server Error',
                                book: book.id
                            })
                        })
                })
            } else {
                this.setState({
                    isLoading: false,
                    error: 'You have to be logged in to add a book',
                    book: book.id
                })
            }

    }

    

    render() {

    
        const styles = {
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

            link: {
                textDecoration: 'none',
                color: 'white'
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
            },

            error: {
                background: '#66ff66',
                width: '100%',
                height: '30px',
                marginBottom: '10px',
            },

            errorMessage: {
                textAlign: 'center',
                fontFamily: 'DM Serif Display',
                color: 'white',
                position: 'relative',
                margin: 'auto',
            }

        };

        //pass in books array through props, map through each one and display.

        const showResults = (books) => {

            const result = books.map(book => {

                /* Only show results with images  */
                    if (book.volumeInfo.imageLinks) {
                        return (
                            
                            <div style={styles.searchItem} key={book.id}>

                                { this.state.isLoading && this.state.book === book.id ? 
                                    (
                                        <div style={styles.error}>
                                            <p style={styles.errorMessage}>Loading...</p>
                                        </div>
                                    )
                                : null } {/* Show loading bar */}


                                { this.state.error && this.state.book === book.id ? 
                                    (
                                        <div style={styles.error}>
                                            <p style={styles.errorMessage}>{this.state.error}</p>
                                        </div>
                                    )
                                : null } {/* show error on top if there is one */}

                                <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book thumbnail" />

                                <h1 style={styles.title}>{book.volumeInfo.title}</h1>
                                <h4>Author:</h4>
                                <div style={styles.authors}>

                                    {
                                        book.volumeInfo.authors.map(author => {

                                            return (<h4 key={author} style={styles.author}>{author}</h4>)

                                        })
                                    }
                                </div>
                                <div style={styles.buttons}>
                                    <Button variant="outlined" color="inherit" style={styles.button}>
                                        <a rel="noopener noreferrer" target="_blank" style={styles.link} href={book.accessInfo.webReaderLink}>Google Books Link</a>
                                    </Button>
                                    <Button variant="outlined" color="inherit" style={styles.button} onClick={() => this.addBookHandler(book)}>
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
            <Container style={styles.booksSection}>
                {showResults(this.props.books)}
            </Container>
        );

    }
}

export default SearchResults;