import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { gql } from 'graphql-request'
import graphqlClient from '../../api/graphqlClient'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../providers/AuthContext';
import SetListItem from './SetListItem';
import ProgressGraph from './ProgressGraph';

const setsQuery = gql`
  query sets($exercise: String!, $username: String!) {
    sets(exercise: $exercise, username: $username) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = ({ ListHeaderComponent, exerciseName }) => {
  const { username } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ['sets', exerciseName],
    queryFn:  () => graphqlClient.request(setsQuery, { exercise: exerciseName, username }),
  });

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch exercise</Text>
  }

  return (
    <FlatList 
      data={data?.sets.documents}
      ListHeaderComponent={() => (
        <>
          <ListHeaderComponent />
          <ProgressGraph sets={data.sets.documents} />
        </>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
      <SetListItem set={item} />
      )}
    />
  )
}

export default SetsList