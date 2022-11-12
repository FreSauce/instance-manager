import { Container, Grid, Box } from '@mantine/core'
import React, { useState } from 'react'
import DeviceCard from '../components/DeviceCard'
import PairDevice from '../components/PairDevice'
import DeviceInfo from './DeviceInfo'

const devices = [
	{ name: 'urmom', id: '1', type: 'laptop', status: 'online', lastSeen: '1 minute ago' },
	{ name: 'urmom', id: '2', type: 'laptop', status: 'online', lastSeen: '1 minute ago' },
	{ name: 'urmom', id: '2', type: 'laptop', status: 'online', lastSeen: '1 minute ago' },
	{ name: 'urmom', id: '2', type: 'laptop', status: 'online', lastSeen: '1 minute ago' },
]

const Home = () => {
	const [selected, setSelected] = useState(0);

	return (
		<Container mx={0} className='my_container' sx={{ maxWidth: 'inherit', minHeight: 'inherit' }}>
			<Grid grow>
				<Grid.Col span={8} mt={10}>
					<Grid gutter={20}>
						{devices.map((device, index) => (
							<Grid.Col span={4} key={index}>
								<DeviceCard device={device} />
							</Grid.Col>
						))}
					</Grid>
				</Grid.Col>
				<Grid.Col my={10} span={4} sx={{ backgroundColor: '#191c24', borderRadius: '10px' }}>
					<DeviceInfo device={devices[selected]} />
				</Grid.Col>
			</Grid>
			<PairDevice />
		</Container>
	)
}

export default Home