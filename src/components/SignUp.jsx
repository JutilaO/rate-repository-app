import Text from './Text'
import { Formik } from 'formik'
import { View, StyleSheet, Pressable } from 'react-native'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import * as yup from 'yup'
import useCreateUser from '../hooks/useCreateUser'
import { useNavigate } from 'react-router-native'

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
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
    alignSelf: 'center',
    color: 'white'
  }
})

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required')
})

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" style={styles.inputStyle}/>
      <FormikTextInput name="password" placeholder="Password" style={styles.inputStyle} secureTextEntry/>
      <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" style={styles.inputStyle} secureTextEntry/>
      <Pressable onPress={onSubmit}>
        <Text style={styles.buttonStyle}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const SignUp = () => {
  const [createUser] = useCreateUser()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await createUser({ username, password })
      navigate('/')
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}


export default SignUp