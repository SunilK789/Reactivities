import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import { Photo, Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget'

interface Props{
  profile: Profile
}


const ProfilePhotos = ({profile}:Props) => {
    const {profileStore: {isCurrentUser, uploadPhoto, 
        uploading, loading, setMainPhoto, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    function handlePhotoUpload (file: Blob)  {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }
    

  return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
                <Header floated='left' icon='image' content='Photos' />
                {isCurrentUser && (
                    <Button 
                        floated='right' 
                        basic 
                        content={addPhotoMode ? 'Cancel': 'Add Photo'} 
                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                    />
                )}
            </Grid.Column>
            <Grid.Column width={16}>
                {addPhotoMode ? (
                    <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                ):(
                <Card.Group itemPerRow={5}>
                        {profile.photos?.map((photo)=>(
                            <Card key={photo.id} style={{width: '200px'}}>
                                <Image  src={photo.url || '/assets/user.png'} />
                                {isCurrentUser && (
                                    <Button.Group fluid widths={2}>
                                        <Button
                                            basic
                                            color='green'
                                            content='Main'
                                            name={'main' + photo.id}
                                            disabled={photo.isMain}
                                            loading={target === 'main' + photo.id && loading}
                                            onClick={e => handleSetMainPhoto(photo, e)} 
                                        />
                                        <Button 
                                            basic
                                            color='red'
                                            icon='trash'
                                            loading={target === photo.id && loading}
                                            onClick={e => handleDeletePhoto(photo, e)}
                                            disabled={photo.isMain}
                                            name={photo.id}
                                        />
                                    </Button.Group>
                                )}
                            </Card>
                        ))}
                </Card.Group>
                )}
            </Grid.Column>
        </Grid>
        
    </Tab.Pane>
  )
}

export default observer(ProfilePhotos)
