import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityForm = () => {
	 const {activityStore} = useStore();
	const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

	var initialState = selectedActivity ?? {
    	id:'',
		title: "",
		description: "",
		category: "",
		date: "",
		city: "",
		venue: "",
	};

	const [activity, setActivity] = useState(initialState);

	const handeSubmitForm = () => {
		activity.id 
		? updateActivity(activity) 
		: createActivity(activity);
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		e.preventDefault();
		var { name, value } = e.target;
		setActivity({ ...activity, [name]: value });
	};

	return (
		<>
			<Form onSubmit={handeSubmitForm}>
				<Form.Input
					placeholder='Title'
					value={activity.title}
					name='title'
					onChange={handleInputChange}
				/>
				<Form.TextArea
					placeholder='Description'
					value={activity.description}
					name='description'
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder='Category'
					value={activity.category}
					name='category'
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder='Date'
					value={activity.date}
					name='date'
					onChange={handleInputChange}
					type="date"
				/>
				<Form.Input
					placeholder='City'
					value={activity.city}
					name='city'
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder='Venue'
					value={activity.venue}
					name='venue'
					onChange={handleInputChange} 
				/>

				<Button loading={loading} floated='right' positive type='submit' content='Submit' />
				<Button
					onClick={closeForm}
					floated='right'
					basic
					type='submit'
					content='Cancel'
				/>
			</Form>
		</>
	);
};

export default observer(ActivityForm);