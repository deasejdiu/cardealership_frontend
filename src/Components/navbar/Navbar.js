import React from 'react';
import { Box, Flex, Spacer, Button, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="gray.800" color="white" px={4} py={3}>
      <Flex maxW="1200px" mx="auto" alignItems="center">
        <Box>
          <Link to="/">
            <ChakraLink fontSize="xl" fontWeight="bold">
              Car Dealership
            </ChakraLink>
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Flex alignItems="center">
            <Box mx={2}>
              <Link to="/book-cars">
                <Button colorScheme="teal" variant="ghost">
                  Book Cars
                </Button>
              </Link>
            </Box>
            <Box mx={2}>
              <Link to="/cars">
                <Button colorScheme="teal" variant="ghost">
                  Cars
                </Button>
              </Link>
            </Box>
            <Box mx={2}>
              <Link to="/login">
                <Button colorScheme="teal" variant="ghost">
                  Log In
                </Button>
              </Link>
            </Box>
            <Box mx={2}>
              <Link to="/profile">
                <Button colorScheme="teal" variant="ghost">
                  Profile
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;