import { ChakraProvider, Container, Heading, Text, extendTheme } from '@chakra-ui/react'
import SynonymFinder from './components/SynonymFinder'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
      }
    }
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.md" py={20}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          mb={2}
          letterSpacing="tight"
          color="white"
          textShadow="0 0 10px rgba(255,255,255,0.3)"
          fontWeight="bold"
          fontSize="5xl"
        >
          Syn-gen
        </Heading>
        <Text textAlign="center" color="gray.500" mb={12} fontSize="sm">
          Find synonyms
        </Text>
        <SynonymFinder />
      </Container>
    </ChakraProvider>
  )
}

export default App
