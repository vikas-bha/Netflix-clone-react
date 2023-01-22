import axios from "axios";

const instance = axios.create({
    baseURL:  "https://api.themoviedb.org/3"
})

export default instance;

// when we have default export the only component that is exported default can be imported by any name in the other file