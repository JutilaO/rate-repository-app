import { FlatList, View } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import TextInput from './TextInput'
import { useDebounce } from 'use-debounce'

export const RepositoryListContainer = ({ repositories, sortType, setSortType, searchWord, setSearchWord, onEndReach }) => {
  const ItemSeparator = () => <View style={{ height: 8 }} />

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem data={item}/>}
      ListHeaderComponent={<PickerComponent sortType={sortType} setSortType={setSortType} searchWord={searchWord} setSearchWord={setSearchWord}/>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

const Searchbar = ({ setSearchWord }) => {
  return (
    <TextInput onChangeText={(text) => setSearchWord(text)} style={{ backgroundColor: 'white' }} placeholder="Search" autofocus/>
  )
}

const PickerComponent = ({ sortType, setSortType, setSearchWord }) => {
  return (
    <View>
      <Searchbar setSearchWord={setSearchWord}/>
      <Picker
        selectedValue={sortType}
        onValueChange={(itemValue) => setSortType(itemValue)}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  )
}

const RepositoryList = () => {
  const [sortType, setSortType] = useState()
  const [searchWord, setSearchWord] = useState('')
  const [searchKeyword] = useDebounce(searchWord, 1500)
  const {repositories, fetchMore} = useRepositories({sortType, searchKeyword, first: 2})

  const onEndReach = () => {
    fetchMore()
  }

  return <RepositoryListContainer repositories={repositories} sortType={sortType} setSortType={setSortType} setSearchWord={setSearchWord} onEndReach={onEndReach}/>
}

export default RepositoryList