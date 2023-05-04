import { Card, Image, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { link } from "fs";

const ActivityDetails = () => {
	const { activityStore } = useStore();
	const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const {id} = useParams();

  useEffect(()=>{
    if(id) loadActivity(id);
  },[id,loadActivity])

	if (loadingInitial || !activity) return <LoadingComponent />;

	return (
		<Card fluid>
			<Image src={`/assests/categoryImages/${activity.category}.jpg`} />
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span className='date'>{activity.date}</span>
				</Card.Meta>
				<Card.Description>{activity.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths='2'>
					<Button as={Link} to={`/manage/${id}`} basic color='blue' content='Edit' />
					<Button as={Link} to={'/activities'} basic content='Cancel' />
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default observer(ActivityDetails);
