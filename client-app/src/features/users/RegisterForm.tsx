import { Form, Formik } from 'formik'
import MyTextInput from '../../app/common/form/MyTextInput'
import { Button, Header } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import ValidationError from '../errors/ValidationError';

const RegisterForm = () => {
    const {userStore} = useStore();
  return (
    <Formik
        initialValues={{displayName:'',userName:'', email: '', password:'', error: null}}
        onSubmit={(values, {setErrors}) => userStore.register(values).catch(error=>setErrors({error}))}
        validationSchema={Yup.object({
            displayName: Yup.string().required(),
            userName: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        })}
    >
      {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
            <Form className='ui form error' onSubmit={handleSubmit}>
                <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
                <MyTextInput placeholder='DisplayName' name='displayName' />
                <MyTextInput placeholder='UserName' name='userName' />
                <MyTextInput placeholder='Email' name='email' />
                <MyTextInput placeholder='Password' name='password' type='password' />
                {errors.error && 
                  <ValidationError errors={errors.error}/>  
                }                 
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
