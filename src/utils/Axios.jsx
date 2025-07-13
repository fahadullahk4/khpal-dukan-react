import axios from "Axios";

const instance = axios.create({
	baseURL: "https://fakestoreapi.com/",
});

export default instance;
