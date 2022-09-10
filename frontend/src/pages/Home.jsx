import styled from '@emotion/styled';
import { AppShell, Box } from '@mantine/core'
import React, { useState } from 'react'
import { Routes, useParams, Route } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import HomeLayout from '../layouts/Home';
import Dashboard from '../layouts/Dashboard';

// const Content = styled(Box, {
// 	shouldForwardProp:
// })

const Home = () => {
	const [open, setOpen] = useState(false);
	// const flag = useParams();

	return (
		<AppShell
			header={<Header open={open} setOpen={setOpen} />}
			navbar={<Navbar open={open} setOpen={setOpen} />}
			padding={0}
		>
			<Box mt={61} sx={{ minHeight: 'calc(100vh - 61px)' }}>
				<Routes>
					<Route path='/' element={<HomeLayout />} />
					<Route path='/dashboard' element={<Dashboard />} />
				</Routes>
			</Box>
		</AppShell>
	)
}

export default Home