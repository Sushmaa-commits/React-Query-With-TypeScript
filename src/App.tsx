import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Container } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Response = {
  config: object;
  data: Post[];
  headers: object;
  request: object;
  status: number;
  statusText: string;
};

const App: React.FC = () => {
  const fetchPosts = async () => {
    const response: Response | undefined = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response?.data;
  };

  const { isLoading, error, data } = useQuery<Post[] | undefined>(
    "dogs",
    fetchPosts
  );

  if (error) return <h1> Error, try again</h1>;
  if (isLoading) return <h1> Loading ...</h1>;

  console.log(data);

  return (
    <Container maxW="container.xl" py={5} px={3}>
      <Heading fontWeight="extrabold" color="cyan.500" size="xl" py={5}>
        Posts
      </Heading>
      {data && data.map((item) => <Text mt={3}>{item.title} </Text>)}
    </Container>
  );
};

export default App;
