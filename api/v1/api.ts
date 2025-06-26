import axios from "axios";

export const apiusers = axios.create({
    baseURL: "http://localhost:3000", //поменять

})

