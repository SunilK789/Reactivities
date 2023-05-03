import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { escape } from "querystring";

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined);

	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	const handleSelectActivity = (id: string) => {
		setSelectedActivity(activities.find((x) => x.id === id));
	};

	const handleCancelActivity = () => {
		setSelectedActivity(undefined);
	};

	const handleFormOpen = (id?: string) => {
		id ? handleSelectActivity(id) : handleCancelActivity();
		setEditMode(true);
	};

	const handleCloseFrom = () => {
		setEditMode(false);
	};

	const createOrEdit = (activity: Activity) => {
		setSubmitting(true);
		if(activity.id){
			agent.Activities.update(activity).then(()=>{
				setActivities([
					...activities.filter((x) => x.id !== activity.id),
					activity,
			  ]);
			  setSelectedActivity(activity);
			  setEditMode(false);
			  setSubmitting(false);
			})
		}
		else{
			activity.id = uuid();
			agent.Activities.create(activity).then(()=>{
				setActivities([...activities, activity]);
			 	setSelectedActivity(activity);
			  	setEditMode(false);
			  	setSubmitting(false);
			})		
		}
	};

	const handleDeleteActivity = (id: string) => {
		setSubmitting(true);
		agent.Activities.delete(id).then(()=>{
			setActivities([...activities.filter((x) => x.id !== id)]);
			setSubmitting(false);
		})
		
	};

	useEffect(() => {
		agent.Activities.list().then((response) => {
			let activities: Activity[]=[];
			response.forEach((activity) => {
				activity.date = activity.date.split("T")[0];
				activities.push(activity);
			});
			setActivities(activities);
			setLoading(false);
		});
	}, []);

	if(loading) return <LoadingComponent content="Loading app" />

	return (
		<>
			<NavBar formOpen={handleFormOpen}></NavBar>
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					activities={activities}
					selectedActivity={selectedActivity}
					selectActivity={handleSelectActivity}
					cancelActivity={handleCancelActivity}
					formOpen={handleFormOpen}
					formClose={handleCloseFrom}
					editMode={editMode}
					createOrEdit={createOrEdit}
					deleteActivity={handleDeleteActivity}
					submitting={submitting}
				></ActivityDashboard>
			</Container>
		</>
	);
}

export default App;
