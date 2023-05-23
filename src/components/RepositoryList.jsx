import { FlatList, View } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'

export const RepositoryListContainer = ({ repositories }) => {
  const ItemSeparator = () => <View style={{ height: 8 }} />

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem data={item}/>}
    />
  )
}


const RepositoryList = () => {
  const repositories = useRepositories()
  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList