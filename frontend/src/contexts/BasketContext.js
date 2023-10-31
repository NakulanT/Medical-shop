import { useState, createContext, useContext, useEffect } from "react";

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);
  console.log("dsds",items)

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  const addToBasket = (data, findBasketItem, quantity) => {
    if (!findBasketItem) {
      const itemWithQuantity = { ...data, quantity };
      return setItems((items) => [...items, itemWithQuantity]);
    }

    const filtered = items.filter((item) => item._id !== findBasketItem._id);
    setItems(filtered);
  };

  const removeFromBasket = (item_id) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };
  


  const calculateTotal = () => {
  const total = items.reduce((acc, item) => {
    const itemTotalPrice = item.price * item.quantity;
    console.log(`Item: ${item.title}, Quantity: ${item.quantity}`);
    return acc + itemTotalPrice;
  }, 0);
  console.log(`Total Price: ${total}`);
  return total;
};







  const emptyBasket = () => setItems([]);




  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
    emptyBasket,
    calculateTotal,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
