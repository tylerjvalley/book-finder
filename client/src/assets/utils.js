import axios from 'axios';
import jwt_decode from 'jwt-decode';


//sign up
export const registerUser = (userData, history) => {
    axios.post('http://localhost:5000/api/users/sign-up', userData)
         .then(res => {
             history.push('/dashboard');
             window.location.reload(); //refresh page
            }) //redirect to dashboard on success
         .catch(err => console.log(err))
}


//set auth token
const setAuthToken = token => {
    if (token) {
        //Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        //Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
}

//login
export const loginUser = userData => {
    axios.post('http://localhost:5000/api/users/login', userData)
         .then(res => {
                console.log(res); 
            /*
             //save to local storage

             //set token to local storage 

             const { token } = res.data;
             localStorage.setItem('jwtToken', token);
             //set token to Auth header
             setAuthToken(token);
             const decoded = jwt_decode(token);
             //set current user
             return decoded*/
         })
         .catch(err => {
             console.log(err)
         })
}



//log out
export const logoutUser = () => {
    //remove token from local storage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //set current user to empty object
    return {};
}



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



