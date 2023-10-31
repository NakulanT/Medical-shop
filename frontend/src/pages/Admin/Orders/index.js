import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";
//import Title from "antd/es/skeleton/Title";

// import { useBasket } from "../../contexts/BasketContext";
// import { useBasket } from "../../../contexts/BasketContext";



function Orders() {
  // const {calculateTotal,items} = useBasket();

  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }

  const reversedData = data.slice().reverse();
  console.log(data);
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Order</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Box mt={10}>
        <Text fontSize="2xl" p={5}>
          Orders
        </Text>
        {/* <Text fontSize="2xl" p={5}>
          {calculateTotal}
        </Text> */}

        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>User_Name</Th>
              <Th>Phone_Number</Th>
              <Th>Address</Th>
              <Th textAlign="left">Items ordered</Th>
              <Th textAlign="left">no of items</Th>
              <Th textAlign="left">Total</Th>
            </Tr>
          </Thead>
          <Tbody>
      {reversedData.map((item) => (
        <Tr key={item._id}>
          {item.user === null ? (
            <>
              <Td>No Name</Td>
              <Td>No Username</Td> {/* Add a default value for username */}
            </>
          ) : (
            <>
              <Td>{item.user.username}</Td>
              <Td>{item.user.phno}</Td>
            </>
          )}
          <Td>{item.adress}</Td>
          <Td isNumeric style={{ textAlign: "left" }}>
            {item.items.map((item) => item.title).join(', ')} {/* Fix the mapping of 'item.title' */}
          </Td>


       
          <Td>{item.itemQuantity.join(', ')}</Td>
          <Td>{item.total}</Td>
        </Tr>
      ))}
    </Tbody>
        </Table>
      </Box>
    </div>
  );
}

export default Orders;
