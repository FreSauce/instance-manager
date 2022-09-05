import React from 'react'
import { Group, Navbar as MyNavbar, Text, Divider, Box } from '@mantine/core';
import { AiFillHome, AiFillDashboard } from 'react-icons/ai';
import styled from '@emotion/styled';

const navbarContent = [
	{
		title: 'Home',
		icon: AiFillHome,
		link: '/'
	},
	{
		title: 'DashBoard',
		icon: AiFillDashboard,
		link: '/dashboard'
	}
]

const NavbarButton = styled(Box, {
	shouldForwardProp: (prop) => !['open'].includes(prop)
})(({ open }) => ({
	paddingTop: '10px',
	paddingBottom: '10px',
	display: 'flex',
	justifyContent: open ? 'flex-start' : 'center',
	alignItems: 'center',
	width: '100%',
	paddingLeft: open ? '20px' : '0px',
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: '#0f1015',
		borderLeft: '4px solid #0090e7'
	},
	borderRadius: open ? '0px 30px 30px 0px' : ''
}))

const NavbarButtonIcon = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#22242e',
	borderRadius: '100%',
	padding: '5px'
})

const Navbar = ({ open, setOpen }) => {

	const handleNav = (link) => {
	}

	return (
		<MyNavbar sx={{ height: '100vh', width: open ? '200px' : '65px' }}>
			<MyNavbar.Section sx={{ height: '65px' }} my={10.5}>
				<Text size={25} sx={{ textAlign: 'center', fontWeight: open ? '600' : '700' }}>
					{open ? 'HubDex' : 'H'}
				</Text>
			</MyNavbar.Section>
			<Divider />
			<MyNavbar.Section pt={20}>
				<Group>
					{navbarContent.map((item, index) => (
						<NavbarButton key={index} open={open} onClick={() => handleNav(item.link)}>
							<NavbarButtonIcon>
								<item.icon size={15} />
							</NavbarButtonIcon>
							{open && <Text pl={10}>{item.title}</Text>}
						</NavbarButton>
					))}
				</Group>
			</MyNavbar.Section>
		</MyNavbar>
	)
}

export default Navbar