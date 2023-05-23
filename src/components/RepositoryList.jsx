import { FlatList, View } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'

export const RepositoryListContainer = ({ repositories, sortType, setSortType }) => {
  const ItemSeparator = () => <View style={{ height: 8 }} />


  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem data={item}/>}
      ListHeaderComponent={<PickerComponent sortType={sortType} setSortType={setSortType}/>}
    />
  )
}

const PickerComponent = ({ sortType, setSortType }) => {

  return (
    <Picker
      selectedValue={sortType}
      onValueChange={(itemValue) => setSortType(itemValue)}>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  )
}



const RepositoryList = () => {
  const [sortType, setSortType] = useState()
  const repositories = useRepositories(sortType)

  return <RepositoryListContainer repositories={repositories} sortType={sortType} setSortType={setSortType}/>
}

export default RepositoryList