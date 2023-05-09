import Text from './Text';
import { Formik } from 'formik';
import {View, StyleSheet, Pressable} from 'react-native'
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup'

const initialValues = {
  username: '',
  password: ''
}

const styles = StyleSheet.create({
  inputStyle: {
    textAlign: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    padding: 3,
    marginTop: 8,
    alignSelf: 'center'
  },
  buttonStyle: {
    textAlign: 'center',
    width: '50%',
    padding: 3,
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    alignSelf: 'center'
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
})

const SignInForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" style={styles.inputStyle}/>
      <FormikTextInput name="password" placeholder="Password" style={styles.inputStyle} secureTextEntry/>
      <Pressable onPress={onSubmit}>
        <Text style={styles.buttonStyle}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )  
};


export default SignIn;