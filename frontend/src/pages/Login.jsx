import { Container, Grid, Box, TextInput, PasswordInput, Button, Text } from '@mantine/core'
import { useForm } from '@mantine/form';
import React from 'react'
import img from '../assets/img/img.jpg';
import validator from 'validator';

const Login = () => {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: (value) => validator.isEmail(value) ? null : 'Invalid Email',
			password: (value) => value.length > 8 ? null : 'Password must be at least 8 characters long'
		}
	});

	const handleSubmit = (event) => {
		event.preventDefault();

	}

	return (
		<div style={{ height: 'inherit' }}>
			<Grid sx={{ height: '100%', width: '100%' }} m={0}>
				<Grid.Col span={6} sx={{ backgroudColor: '#23272e' }}>
					<Container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Box sx={{ width: '70%', backgroundColor: '#23272e', borderRadius: '10px' }} p={20}>
							<form onSubmit={handleSubmit}>
								<Text mb={10} size={25} sx={{ fontWeight: '600' }}>Login</Text>
								<TextInput
									mb={10}
									withAsterisk
									label='Email'
									placeholder='urmom@gmail.com'
									{...form.getInputProps('email')}
								/>
								<PasswordInput
									mb={10}
									withAsterisk
									label='Password'
									placeholder='********'
									{...form.getInputProps('password')}
								/>
								<Button type='submit' mt={10}>
									Login
								</Button>
							</form>
						</Box>
					</Container>
				</Grid.Col>
				<Grid.Col span={6} p={0} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
					<img src={img} style={{ height: '100%', width: '-webkit-fill-available' }} alt={'login-img'} />
				</Grid.Col>
			</Grid>
		</div>
	)
}

export default Login