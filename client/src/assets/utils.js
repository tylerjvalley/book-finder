import axios from 'axios';
//import jwt_decode from "jwt-decode";

/*
//authorization token
const setAuthToken = token => {
    if (token) {
        //Apply auth token to every request if logged in
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        //Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};



const setCurrentUser = user => {
    
}

*/

//sign up
export const registerUser = (userData, history) => {
    axios.post('http://localhost:5000/api/users/sign-up', userData)
         .then(res => {
             history.push('/dashboard');
             window.location.reload(); //refresh page
            }) //redirect to dashboard on success
         .catch(err => console.log(err))
}


//login
/*
export const loginUser = userData => {
    axios.post('/api/users/login', userData)
         .then(res => {
             //Save to local storage

             //set token to localStorage
             const { token } = res.data;
             localStorage.setItem('jwtToken', token);
             //set token to Auth header
             setAuthToken(token);
             //decode token to get user data
             const decoded = jwt_decode(token);
             //set current user
             
         })
}
*/


//add a book

export const addBook = (book) => {
    axios.post('http://localhost:5000/api/books/add-book', book)
         .then(res => {
             console.log('book added successfully')
         })
         .catch(err => {
             console.log(err);
         })
}


//delete book 
export const deleteBook = (book) => {
    axios.delete('http://localhost:5000/api/books/delete/' + book._id)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
//get all books

export const getBooks = () => {
    return axios.get('http://localhost:5000/api/books/my-books')
         .then(res => {
             return res.data;   
         })
         .catch(err => console.log(err));
}


