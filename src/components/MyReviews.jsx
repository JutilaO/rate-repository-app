import { View, FlatList, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'
import useMe from '../hooks/useMe'

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
  }
})

const ReviewItem = ({ review }) => {
  console.log(review)
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
        renderItem={({ item }) => <ReviewItem review={item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}

export default MyReviews