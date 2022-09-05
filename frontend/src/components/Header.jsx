import React from 'react'
import { Header as MyHeader, Group, Text, Burger, Menu, Avatar } from '@mantine/core';
import styled from '@emotion/styled';
import { AiOutlineLogout, AiFillSetting } from 'react-icons/ai';

const Profile = styled(Group)({
	paddingRight: '20px',
	textDecoration: 'underline',
	'&:hover': {
		cursor: 'pointer'
	}
})


const Header = ({ open, setOpen }) => {
	return (
		<MyHeader sx={{ minHeight: '61px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<Group sx={{ alignItems: 'center', justifyContent: 'flex-end', width: open ? '250px' : '120px' }} pl={10}>
				<Burger
					opened={open}
					onClick={() => setOpen(prev => !prev)}
					title="Open navigation"
				/>
			</Group>
			<Group sx={{ justifyContent: 'flex-end' }}>
				<Menu>
					<Menu.Target>
						<Profile pr={20} sx={{}}>
							<Avatar color={'inherit'} />
							<Text>RookieVesper</Text>
						</Profile>
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
			</Group>
		</MyHeader>
	)
}

export default Header