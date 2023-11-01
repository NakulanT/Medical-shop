import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Text, Button, Alert, AlertIcon, Box, Heading, Center ,Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout, loggedIn } = useAuth();

  const handleLogout = async () => {
    logout();
  };
  return (
    <Center h="50vh">
      <Box
        p={6}
        maxW="600px"
        border="1px solid #E2E8F0"
        borderRadius="lg"
        bg="white"
        color="gray.800" // Text color
        shadow="lg"
        textAlign="center"
      >
        {loggedIn === false && (
          <Box>
            <Alert status="warning" bg="yellow.100" color="yellow.800">
              <AlertIcon color="yellow.500" />
              You are not logged in. Please login and try again.
            </Alert>
            <Flex mt={4}>
              <Link to="/signin">
                <Button colorScheme="blue" variant="solid">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button ml={4} colorScheme="green" variant="solid">
                  Register
                </Button>
              </Link>
            </Flex>
          </Box>
        )}
        {loggedIn === true && (
          <Box>
            <Heading as="h1" fontSize="2xl" fontWeight="bold" color= "whatsapp.500">
              Profile
            </Heading>
            <Box mt={4}>
              <Text fontSize="lg" textAlign= "left">Username: <span style={{ fontWeight: "bold" }}>{user.username}</span></Text>
              <Text fontSize="lg" textAlign= "left">Phone Number: <span style={{ fontWeight: "bold" }}>{user.phno}</span></Text>
              <Text fontSize="lg" textAlign= "left">Email: <span style={{ fontWeight: "bold" }}>{user.email}</span></Text>
              <Text fontSize="lg" textAlign= "left">Role: <span style={{ fontWeight: "bold" }}>{user.role}</span></Text>
            </Box>
            <Link to="/">
              <Button
                mt={4}
                colorScheme="whatsapp"
                variant="solid"
                onClick={handleLogout}
                isFullWidth
              >
                Logout
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Center>
  );
}

export default Profile;
