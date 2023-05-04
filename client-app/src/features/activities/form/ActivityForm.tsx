import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';

const ActivityForm = () => {
	 const {activityStore} = useStore();
	const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
	const {id} = useParams();
	const navigate = useNavigate();

	const [activity, setActivity] = useState<Activity>({
		id:'',
		title: "",
		description: "",
		category: "",
		date: "",
		city: "",
		venue: "",
	});	

	useEffect(()=>{
		if(id) {
			loadActivity(id).then(actity=>setActivity(actity!));
		}
	},[id, loadActivity])

	const handeSubmitForm = () => {
		if(!activity.id){
			activity.id=uuid();
			createActivity(activity).then(()=> navigate(`/activities/${activity.id}`));
		}
		else{
			updateActivity(activity).then(()=> navigate(`/activities/${activity.id}`));
		}
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		e.preventDefault();
		var { name, value } = e.target;
		setActivity({ ...activity, [name]: value });
	};

	if(loadingInitial) return <LoadingComponent content="Loading activity..." />

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
					as={Link}
					to={activity.id ? `/activities/${id}` : '/activities'}
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
