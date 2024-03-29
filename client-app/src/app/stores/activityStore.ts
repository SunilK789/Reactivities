import { makeAutoObservable, runInAction } from "mobx";
import { Activity, ActivityFormValues } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/profile";

export default class ActivityStore {
	activiyRegistory = new Map<string, Activity>();
	selectedActivity: Activity | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	get activitiesByDate() {
		return Array.from(this.activiyRegistory.values()).sort(
			(a, b) => b.date!.getTime() - a.date!.getTime()
		);
	}

	get groupedActivities(){
		return Object.entries(
			this.activitiesByDate.reduce((activities, activity)=>{
				const date = format(activity.date!, 'dd MMM yyyy h:mm aa');
				activities[date] = activities[date] ? [...activities[date], activity] : [activity];

				return activities;
			},{} as {[key: string]: Activity[]})
		)
	}

	loadActivities = async () => {
		this.setLoadingInitial(true);

		try {
			const activities = await agent.Activities.list();
			activities.forEach((activity) => {
				this.setActivity(activity);
			});

			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	loadActivity = async (id: string) => {
		this.setLoadingInitial(true);
		let activity = this.getActivity(id);
		if (activity) {
			this.selectedActivity = activity;
			this.setLoadingInitial(false);
			return activity;
		} else {
			try {
				activity = await agent.Activities.details(id);
				this.setActivity(activity);
				runInAction(() => {
					this.selectedActivity = activity;
				});

				this.setLoadingInitial(false);
				return activity;
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	};

	private getActivity = (id: string) => {
		return this.activiyRegistory.get(id);
	};

	private setActivity = (activity: Activity) => {
		var user = store.userStore.user;
		if(user) {
			activity.isGoing = activity.attendees!.some(a=>a.username === user?.username);
			activity.isHost = activity.hostUsername === user.username;
			activity.host= activity.attendees?.find(x=>x.username === activity.hostUsername);
		}
		activity.date = new Date(activity.date!);
		this.activiyRegistory.set(activity.id, activity);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	createActivity = async (activity: ActivityFormValues) => {
		const user = store.userStore.user;
		const attendee= new Profile(user!);
		try {
			activity.id = uuid();
			await agent.Activities.create(activity);
			const newActivity = new Activity(activity);
			newActivity.hostUsername = user?.username;
			newActivity.attendees = [attendee];
			this.setActivity(newActivity);
			runInAction(() => {
				//this.activiyRegistory.set(activity.id, activity);
				this.selectedActivity = newActivity;
			});
		} catch (error) {
			console.log(error);
		}
	};

	updateActivity = async (activity: ActivityFormValues) => {
		try {
			await agent.Activities.update(activity);
			runInAction(() => {
				if(activity.id){
					let updatedActivity ={...this.getActivity(activity.id),...activity}
					this.activiyRegistory.set(activity.id, updatedActivity as Activity);
					this.selectedActivity = updatedActivity as Activity;
				}				
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	deleteActivity = async (id: string) => {
		this.loading = true;

		try {
			await agent.Activities.delete(id);
			runInAction(() => {
				this.activiyRegistory.delete(id);
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateAttendance = async ()=>{
		const user = store.userStore.user;
		this.loading = true;

		try {
			await agent.Activities.attend(this.selectedActivity!.id);
			runInAction(()=>{
				if(this.selectedActivity?.isGoing){
					this.selectedActivity.attendees = 
						this.selectedActivity.attendees?.filter(a=>a.username !== user?.username);

					this.selectedActivity.isGoing = false;
				}else{
					const attendee = new Profile(user!);
					this.selectedActivity?.attendees?.push(attendee);
					this.selectedActivity!.isGoing = true;
				}

				this.activiyRegistory.set(this.selectedActivity!.id, this.selectedActivity!);
			})
		} catch (error) {
			
		}finally{
			runInAction(() => this.loading = false);
		}
	}

	cancelActivityToggle = async () =>{
			this.loading = true;
			try {
				await agent.Activities.attend(this.selectedActivity!.id);
				runInAction(()=>{
					this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
					this.activiyRegistory.set(this.selectedActivity!.id, this.selectedActivity!);
				});
			} catch (error) {
				console.log(error);
			}finally{
				runInAction(()=> this.loading = false);
			}
	}

	clearSelectedActivity = () => {
		this.selectedActivity = undefined;
	}

}
