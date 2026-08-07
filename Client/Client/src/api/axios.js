import axios from "axios";

const API = axios.create({

    baseURL: "https://talentos-vxra.onrender.com/api"

});

export default API;