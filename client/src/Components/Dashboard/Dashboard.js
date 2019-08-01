import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { getBooks } from '../../assets/utils';
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
                            {
                                this.state.books ? 
                                    this.state.books.map(book => {
                                       return ( 
                                            <div key={book._id} className="dashboard-books-container">
                                               <img src={book.book_image} alt="Book thumbnail" />
                                               <h1>{book.book_title}</h1>
                                            </div> 
                                       )
                                    }) : null
                            }
                            

                        </div>

                        <div className="dashboard-progress-books">
                            <h1>In Progress</h1>

                            <div className="books-container">

                            </div>
                        </div>

                        <div className="dashboard-completed-books">
                            <h1>Finished Books</h1>

                            <div className="books-container">
                                
                            </div>
                        </div>
                </div>
            </>
        

        )

    }
}


export default Dashboard;