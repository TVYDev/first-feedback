import Head from 'next/head';
import { Heading, Text, Button } from '@chakra-ui/react'

import { useAuth } from '@/libs/auth';

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <Heading>Welcome to First Feedback 🚀</Heading>

        {!auth?.user && (
          <Button fontWeight="bold" onClick={() => auth.signInWithGithub()}>Sign In</Button>
        )}
        <Text>Email: {auth?.user?.email}</Text>
        {auth?.user && <Button onClick={() => auth.signOut()}>Sign Out</Button>}
      </main>
    </div>
  );
}
