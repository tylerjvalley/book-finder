import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { getBooks, getFromStorage, deleteBook } from '../../assets/utils';
import axios from 'axios';
import './Dashboard.scss';


class Dashboard extends Component {

    state = {
        books: [],
        currentUser: '',
        token: '', 
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
                        });

                        //get current user by id
                        axios.get(`/api/users/${res.data.id[0].userId}`)
                            .then(user => {
                                this.setState({ currentUser: user.data.firstName });
                                getBooks().then(res => {
                                    const validBooks = [];
                                    res.forEach(book => {
                                        if (book.userId === user.data._id) {
                                            validBooks.push(book);
                                        }
                                    })

                                    //only add books with unique titles so users don't add the same book twice.
                                    const seen = new Set();
                                    
                                    const results = validBooks.filter(el => {
                                        const duplicate = seen.has(el.book_title);
                                        seen.add(el.book_title)
                                        return !duplicate
                                    })
                                    
                                    //set results in state
                                    this.setState({ books: results });
                                    
                                })
                                    .catch(err => {
                                        console.log(err)
                                    })
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

    

    addToInProgress = (selectedBook) => {
       
      
        axios.put(`/api/books/update/` + selectedBook._id, {
            book_in_progress: true
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

        window.location.reload(true);
            
            
    }

    addToCompleted = (selectedBook) => {
        axios.put(`/api/books/update/` + selectedBook._id, {
            book_completed: true
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

        window.location.reload(true);
    }

    deleteBook = (book) => {
        deleteBook(book);
        window.location.reload(true);
    }

    renderBookshelf = (books) => {
        let items = [];
        books.forEach(book => {
            if (!book.book_in_progress && !book.book_completed) {
                items.push(
                    <div key={book._id} className="dashboard-books-container">
                        <img src={book.book_image} alt="Book thumbnail" />
                        <h1>{book.book_title}</h1>
                        <Button onClick={() => this.addToInProgress(book)} variant="outlined" color="inherit" style={{
                            border: '1px solid white',
                            color: 'white',
                        }}>
                            Add to In Progress
                            </Button>
                        <Button variant="outlined" color="inherit" style={{
                            border: '1px solid white',
                            color: 'white',
                        }}>
                            <a rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none', color: 'white' }} href={book.book_link}>Google Books Link</a>
                            </Button>
                        <IconButton onClick={() => this.deleteBook(book)} aria-label="delete">
                            <DeleteIcon style={{ color: 'white' }} />
                        </IconButton>

                    </div>
                )
            }
        })
        return items;

    }

    renderInProgress = (books) => {
        let items = [];

        books.forEach(book => {
            if (book.book_in_progress) {
                items.push(
                    <div key={book._id} className="dashboard-books-container">
                        <img src={book.book_image} alt="Book thumbnail" />
                        <h1>{book.book_title}</h1>
                        <Button onClick={() => this.addToCompleted(book)} variant="outlined" color="inherit" style={{
                            border: '1px solid white',
                            color: 'white',
                        }}>
                            Add to Completed
                            </Button>
                        <Button variant="outlined" color="inherit" style={{
                            border: '1px solid white',
                            color: 'white',
                        }}>
                            <a rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none', color: 'white' }} href={book.book_link}>Google Books Link</a>
                            </Button>
                        <IconButton onClick={() => this.deleteBook(book)} aria-label="delete">
                            <DeleteIcon style={{ color: 'white' }} />
                        </IconButton>

                    </div>
                )
            }
        })
        return items;
    }

    renderCompleted = (books) => {
        let items = [];
        books.forEach(book => {
            if (book.book_completed) {
                items.push(
                    <div key={book._id} className="dashboard-books-container">
                        
                        <img src={book.book_image} alt="Book thumbnail" />
                        <h1>{book.book_title}</h1>
                        <Button variant="outlined" color="inherit" style={{
                            border: '1px solid white',
                            color: 'white',
                        }}>
                            <a rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none', color: 'white' }} href={book.book_link}>Google Books Link</a>
                            </Button>
                        <IconButton onClick={() => this.deleteBook(book)} aria-label="delete">
                            <DeleteIcon style={{color: 'white'}}/>
                        </IconButton>

                    </div>
                )
            }
        })
        return items;

    }

    

    render() {

        return (
            <>
                <div className="dashboard-top">
                    <div className="dashboard-title-container">
                        <h1 className="dashboard-title">{this.state.currentUser}'s Dashboard</h1>
                    </div>
                    <div className="dashboard-button-container">
                        <Link to="/"><Button variant="outlined" color="inherit" style={{
                            border: '1px solid white',
                            color: 'white',
                            position: 'absolute',
                            top: '5%',
                            left: '2%'}}>
                            Back to Home
                        </Button></Link>
                    </div>
                </div>

                <div className="dashboard-main-container">
                        <div className="dashboard-wishlist">
                            <h1>Book Shelf</h1>

                            <div className="books-container">
                                {this.renderBookshelf(this.state.books)}
                            </div>

                        </div>

                        <div className="dashboard-progress-books">
                            <h1>In Progress</h1>

                            <div className="books-container">
                            {this.renderInProgress(this.state.books)}
                            </div>

                        </div>

                        <div className="dashboard-completed-books">
                            <h1>Finished Books</h1>

                            <div className="books-container">
                                {this.renderCompleted(this.state.books)}   
                            </div>
                        </div>
                </div>
            </>
        

        )

    }
}


export default Dashboard;