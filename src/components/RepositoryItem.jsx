import { View, Image, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 15
  },
  flexContainer: {
    flexDirection: 'column',
    padding: 5,
    backgroundColor: 'white'
  },
  flexHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
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
  }
})

const RepositoryItem = (data) => {
  const item = data.data

  const round = (number) => {
    if(number >= 1000){
      let newNumber = number / 1000
      newNumber = Math.round(newNumber * 10) / 10
      return `${newNumber}k`
    }
    return number
  }

  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexHeaderContainer}>
        <View style={styles.flexImage}>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.logo}></Image>
        </View>
        <View style={styles.flexName}>
          <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
          <Text>{item.description}</Text>
          <View style={styles.flexLanguage}>
            <Text style={{ color: 'white' }}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexDetailContainer}>
        <View style={styles.flexDetails}>
          <Text fontWeight="bold">{round(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.flexDetails}>
          <Text fontWeight="bold">{round(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.flexDetails}>
          <Text fontWeight="bold">{round(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.flexDetails}>
          <Text fontWeight="bold">{round(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem