import React from "react";
import {
  Card,
  Text,
  Image,
  Stack,
  Heading,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
  Button,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";
import { useState } from "react";

function Cards({ item }) {
  const { addToBasket, items } = useBasket();
  const [quantity, setQuantity] = useState(1);


  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );
  const plus  = () => {
    setQuantity(quantity + 1);
  };
  const minus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card maxW="sm" >
      <Link to={`/product/${item._id}`}>
        <CardBody>
          <Image
            src={item.photos[0]}
            alt="Product"
            borderRadius="lg"
            loading="lazy"
            boxSize={300}
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{item.title}</Heading>
            <Text>{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
            <Text color="blue.600" fontSize="2xl">
            ₹  {item.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
      </Link>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme={findBasketItem ? "red" : "whatsapp"}
            onClick={() => addToBasket(item, findBasketItem)}
          >
            {findBasketItem ? "Remove from Basket" : "Add to Basket"}
          </Button>



          <div>
            <ButtonGroup spacing="0">
              <Button
                variant="ghost"
                colorScheme="blue"
                onClick={minus}
              >
                -
              </Button>
              <Input
                value={quantity}
                size="sm"
                w="16"
                textAlign="center"
                onChange={(e) => {
                  const updatedQun = parseInt(e.target.value);
                  if (!isNaN(updatedQun) && updatedQun >= 1) {
                    setQuantity(updatedQun);
                  }
                }}
              />
              <Button
                variant="ghost"
                colorScheme="blue"
                onClick={plus}
              >
                +
              </Button>
            </ButtonGroup>
          </div>






        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default Cards;
