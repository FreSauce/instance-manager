import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'

const PrivateOutlet = () => {
	const { token } = useContext(AuthContext);

	return (
		token ? <Outlet /> : <Navigate to={'/login'} />
	)
}

export default PrivateOutlet