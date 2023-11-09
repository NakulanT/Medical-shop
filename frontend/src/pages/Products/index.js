import React, { useState } from "react";
import Cards from "../../components/Card";
import { Grid, Box, Flex, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api.js";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;

      if (!morePagesExist) {
        return;
      } else {
        return allGroups.length + 1;
      }
    },
  });

  const filteredData = data?.pages.flatMap((group) => group).filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div>
      <InputGroup mb={4} mr={4}>
        <Input
          placeholder="Search products by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setSearchTerm("")}>
            Clear
          </Button>
        </InputRightElement>
      </InputGroup>
      
      <div className="products">
        <Grid templateColumns="repeat(3,1fr)" gap={4}>
          {filteredData.map((item) => (
            <Box w="100%" key={item._id}>
              <Cards item={item} />
            </Box>
          ))}
        </Grid>
      </div>
      
      <Flex mt="10" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </div>
  );
}

export default Products;

