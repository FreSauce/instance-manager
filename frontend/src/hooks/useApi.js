import axios from "axios";

const useApi = () => {
	const api = axios.create({});
	const privateApi = axios.create({});

	privateApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("BearerToken")}`;


	return { api, privateApi };
}

export default useApi;