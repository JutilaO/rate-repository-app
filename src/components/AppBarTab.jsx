import { View, Pressable, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    padding: 3
  },
})

const AppBarTab = (data) => {
  return <View style={styles.container}>
    <Pressable>
      <Link to={data.data.path} onPress={data.data.onPress}>
        <Text fontSize="subheading" fontWeight="bold" style={{ color: 'white' }}>
          {data.data.name}
        </Text>
      </Link>
    </Pressable>
  </View>
}

export default AppBarTab