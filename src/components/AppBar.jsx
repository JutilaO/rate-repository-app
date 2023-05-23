import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import useMe from '../hooks/useMe'
import { useApolloClient } from '@apollo/client'
import useAuthStorage from '../hooks/useAuthStorage'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row'
  },
})

const AppBar = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const me = useMe({includeReviews: false})

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab data={{ name: 'Repositories', path: 'repositories' }}/>
        {!me && <AppBarTab data={{ name: 'Sign up', path: 'signup' }}/>}
        {!me && <AppBarTab data={{ name: 'Sign in', path: 'signin' }}/>}
        {me && <AppBarTab data={{ name: 'Create a review', path: 'createReview' }}/>}
        {me && <AppBarTab data={{name: 'My reviews', path: 'myreviews'}}/>}
        {me && <AppBarTab data={{ name: 'Sign out', path: 'repositories', onPress: signOut }} />}
      </ScrollView>
    </View>
  )
}

export default AppBar