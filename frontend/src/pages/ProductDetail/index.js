import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import ImageGallery from "react-image-gallery";
import {
  Card,
  Flex, // Import the Flex component from Chakra UI
  Heading,
  Text,
  Button,
  CardFooter,
  Stack,
  CardBody,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <div>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <ImageGallery items={images} showThumbnails={false} />

        <Stack>
          <CardBody>
            <Flex
              direction="column"
              alignItems="center" // Center align the content vertically
              justifyContent="center" // Center align the content horizontally
              textAlign="center" // Center align text within the Flex container
            >
              <Heading size="md" fontWeight="bold" fontStyle="oblique">
                {data.title}
              </Heading>

              <Text maxWidth={400} py="2">
                {data.description}
              </Text>
              <Text color="black" fontSize="2xl" fontWeight="bold">
                ₹ {data.price}
              </Text>
            </Flex>
          </CardBody>

          <CardFooter>
            <Flex justifyContent="center"> {/* Center align the button */}
              <Button
                variant="solid"
                colorScheme={findBasketItem ? "red" : "whatsapp"}
                onClick={() => addToBasket(data, findBasketItem)}
              >
                {findBasketItem ? "Remove from basket" : "Add to Basket"}
              </Button>
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

export default ProductDetail;

