import { useContext, useState } from 'react'
import { Modal, Stepper, Group, Button, TextInput } from '@mantine/core';
import { HomeContext } from '../contexts/HomeContext';
import { SET_PAIR_MODAL } from '../utils/constants';
import { useForm } from '@mantine/form';

const PairDevice = () => {
	const { state: { pairModal }, dispatch } = useContext(HomeContext);
	const [active, setActive] = useState(0);
	const form = useForm({
		validateInputOnChange: true,
		initialValues: {
			deviceId: ''
		},
		validate: {
			deviceId: (value) => value !== '' ? null : 'Provide a Valid Device Id',
		}
	})

	const nextButton = () => {
		setActive(prev => {
			if (prev === 1) {
				if (form.isValid()) return prev + 1;
				else {
					form.setErrors();
					return prev;
				}
			} return prev < 3 ? prev + 1 : prev;
		});
	}

	return (
		<Modal
			centered='vertical'
			opened={pairModal}
			onClose={() => dispatch({ type: SET_PAIR_MODAL, payload: false })}
			size='lg'
		>
			<Stepper active={active} breakpoint="sm">
				<Stepper.Step label="New Device">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque quia earum laborum iure ex dolorum doloribus, expedita, ipsum iste unde atque deleniti! Necessitatibus quam fugit rem, tempore ullam nesciunt nam?
				</Stepper.Step>
				<Stepper.Step label="Second step" description="Verify email">
					<form>
						<TextInput
							mb={13}
							withAsterisk
							label='Device ID'
							{...form.getInputProps('deviceId')}
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
				<Button variant="default" onClick={() => setActive((current) => (current > 0 ? current - 1 : current))}>Back</Button>
				<Button onClick={nextButton}>Next step</Button>
			</Group>
		</Modal>
	);
}

export default PairDevice