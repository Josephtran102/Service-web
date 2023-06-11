import { configureStore } from '@reduxjs/toolkit'

const reducer = (state = { projects: [] }, action) => {
	switch (action.type) {
		case 'SET_PROJECTS':
			return { ...state, projects: action.payload }
		default:
			return state
	}
}

const store = configureStore({ reducer })

export default store
