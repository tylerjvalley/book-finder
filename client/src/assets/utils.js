import axios from 'axios';

//get from storage
export const getFromStorage = key => {
    if (!key) {
        return null;
    }

    try {
        const valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    } catch(err) {
        return null;
    }
}

//set in storage
export const setInStorage = (key, obj) => {
     if (!key) {
         console.error('Error: key is missing')
     }

     try {
         localStorage.setItem(key, JSON.stringify(obj));
     } catch (err) {
         console.error(err);
     }
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
    axios.post(`/api/books/add-book`, book)
         .then(res => {
             console.log('book added successfully')
         })
         .catch(err => {
             console.log(err);
         })
}


//delete book 
export const deleteBook = (book) => {
    axios.delete(`/api/books/delete/` + book._id)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
//get all books

export const getBooks = () => {
    return axios.get(`/api/books/my-books`)
         .then(res => {
             return res.data;   
         })
         .catch(err => console.log(err));
}



