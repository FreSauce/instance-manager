import styled from '@emotion/styled';
import { AppShell, Box } from '@mantine/core'
import React, { useState } from 'react'
import { Routes, useParams, Route } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Content = styled(Box, {
	shouldForwardProp:
})

const Home = () => {
	const [open, setOpen] = useState(false);
	// const flag = useParams();

	return (
		<AppShell
			header={<Header open={open} setOpen={setOpen} />}
			navbar={<Navbar open={open} setOpen={setOpen} />}
		>
			<Box >
				<Routes>
					<Route path='/' element={<div>Home</div>} />
					<Route path='/dashboard' element={<div>Dashboard</div>} />
				</Routes>
			</Box>
		</AppShell>
	)
}

export default Home