import { FlatList, View } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import TextInput from './TextInput'
import { useDebounce } from 'use-debounce';

export const RepositoryListContainer = ({ repositories, sortType, setSortType, searchWord, setSearchWord }) => {
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
    />
  )
}

const Searchbar = ({searchWord, setSearchWord}) => {
  return (
    <TextInput onChangeText={(text) => setSearchWord(text)} value={searchWord} style={{backgroundColor: 'white'}} placeholder="Search" autofocus/>
  )
}

const PickerComponent = ({ sortType, setSortType, searchWord, setSearchWord }) => {
  return (
    <View>
      <Searchbar  searchWord={searchWord} setSearchWord={setSearchWord}/>
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
  const repositories = useRepositories(sortType, searchKeyword)

  return <RepositoryListContainer repositories={repositories} sortType={sortType} setSortType={setSortType} searchWord={searchWord} setSearchWord={setSearchWord}/>
}

export default RepositoryList