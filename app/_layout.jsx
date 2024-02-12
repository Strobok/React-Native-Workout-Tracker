import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import AuthContextProvider from '../src/providers/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const client = new QueryClient();

const RootLayout = () => {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}> 
        <AuthContextProvider>
          <QueryClientProvider client={client}>
            <Stack>
              <Stack.Screen name="index" options={{ title: 'Exercises' }} />
            </Stack>
          </QueryClientProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
    );
}

export default RootLayout;