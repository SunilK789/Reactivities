import { ErrorMessage, Form, Formik } from 'formik'
import MyTextInput from '../../app/common/form/MyTextInput'
import { Button, Header, Label } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import { isValid } from 'date-fns';

const RegisterForm = () => {
    const {userStore} = useStore();
  return (
    <Formik
        initialValues={{displayName:'',userName:'', email: '', password:'', error: null}}
        onSubmit={(values, {setErrors}) => userStore.register(values).catch(error=>setErrors({error: 'Invalid email or password'}))}
        validationSchema={Yup.object({
            displayName: Yup.string().required(),
            userName: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        })}
    >
      {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
            <Form className='ui form' onSubmit={handleSubmit}>
                <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
                <MyTextInput placeholder='DisplayName' name='displayName' />
                <MyTextInput placeholder='UserName' name='userName' />
                <MyTextInput placeholder='Email' name='email' />
                <MyTextInput placeholder='Password' name='password' type='password' />
                {errors?.error &&  <Label style={{marginTop: 10, marginBottom: 10}} basic color='red' content={errors.error} />}                
                <Button 
                    disabled={!isValid || !dirty || isSubmitting}
                    loading={isSubmitting} 
                    positive 
                    content='Login' 
                    type='submit' fluid />
            </Form>
      )}
    </Formik>
  )
}

export default observer(RegisterForm)
