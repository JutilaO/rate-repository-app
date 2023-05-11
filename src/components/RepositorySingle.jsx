import { useParams } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'

const RepositorySingle = () => {
  const id = useParams().id
  const repository = useRepository(id)
  if(!repository) return null
  let object = {
    ...repository.repository,
    button: true
  }
  return <RepositoryItem data={object}/>
}

export default RepositorySingle