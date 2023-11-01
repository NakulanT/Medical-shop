import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Image,
  AlertIcon,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api.js";
import { useNavigate } from "react-router-dom";


function Basket() {
  const [address, setAddress] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate hook


  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price * obj.quantity, 0);

  const handleSubmitForm = async () => {
    const total = items.reduce((acc, obj) => acc + obj.price*obj.quantity, 0);
    
    // const itemQuantity = items.reduce((acc, obj) => acc + obj.quantity, 0);
    // console.log("+++",itemQuantity)

    const itemIds = items.map((item) => item._id);
    const itemQun = items.map((item) => item.quantity);
    // console.log(itemIds)
    console.log("_____----",itemQun)


    const input = {
      address,
      itemQuantity:JSON.stringify(itemQun),
      total,
      items: JSON.stringify(itemIds),
    };

    await postOrder(input);

    emptyBasket();
    onClose();
    navigate("/");   
    window.location.reload(); 

  };

  return (
    <Box p="5">
      {items.length < 1 && (
        <Alert status="warning">
          <AlertIcon />
          You have not any items in your basket.
        </Alert>
      )}

<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <Box mt="10" p="4" bg="gray.200" borderRadius="md" textAlign="center">
    <Text fontSize="32" fontWeight="bold" fontStyle="oblique">
      Total: ₹ {total}
    </Text>
  </Box>
  <Flex justifyContent="space-between" mt="4">
    <Button onClick={() => emptyBasket()} colorScheme="whatsapp">
      Clear
    </Button>
    <Button onClick={onOpen} colorScheme="whatsapp" ml="4">
      Buy now
    </Button>
  </Flex>
</div>


      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal", display: "flex", flexWrap: "wrap" }}>
            {items.map((item) => (
              <li key={item._id} style={{align: "center", margin: 20, width: "50%", flex: "1 0 calc(20% - 20px)" }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize="22" fontWeight="bold" fontStyle="oblique">
                    {item.title} - ₹{item.price} x {item.quantity}
                  </Text>
                  <br></br>
                  <Image
                    htmlWidth={300}
                    loading="lazy"
                    src={item.photos}
                    alt="basket item"
                    boxSize={250}
                    objectFit="cover"
                    borderRadius="20px"
                  />
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme="red"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove from Basket
                </Button>
              </li>
            ))}
          </ul>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel fontStyle="oblique" fontWeight= "bold">Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Basket;