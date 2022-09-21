import { AppShell } from '@mantine/core'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import HomeContextProvider, { HomeContext } from '../contexts/HomeContext';
import { useContext } from 'react';
import HomeWrapper from '../components/HomeWrapper';


const Home = () => {
	const { '*': flag } = useParams();
	console.log(flag);

	return (
		<HomeContextProvider currPath={`/${flag}`}>
			<AppShell
				header={<Header />}
				navbar={<Navbar />}
				padding={0}
			>
				{<HomeWrapper flag={flag} />}
			</AppShell>
		</HomeContextProvider>
	)
}

export default Home