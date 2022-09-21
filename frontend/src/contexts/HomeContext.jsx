import { createContext, useReducer } from "react";
import { defaultHomeState } from "../utils/constants";
import homeReducer from "../reducers/homeReducer";

export const HomeContext = createContext({ ...defaultHomeState });

const HomeContextProvider = ({ children, currPath }) => {

	const [state, dispatch] = useReducer(homeReducer, { ...defaultHomeState, currPath });

	return (<HomeContext.Provider value={{ state, dispatch }}>
		{children}
	</HomeContext.Provider>
	)
}

export default HomeContextProvider;