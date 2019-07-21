import React, { Component } from 'react';
import SearchForm from '../../Components/SearchForm/SearchForm';
import SearchResults from '../../Components/SearchResults/SearchResults';
import axios from 'axios';
import { apiKey, bookSearchUrl } from '../../assets/assets';
import axiosCancel from 'axios-cancel';

axiosCancel(axios, {
    debug: false
});


class Main extends Component {

    state = {
        search: '',
        books: [],
    }

    handleSearchInput = (e) => {
        this.setState({search: e.target.value})
    }

    handleSubmit = () => {
        const request = `${bookSearchUrl}${this.state.search}&key=${apiKey}`
        axios.get(request)
        .then(res => {
            this.setState({books: res.data.items}, () => console.log(this.state.books) )
        })
        .catch(thrown => {
            if (axios.isCancel(thrown)) {
                console.log(thrown);
            } else {
                console.log('another reason')
            }
            
        })

    }
    

    render() {

        return (
            <>
            <SearchForm search={this.handleSearchInput}
                        submit={this.handleSubmit} /> 
            
            <SearchResults books={this.state.books}/>
            
        

            </>

            
        )
    }
}


export default Main;