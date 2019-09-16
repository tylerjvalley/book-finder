import React, { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../../Components/SearchResults/SearchResults';
import axios from 'axios';
import { apiKey, bookSearchUrl } from '../../assets/assets';
import { animateScroll as scroll } from 'react-scroll'


class Main extends Component {

    state = {
        search: '',
        books: [],
        isLoading: false,
        error: ''
    }

    // automatically scroll down 700px when search results are rendered
    scrollTo = () => {
        scroll.scrollTo(700);
    }

  
    handleSearchInput = (e) => {
        this.setState({search: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ isLoading: true });

        if (this.state.search) {
            
        
            const request = `${bookSearchUrl}${this.state.search}&key=${apiKey}`;
            let isValid = true;

            axios.get(request)
            .then(res => {
                res.data.items.forEach(item => {
                    if (!item.volumeInfo.authors) {
                        isValid = false;
                    }
                    
                })

                //check for valid search based on if the searched book has authors.
                if (isValid) {
                    this.setState({ 
                        isLoading: false,
                        books: res.data.items,
                        error: '',
                    })
                    
                    this.scrollTo();
                } else {
                    this.setState({
                        isLoading: false,
                        error: 'No results found'
                    })
                }
            
            
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    error: 'No results found'
                })          
            });

        } else {
            this.setState({
                isLoading: false,
                error: 'Try actually typing in something'
            })
        }

    }
    

    render() {

        return (
            <>
            <SearchForm search={this.handleSearchInput}
                        submit={this.handleSubmit}
                        error={this.state.error}
                        loading={this.state.isLoading} 
                        /> 


            <SearchResults books={this.state.books}/>
      
      
        

            </>

            
        )
    }
}


export default Main;