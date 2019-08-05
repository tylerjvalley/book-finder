import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from '../../assets/utils';
import axios from 'axios';
import './Dashboard.scss';


class Dashboard extends Component {

    state = {
        books: [],
    }

    componentDidMount() {
       
       getBooks().then(res => {
            this.setState({ books: res }, () => console.log(this.state.books));
       })  
        
    }

    

    addToInProgress = (selectedBook) => {
       
      
        axios.put('http://localhost:5000/api/books/update/' + selectedBook._id, {
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
        axios.put('http://localhost:5000/api/books/update/' + selectedBook._id, {
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
                            Google Books Link
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
                            Google Books Link
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
                            Google Books Link
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
                        <h1 className="dashboard-title">Dashboard</h1>
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