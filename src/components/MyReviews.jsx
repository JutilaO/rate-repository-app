import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import Text from './Text'
import theme from '../theme'
import useMe from '../hooks/useMe'
import { useDeepLinking, useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  flexContainer: {
    paddingTop: 8,
    flexDirection: 'column',
    padding: 5,
    backgroundColor: 'white'
  },
  flexHeaderContainer: {
    flexDirection: 'row',
    paddingLeft: 10
  },
  ratingCircle: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 40 / 2,
    width: 40,
    height: 40
  },
  ratingText: {
    textAlign: 'center',
    marginTop: 8.5,
    color: theme.colors.primary
  },
  nameDate: {
    paddingLeft: 10
  },
  nameDateContainer: {
    flexDirection: 'column'
  },
  textPadding: {
    paddingLeft: 60
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonStyle: {
    textAlign: 'center',
    width: '100%',
    padding: 3,
    marginTop: 8,
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: 5
  },
  buttonDeleteStyle: {
    textAlign: 'center',
    width: '100%',
    padding: 3,
    marginTop: 8,
    marginLeft: 25,
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 5
  }
})

const ReviewItem = ({ review }) => {
  const [deleteReview] = useDeleteReview()
  const navigate = useNavigate()

  const deleteReviewButton = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete the review?', [{text: 'Cancel'}, {text: 'Delete', onPress: () => deleteThis()}])
    
    const deleteThis = async () => {
      try {
        await deleteReview(review.id)
      } catch (e) {
        console.log(e)
      }
    }
  }
  
  const viewRepository = () => {
    navigate(`/repositories/${review.id}`)
  }
  
  return (
    <View style={styles.flexContainer} >
      <View style={styles.flexHeaderContainer}>
        <View style={styles.ratingCircle}>
          <Text fontWeight="bold" color="" style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.nameDateContainer}>
          <Text fontWeight="bold" style={styles.nameDate}>{review.repository.fullName}</Text>
          <Text style={styles.nameDate} color="textSecondary">{new Date(review.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
      <Text style={styles.textPadding}>{review.text}</Text>
      <View style={styles.buttonContainer}>
        <Pressable onPress={viewRepository}>
          <Text style={styles.buttonStyle}>View repository</Text>
        </Pressable>
        <Pressable onPress={deleteReviewButton}>
          <Text style={styles.buttonDeleteStyle}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
}

const MyReviews = () => {
  const me = useMe({includeReviews: true})

  const ItemSeparator = () => <View style={{ height: 8 }} />

  if(!me) return null

  const reviewNodes = me.reviews
    ? me.reviews.edges.map(edge => edge.node)
    : []

  return (
    <View>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item}/>}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}

export default MyReviews