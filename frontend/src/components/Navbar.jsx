import React from 'react'
import { Group, Navbar as MyNavbar, Text, Box, Avatar, Tooltip, Grid, Menu } from '@mantine/core';
import { AiFillHome, AiFillDashboard } from 'react-icons/ai';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout, AiFillSetting } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io'


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
	shouldForwardProp: (prop) => !['open', 'active', 'flag'].includes(prop)
})(({ open, active, flag }) => ({
	paddingTop: '6px',
	paddingBottom: '6px',
	display: 'flex',
	justifyContent: open ? 'flex-start' : 'center',
	alignItems: 'center',
	width: '100%',
	paddingLeft: open ? '20px' : '0px',
	backgroundColor: active ? '#0f1015' : '',
	borderLeft: active ? '4px solid #0090e7' : '',
	'&:hover': {
		cursor: !flag ? 'pointer' : '',
		backgroundColor: !flag ? '#0f1015' : '',
	},
	borderRadius: '0px 30px 30px 0px'
}))

const NavbarButtonIcon = styled(Box, {
	shouldForwardProp: (prop) => !['pad'].includes(prop)
})(({ pad }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#22242e',
	borderRadius: '50%',
	padding: `${pad}px`
}))

const Navbar = ({ open, setOpen, curPath }) => {
	const [navbarContent, setNavbarContent] = React.useState(defaultNavbarContent);
	const nav = useNavigate();

	const handleNav = (link) => {
		nav(`${link}`, { replace: true });
	}

	return (
		<MyNavbar sx={{ height: '100vh', width: open ? 200 : 65, backgroundColor: '#191c24', borderRight: 0, transition: '.2s' }}>
			<MyNavbar.Section sx={{ height: 65 }} my={10.5}>
				<Text size={25} sx={{ textAlign: 'center', fontWeight: open ? '600' : '700' }}>
					{open ? 'HubDex' : 'H'}
				</Text>
			</MyNavbar.Section>
			<MyNavbar.Section pt={5} sx={{ height: 'calc(100vh - 65px)' }}>
				<Menu>
					<Menu.Target>
						<NavbarButton flag={true} open={open}>
							<NavbarButtonIcon>
								<Avatar radius={20} size={40} src={'https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg'} />
							</NavbarButtonIcon>
							{open ? <Grid grow>
								<Grid.Col ml={15} span={6}>
									<Text weight={600}>rookievesper</Text>
									<Text size={10} color={'light-gray'}>Gold Member</Text>
								</Grid.Col>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									{/* <IoIosArrowForward /> */}
								</Box>
							</Grid> : null
							}
						</NavbarButton>
					</Menu.Target>
					<Menu.Dropdown sx={{ width: '150px' }}>
						<Menu.Label>Account</Menu.Label>
						<Menu.Item icon={<AiFillSetting color='green' />}>
							Profile
						</Menu.Item>
						<Menu.Item icon={<AiOutlineLogout color='red' />}>
							Logout
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</MyNavbar.Section>
			<MyNavbar.Section pt={10}>
				<Group spacing={8}>
					{navbarContent.map((item, index) => (
						<Tooltip key={index} position='right-end' label={item.title} disabled={open}>
							<NavbarButton open={open} active={item.link === curPath} onClick={() => handleNav(item.link)}>
								<NavbarButtonIcon pad={6}>
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