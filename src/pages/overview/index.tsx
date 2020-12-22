import {
  Box,
  VStack,
  Heading,
  Center,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { PageLayout } from 'components/PageLayout';
import { getAllQuestions, QuestionProp } from 'utils/getQuestions';
import Link from 'next/link';

interface Props {
  questions: QuestionProp[];
}

export default function Overview({ questions }: Props) {
  return (
    <PageLayout>
      <Box mt="4.5rem" minH="calc(100vh - 4.5rem - 101px)" pt="50px">
        <Heading as="h1" textAlign="center">
          Overview
        </Heading>

        <Center>
          <VStack spacing={8} mt={10} align="stretch">
            {questions.map((item) => (
              <Link key={item.data.id} href={`/overview/${item.slug}`} passHref>
                <ChakraLink fontSize={16} display="block" aria-label="JSIQ, Back to homepage">
                  <Box
                    shadow="md"
                    px={6}
                    py={4}
                    w="100%"
                    borderRadius={10}
                    _hover={{ shadow: 'xl' }}
                    transition="all 0.3s"
                    bg={useColorModeValue('white', 'gray.700')}
                  >
                    {item.data.id}. {item.data.title}
                  </Box>
                </ChakraLink>
              </Link>
            ))}
          </VStack>
        </Center>
      </Box>
    </PageLayout>
  );
}

export const getStaticProps = async () => {
  const questions = getAllQuestions();

  return {
    props: { questions: questions.sort((a, b) => a.data.id - b.data.id) },
  };
};
