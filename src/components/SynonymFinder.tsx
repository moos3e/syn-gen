import { useState } from 'react'
import {
    Box,
    Container,
    Input,
    Button,
    VStack,
    List,
    ListItem,
    useToast,
    Spinner,
    Text,
} from '@chakra-ui/react'
import axios from 'axios'

interface Synonym {
    word: string
    score: number
}

const SynonymFinder = () => {
    const [word, setWord] = useState('')
    const [synonyms, setSynonyms] = useState<Synonym[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const fetchSynonyms = async () => {
        if (!word.trim()) {
            toast({
                title: 'Error',
                description: 'Please enter a word',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        setIsLoading(true)
        try {
            // Using the Datamuse API for synonyms
            const response = await axios.get(`https://api.datamuse.com/words?rel_syn=${word.trim()}`)
            const sortedSynonyms = response.data
                .map((item: any) => ({
                    word: item.word,
                    score: item.score
                }))
                .sort((a: Synonym, b: Synonym) => b.score - a.score)

            setSynonyms(sortedSynonyms)

            if (sortedSynonyms.length === 0) {
                toast({
                    title: 'No synonyms found',
                    description: 'Try another word',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch synonyms',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetchSynonyms()
    }

    return (
        <Container maxW="container.md">
            <VStack spacing={8}>
                <Box as="form" onSubmit={handleSubmit} width="100%">
                    <VStack spacing={4}>
                        <Input
                            placeholder="Enter a word..."
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            size="lg"
                            isDisabled={isLoading}
                            bg="gray.800"
                            border="none"
                            _focus={{
                                boxShadow: 'none',
                                bg: 'gray.700',
                            }}
                            _hover={{
                                bg: 'gray.700',
                            }}
                            fontSize="lg"
                            height="60px"
                            borderRadius="xl"
                            color="white"
                            _placeholder={{ color: 'gray.400' }}
                        />
                        <Button
                            colorScheme="blue"
                            type="submit"
                            width="100%"
                            isLoading={isLoading}
                            loadingText="Searching..."
                            height="60px"
                            fontSize="lg"
                            borderRadius="xl"
                            bg="blue.500"
                            _hover={{
                                bg: 'blue.600',
                            }}
                        >
                            Find Synonyms
                        </Button>
                    </VStack>
                </Box>

                {isLoading ? (
                    <Box textAlign="center">
                        <Spinner size="xl" color="blue.400" thickness="3px" />
                    </Box>
                ) : (
                    synonyms.length > 0 && (
                        <List spacing={3} width="100%">
                            {synonyms.map((synonym, index) => (
                                <ListItem
                                    key={index}
                                    p={6}
                                    bg="gray.800"
                                    borderRadius="xl"
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    transition="all 0.2s"
                                    _hover={{
                                        bg: 'gray.700',
                                        transform: 'translateY(-2px)',
                                    }}
                                >
                                    <Text fontSize="xl" fontWeight="medium" color="white">{synonym.word}</Text>
                                    <Text color="blue.300" fontSize="sm">
                                        {Math.round((synonym.score / synonyms[0].score) * 100)}%
                                    </Text>
                                </ListItem>
                            ))}
                        </List>
                    )
                )}
            </VStack>
        </Container>
    )
}

export default SynonymFinder 