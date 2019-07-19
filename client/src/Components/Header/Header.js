import React, { Component } from 'react';
import SearchForm from './SearchForm/SearchForm';
import axios from 'axios';




class Header extends Component {

    state = {
        search: '',
        books: [],
    }

    componentDidMount() {
       

    }

    handleSearchInput = (e) => {
        this.setState({search: e.target.value})
    }

    handleSubmit = () => {
        
    }


    render() {

        return (
            <>
            <SearchForm search={this.handleSearchInput}
                        submit={this.handleSubmit} /> 

            {this.state.books.map(book => {
                return (
                    <div style={{background: 'white'}} key={book.id}>
                        <h4>{book.id}</h4>
                        <h1>{book.book}</h1>
                    </div>
                )
            })}

            </>

            
        )
    }
}


export default Header;