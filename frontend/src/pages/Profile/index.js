import "./styles.css";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Text, Button, Alert, AlertIcon, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout, loggedIn } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div>
      <div className="profile-container">
        {loggedIn === false && (
          <div className="not-logged-in">
            <Alert status="warning">
              <AlertIcon />
              You are not logged in. Please login and try again.
            </Alert>
            <Link to="/signin">
              <Button mt={4} colorScheme="whatsapp" variant="solid">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button mt={4} ml={4} colorScheme="facebook" variant="solid">
                Register
              </Button>
            </Link>
          </div>
        )}
        {loggedIn === true && (
          <div className="logged-in">
            <Text fontSize={28} fontWeight={700}>
              Profile
            </Text>
            <Box mt={4}>
              <Text fontSize={20}>Username: {user.username}</Text>
              <Text fontSize={20}>Phone Number: {user.phno}</Text>
              <Text fontSize={20}>Email: {user.email}</Text>
              <Text fontSize={20}>Role: {user.role}</Text>
            </Box>
            <br />
            <br />
            <Link to="/">
              <Button
                colorScheme="pink"
                variant="solid"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;