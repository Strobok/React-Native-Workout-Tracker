import { useLocalSearchParams } from "expo-router"
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { Stack } from 'expo-router'
import { useState } from 'react';
import { gql } from 'graphql-request'
import graphqlClient from '../api/graphqlClient'
import { useQuery } from '@tanstack/react-query'
import NewSetInput from "../src/components/NewSetInput";
import SetsList from "../src/components/SetsList";
import ProgressGraph from "../src/components/ProgressGraph";

const exercisesQuery = gql`
query exercises($name: String) {
  exercises(name: $name) {
    instructions
    muscle
    name
    equipment
  }
}
`;

const ExerciseDetailsScreen = () => {
const { name } = useLocalSearchParams();
  const {data, isLoading, error} = useQuery({
    queryKey: ['exercises', name ],
    queryFn: async () => graphqlClient.request(exercisesQuery, { name }),
  });

  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false)

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch</Text>
  }

  const exercise = data.exercises[0]
  
console.log(exercise)
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />

      <SetsList
        exerciseName={exercise.name}
        ListHeaderComponent={() => (
          <View style={{ gap: 5 }}>
            <View style={styles.panel}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>

              <Text style={styles.exerciseSubtitle}>
                <Text style={styles.subValue}>{exercise.muscle}</Text> |{' '}
                <Text style={styles.subValue}>{exercise.equipment}</Text>
              </Text>
            </View>

            <View style={styles.panel}>
              <Text
                style={styles.instructions}
                numberOfLines={isInstructionExpanded ? 0 : 3}
              >
                {exercise.instructions}
              </Text>
              <Text
                onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
                style={styles.seeMore}
              >
                {isInstructionExpanded ? 'See less' : 'See more'}
              </Text>
            </View>
            <NewSetInput exerciseName={exercise.name} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  panel: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '500',
  },
  exerciseSubtitle: {
    color: 'dimgray',
  },
  subValue: {
    textTransform: 'capitalize',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  seeMore: {
    alignSelf: 'center',
    padding: 5,
    fontWeight: '600',
    color: 'gray',
  },
});

export default ExerciseDetailsScreen