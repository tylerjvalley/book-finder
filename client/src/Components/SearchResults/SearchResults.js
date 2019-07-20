import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';








const useStyles = makeStyles({

    

});

function SearchResults(props) {
    const classes = useStyles();
    return (
        <div className="books-section">

            {

                props.books.map(book => {

                    return (
                        <div className="search-item" key={book.id}>
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book thumbnail" />
                            <h1>{book.volumeInfo.title}</h1>
                            <h4>{book.volumeInfo.author}</h4>
                        </div>
                    )

                })

            }
        </div>
    );
}

export default SearchResults;