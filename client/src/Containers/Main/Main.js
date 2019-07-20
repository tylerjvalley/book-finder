import React, { Component } from 'react';
import SearchForm from '../../Components/SearchForm/SearchForm';
import SearchResults from '../../Components/SearchResults/SearchResults';
import axios from 'axios';
import { apiKey, bookSearchUrl } from '../../assets/assets';




class Main extends Component {

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
        axios.get(bookSearchUrl + this.state.search + `&key=${apiKey}`)
            .then(res => {
                this.setState({books: res.data.items}, () => console.log(this.state.books) )
            })
            .catch(err => {
                console.log(err);
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