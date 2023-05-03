import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
	activities: Activity[];
	selectedActivity: Activity | undefined;
	selectActivity: (id: string) => void;
	cancelActivity:()=>void;
	formOpen: (id: string) => void;
	formClose: () =>void;
	editMode:boolean;
	createOrEdit:(activity : Activity)=> void;
	deleteActivity:(id: string)=>void;
	submitting:boolean;
}
const ActivityDashboard = ({ activities,selectedActivity,
	selectActivity,cancelActivity,
	formOpen, formClose, editMode, createOrEdit,deleteActivity,submitting }: Props) => {

	return (
		<div>
			<Grid>
				<Grid.Column width='10'>
					<ActivityList 
						activities={activities}
						selectActivity={selectActivity}
						deleteActivity={deleteActivity}
						submitting={submitting}
					></ActivityList>
				</Grid.Column>
                <Grid.Column width='6'>
                    {selectedActivity && !editMode &&
					<ActivityDetails 
						activity={selectedActivity} 
						cancelActivity={cancelActivity}
						formOpen={formOpen}
					/>                   
                    }
					{editMode && 
                    <ActivityForm 
						activity={selectedActivity} 
						formClose={formClose} 
						createOrEdit={createOrEdit}
						submitting={submitting}
					/>}
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default ActivityDashboard;
