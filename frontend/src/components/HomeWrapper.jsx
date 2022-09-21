import { useContext } from 'react';
import { Box } from '@mantine/core';
import HomeLayout from '../layouts/Home';
import Dashboard from '../layouts/Dashboard';
import { HomeContext } from '../contexts/HomeContext';

const HomeWrapper = ({ children, flag }) => {
	const { state: { navbar } } = useContext(HomeContext);


	const getLayout = () => {
		switch (flag) {
			case '':
				return <HomeLayout />;
			case 'dashboard':
				return <Dashboard />;
			default:
				return <HomeLayout />;
		}
	}
	return (
		<Box ml={navbar ? 200 : 65} mt={66} sx={{ minHeight: 'calc(100vh - 61px)', backgroundColor: '#000000', transition: '.2s' }}>
			{getLayout()}
			{children}
		</Box>
	)
}

export default HomeWrapper