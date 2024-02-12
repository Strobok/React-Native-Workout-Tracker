import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'


const ExerciseListItems = ({ item }) => {
    return (
      <Link href={`/${item.name}`} asChild>
        <Pressable style={styles.exerciseContainer}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.exerciseSubtitle}>
            <Text style={styles.subValue}>{item.muscle}</Text> | <Text style={styles.subValue}>{item.equipment}</Text>
          </Text>
        </Pressable>
      </Link>
    )
  }

  const styles = StyleSheet.create({
    exerciseContainer: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      margin: 2,

      //shadow
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
    },
    exerciseName: {
      fontSize: 20,
      fontWeight: '500',
    },
    exerciseSubtitle: {
      color: 'dimgray',
    },
    subValue: {
      textTransform: 'capitalize'
    }
  });

  export default ExerciseListItems;