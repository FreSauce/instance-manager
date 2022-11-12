import { useContext, useState } from 'react'
import { Modal, Stepper, Group, Button, TextInput } from '@mantine/core';
import { HomeContext } from '../contexts/HomeContext';
import { SET_PAIR_MODAL } from '../utils/constants';
import { useForm } from '@mantine/form';

const PairDevice = () => {
	const { state: { pairModal }, dispatch } = useContext(HomeContext);
	const [active, setActive] = useState(0);
	const form = useForm({
		// validateInputOnChange: true,
		initialValues: {
			deviceId: '',
			deviceName: ''
		},
		validate: {
			deviceId: (value) => (value !== '' ? null : 'Provide a Valid Device Id'),
			deviceName: (value) => (value !== '' ? null : 'Device Name should be valid')
		}
	})

	const handleSubmit = (values, event) => {
		form.validate();
		console.log(values);
		setActive(2);
	}

	const closeModal = () => {
		setActive(0);
		form.clearErrors();
		dispatch({ type: SET_PAIR_MODAL, payload: false });
	}

	const nextAction = () => {
		if (active === 1) handleSubmit();
		else if (active === 2) closeModal();
		else setActive((current) => (current < 3 ? current + 1 : current));
	}

	return (
		<Modal
			centered='vertical'
			opened={pairModal}
			onClose={closeModal}
			size='lg'
		>
			<Stepper active={active} breakpoint="sm">
				<Stepper.Step label="New Device">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque quia earum laborum iure ex dolorum doloribus, expedita, ipsum iste unde atque deleniti! Necessitatibus quam fugit rem, tempore ullam nesciunt nam?
				</Stepper.Step>
				<Stepper.Step label="Second step" description="Verify email">
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput
							mb={13}
							withAsterisk
							label='Device ID'
							{...form.getInputProps('deviceId')}
						/>
						<TextInput
							mb={13}
							withAsterisk
							label='Device Name'
							{...form.getInputProps('deviceName')}
						/>
					</form>
				</Stepper.Step>
				<Stepper.Step label="Final step" description="Get full access">
					Step 3 content: Get full access
				</Stepper.Step>
				<Stepper.Completed>
					Completed, click back button to get to previous step
				</Stepper.Completed>
			</Stepper>
			<Group position="center" mt="xl">
				{active < 2 ?
					<Button variant="default" onClick={() => setActive((current) => (current > 0 ? current - 1 : current))}>Back</Button>
					: null
				}
				<Button onClick={nextAction}>{active < 2 ? 'Next step' : 'Close'}</Button>
			</Group>
		</Modal>
	);
}

export default PairDevice