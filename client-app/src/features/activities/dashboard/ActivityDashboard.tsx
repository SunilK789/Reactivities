import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard = () => {
	const {activityStore} = useStore();
	const {loadActivities, activiyRegistory} = activityStore;
		
	useEffect(() => {
		if(activiyRegistory.size <= 1) loadActivities();
	}, [loadActivities]);

	if(activityStore.loadingInitial) return <LoadingComponent content="Loading app" />
	
	return (
		<div>
			<Grid>
				<Grid.Column width='10'>
					<ActivityList />
				</Grid.Column>
                <Grid.Column width='6'>
                  <h2>Activity Filters</h2>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default observer(ActivityDashboard); 
