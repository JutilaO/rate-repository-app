import Text from './Text'
import { Formik } from 'formik'
import { View, StyleSheet, Pressable } from 'react-native'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import * as yup from 'yup'
import useCreateReview from '../hooks/useCreateReview'
import { useNavigate } from 'react-router-native'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
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
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup
    .string()
    .required('Review is required')
})

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" style={styles.inputStyle}/>
      <FormikTextInput name="repositoryName" placeholder="Repository name" style={styles.inputStyle}/>
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.inputStyle}/>
      <FormikTextInput name="text" placeholder="Review" style={styles.inputStyle}/>
      <Pressable onPress={onSubmit}>
        <Text style={styles.buttonStyle}>Create a review</Text>
      </Pressable>
    </View>
  )
}

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values

    try {
      const { data } = await createReview({ ownerName, repositoryName, rating: Number(rating), text })
      navigate(`/repositories/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateReviewContainer onSubmit={onSubmit} />
}


export default CreateReview