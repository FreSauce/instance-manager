import React from 'react'
import { Header as MyHeader, Group, Text, Burger, Menu, Avatar, Button } from '@mantine/core';
import styled from '@emotion/styled';
import { AiOutlineLogout, AiFillSetting, AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { useContext } from 'react';
import { HomeContext } from '../contexts/HomeContext';
import { SET_NAVBAR, SET_PAIR_MODAL } from '../utils/constants';

const Profile = styled(Group)({
	paddingRight: '20px',
	textDecoration: 'underline',
	'&:hover': {
		cursor: 'pointer'
	}
})

const CustomizedHeader = styled(MyHeader)({
	minHeight: '61px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	backgroundColor: '#191c24',
	borderBottom: '0px'
})



const Header = () => {
	const { state: { currPath, navbar }, dispatch } = useContext(HomeContext);
	console.log(navbar);

	return (
		<CustomizedHeader>
			<Group sx={{ alignItems: 'center', justifyContent: 'flex-end', width: navbar ? '250px' : '120px' }} pl={5}>
				<Burger
					opened={navbar}
					size={15}
					onClick={() => dispatch({ type: SET_NAVBAR, payload: !navbar })}
					title="Open navigation"
					transitionDuration={0.2}
				/>
			</Group>
			<Group sx={{ justifyContent: 'flex-end' }}>
				{currPath === '/' ?
					<Button variant='outline' mr={20} px={10} onClick={() => dispatch({ type: SET_PAIR_MODAL, payload: true })}>
						<AiOutlinePlus />
						<Text ml={7}>Pair a New Device</Text>
					</Button>
					: null}
				<Menu>
					<Menu.Target>
						<Profile pr={20} sx={{ textDecoration: 'none !important' }}>
							<Avatar radius={20} size={30} color={'inherit'} src={'https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg'} />
							<Text weight={600}>rookievesper</Text>
							<IoIosArrowDown />
						</Profile>
					</Menu.Target>
					<Menu.Dropdown sx={{ width: '150px' }}>
						<Menu.Label sx={{ fontWeight: 600 }}>Account</Menu.Label>
						<Menu.Item icon={<AiFillSetting color='green' />}>
							<Text weight={500}>Profile</Text>
						</Menu.Item>
						<Menu.Item icon={<AiOutlineLogout color='red' />}>
							Logout
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Group>
		</CustomizedHeader>
	)
}

export default Header