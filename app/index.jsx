import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ExerciseListItems from '../src/components/ExerciseListItems';
import { useInfiniteQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import graphqlClient from '../api/graphqlClient'
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../src/providers/AuthContext';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';


const exercisesQuery = gql`
  query exercises($muscle: String, $name: String, $offset: Int){
    exercises(muscle: $muscle, name: $name, offset: $offset){
      name
      muscle
      equipment
    }
  }
`;

const ExercisesScreen = () => {
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 500);

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['exercises', debouncedSearchTerm],
      queryFn: ({ pageParam }) =>
        graphqlClient.request(exercisesQuery, {
          offset: pageParam,
          name: debouncedSearchTerm,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => pages.length * 10,
    });

  const { username } = useAuth();

  const loadMore = () => {
    if (isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>
  }

  if (!username) {
    return <Redirect href={'/auth'} />;
  }
  
  const exercises = data?.pages.flatMap(page => page.exercises);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options = {{ 
          headerSearchBarOptions: {
            placeholder: 'Search...',
            onChangeText: (event) => setSearch(event.nativeEvent.text),
          } 
        }} />
      <FlatList 
        data={exercises}
        contentContainerStyle = {{ gap: 5}}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ExerciseListItems item={item} />}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding: 10, 
  },
});

export default ExercisesScreen;
