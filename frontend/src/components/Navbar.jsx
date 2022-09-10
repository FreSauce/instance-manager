import React from 'react'
import { Group, Navbar as MyNavbar, Text, Divider, Box, Avatar, Tooltip } from '@mantine/core';
import { AiFillHome, AiFillDashboard } from 'react-icons/ai';
import styled from '@emotion/styled';

const defaultNavbarContent = [
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
	paddingTop: '6px',
	paddingBottom: '6px',
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
	borderRadius: '0px 30px 30px 0px'
}))

const NavbarButtonIcon = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#22242e',
	borderRadius: '50%',
	padding: '5px',
})

const Navbar = ({ open, setOpen }) => {
	const [navbarContent, setNavbarContent] = React.useState(defaultNavbarContent);

	const handleNav = (link) => {
	}

	return (
		<MyNavbar sx={{ height: '100vh', width: open ? '200px' : '65px', backgroundColor: '#191c24', borderRight: '0px' }}>
			<MyNavbar.Section sx={{ height: '65px' }} my={10.5}>
				<Text size={25} sx={{ textAlign: 'center', fontWeight: open ? '600' : '700' }}>
					{open ? 'HubDex' : 'H'}
				</Text>
			</MyNavbar.Section>
			<MyNavbar.Section pt={5} sx={{ height: 'calc(100vh - 65px)' }}>
				<NavbarButton open={open}>
					<NavbarButtonIcon>
						<Avatar radius={20} size={25} src={'https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg'} />
					</NavbarButtonIcon>
				</NavbarButton>
			</MyNavbar.Section>
			<MyNavbar.Section pt={10}>
				<Group spacing={8}>
					{navbarContent.map((item, index) => (
						<Tooltip position='right-end' label={item.title}>
							<NavbarButton key={index} open={open} onClick={() => handleNav(item.link)}>
								<NavbarButtonIcon>
									<item.icon size={16} />
								</NavbarButtonIcon>
								{open && <Text pl={10}>{item.title}</Text>}
							</NavbarButton>
						</Tooltip>
					))}
				</Group>
			</MyNavbar.Section>
		</MyNavbar>
	)
}

export default Navbar