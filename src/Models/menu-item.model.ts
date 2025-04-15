export interface MenuItem {
    itemID: number;
    customerID: number;
    name: string;
    description: string;
    price: number;
    restaurantId: number;
    quantity: number;
    addedToCart?: boolean; // Optional property
  }
  