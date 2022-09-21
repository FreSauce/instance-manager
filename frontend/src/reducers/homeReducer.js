import { SET_CUR_PATH, SET_NAVBAR, SET_PAIR_MODAL } from "../utils/constants";


const homeReducer = (state, action) => {
	switch (action.type) {
		case SET_CUR_PATH:
			return { ...state, currPath: action.payload };
		case SET_NAVBAR:
			return { ...state, navbar: action.payload };
		case SET_PAIR_MODAL:
			return { ...state, pairModal: action.payload };
		default:
			return state;
	}
}

export default homeReducer;