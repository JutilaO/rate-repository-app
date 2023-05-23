import { useParams } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'
import useReview from '../hooks/useReview'
import { View, FlatList, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 15
  },
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
  flexDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  flexName: {
    flex: 1,
    padding: 2
  },
  flexDetails: {
    padding: 3,
    textAlign: 'center'
  },
  flexImage: {
    alignSelf: 'flex-start',
    padding: 3
  },
  flexLanguage: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    maxWidth: '25%',
    textAlign: 'center',
    padding: 2
  },
  buttonStyle: {
    textAlign: 'center',
    width: '50%',
    padding: 3,
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    alignSelf: 'center'
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
  }
})

const RepositoryInfo = ({ repository }) => {
  if(!repository) return null
  let object = {
    ...repository.repository,
    button: true
  }
  return <RepositoryItem data={object}/>
}

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.flexContainer} >
      <View style={styles.flexHeaderContainer}>
        <View style={styles.ratingCircle}>
          <Text fontWeight="bold" color="" style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.nameDateContainer}>
          <Text fontWeight="bold" style={styles.nameDate}>{review.user.username}</Text>
          <Text style={styles.nameDate} color="textSecondary">{new Date(review.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
      <Text style={styles.textPadding}>{review.text}</Text>
    </View>
  )
}

const RepositorySingle = () => {
  const id = useParams().id
  const reviews = useReview(id)
  const repository = useRepository(id)
  const ItemSeparator = () => <View style={{ height: 8 }} />

  if(!repository) return null
  if(!reviews) return null

  const reviewNodes = reviews
    ? reviews.repository.reviews.edges.map(edge => edge.node)
    : []

  return (
    <View>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ListHeaderComponent={() =>  <RepositoryInfo repository={repository}/>}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}

export default RepositorySingle