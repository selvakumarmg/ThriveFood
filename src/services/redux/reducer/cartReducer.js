// Define your initial state
const initialState = {
  cartItems: [],
};

// Define your cart reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    case 'DECREASE_QUANTITY':
      const { id } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) => {
            if (item.id === id && item.quantity > 0) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          })
          .filter((item) => item.quantity > 0),
      };
    case 'INCREASE_QUANTITY':
      const { itemId } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;
