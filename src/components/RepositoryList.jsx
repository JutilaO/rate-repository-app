import { FlatList } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem data={item}/>}
    />
  )
}

const RepositoryList = () => {
  const repositories = useRepositories()
  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList