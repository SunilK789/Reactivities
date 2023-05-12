import React, { useEffect } from 'react'
import ProfileHeader from './ProfileHeader'
import { Grid } from 'semantic-ui-react'
import ProfileContent from './ProfileContent'
import { useStore } from '../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../app/layout/LoadingComponent'

const ProfilePage = () => {
  const {username} = useParams<{username: string}>();
  const {profileStore} = useStore();

  const {loadProfile, loadingProfile, profile} = profileStore;

  useEffect(()=>{
    loadProfile(username!);
  },[loadProfile, username]);

  if(loadingProfile) return <LoadingComponent
   content='Loading profile...' />

  return (
    <div>
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile!} />
                <ProfileContent profile={profile!} />
            </Grid.Column>
        </Grid>
      
    </div>
  )
}

export default observer(ProfilePage)
