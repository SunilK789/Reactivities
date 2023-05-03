import React, { useEffect, useState } from "react";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
	const {activityStore} = useStore();
	const [activities, setActivities] = useState<Activity[]>([]);

	const handleDeleteActivity = (id: string) => {		
		agent.Activities.delete(id).then(()=>{
			setActivities([...activities.filter((x) => x.id !== id)]);			
		})
		
	};

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	if(activityStore.loading) return <LoadingComponent content="Loading app" />

	return (
		<>
			<NavBar></NavBar>			
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					activities={activityStore.activities}					
					deleteActivity={handleDeleteActivity}					
				></ActivityDashboard>
			</Container>
		</>
	);
}

export default observer(App);
