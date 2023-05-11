import { View, Image, StyleSheet, Pressable } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { Link } from 'react-router-native'
import * as Linking from 'expo-linking'

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
  },
  buttonStyle: {
    textAlign: 'center',
    width: '50%',
    padding: 3,
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    alignSelf: 'center'
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

  const openInGitHub = () => {
    Linking.openURL(item.url)
  }

  const Item = () => {
    return (
      <View style={styles.flexContainer} testID="repositoryItem">
        <View style={styles.flexHeaderContainer}>
          <View style={styles.flexImage}>
            <Image source={{ uri: item.ownerAvatarUrl }} style={styles.logo}></Image>
          </View>
          <View style={styles.flexName}>
            <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
            <Text>{item.description}</Text>
            <View style={styles.flexLanguage}>
              <Text style={{ color: 'white', textAlign: 'center' }}>{item.language}</Text>
            </View>
          </View>
        </View>
        <View style={styles.flexDetailContainer}>
          <View style={styles.flexDetails}>
            <Text fontWeight="bold" style={{ textAlign: 'center' }}>{round(item.stargazersCount)}</Text>
            <Text style={{ textAlign: 'center' }}>Stars</Text>
          </View>
          <View style={styles.flexDetails}>
            <Text fontWeight="bold" style={{ textAlign: 'center' }}>{round(item.forksCount)}</Text>
            <Text style={{ textAlign: 'center' }}>Forks</Text>
          </View>
          <View style={styles.flexDetails}>
            <Text fontWeight="bold" style={{ textAlign: 'center' }}>{round(item.reviewCount)}</Text>
            <Text style={{ textAlign: 'center' }}>Reviews</Text>
          </View>
          <View style={styles.flexDetails}>
            <Text fontWeight="bold" style={{ textAlign: 'center' }}>{round(item.ratingAverage)}</Text>
            <Text style={{ textAlign: 'center' }}>Rating</Text>
          </View>
        </View>
        {
          item.button &&
          <Pressable style={styles.buttonStyle} onPress={openInGitHub}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Open in GitHub</Text>
          </Pressable>
        }
      </View>
    )
  }

  return (
    <View>
      {!item.button && <Link to={`/repositories/${item.id}`}>
        <Item />
      </Link>}
      {item.button && <Item />}
    </View>
  )
}

export default RepositoryItem