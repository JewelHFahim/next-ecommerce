import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@wix/sdk";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  count: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
};

export const useCartStore = create((set) => ({
  cart: [],
  isLoading: true,

  // getCart: async (wixClient) => {
  //   const cart = await wixClient.currentCart.getCurrentCart();

  //   set({
  //     cart: cart || [],
  //     isLoading: false,
  //     count: cart?.lineItems.length || 0,
  //   });
  // },

  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      if (!cart) {
        console.warn("Cart not found, initializing an empty cart.");
        set({
          cart: [],
          isLoading: false,
          count: 0,
        });
        return;
      }

      set({
        cart: cart || [],
        isLoading: false,
        count: cart.lineItems.length || 0,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({
        cart: [],
        isLoading: false,
        count: 0,
      });
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));

    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_ID,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });
    set({
      cart: response.cart,
      count: response.cart?.lineItems?.length,
      isLoading: false,
    });
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));

    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );
    set({
      cart: response.cart,
      count: response.cart?.lineItems?.length,
      isLoading: false,
    });
  },
}));

// export const useCartStore = create<CartState>((set) => ({
//   cart: [],
//   isLoading: true,
//   count: 0,
//   getCart: async (wixClient) => {
//     try {
//       const cart = await wixClient.currentCart.getCurrentCart();
//       if (!cart) {
//         console.warn("Cart not found, initializing an empty cart.");
//         set({
//           cart: [],
//           isLoading: false,
//           count: 0,
//         });
//         return;
//       }

//       set({
//         cart: cart || [],
//         isLoading: false,
//         count: cart.lineItems.length || 0,
//       });
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       set({
//         cart: [],
//         isLoading: false,
//         count: 0,
//       });
//     }
//   },
//   addItem: async (wixClient, productId, variantId, quantity) => {
//     try {
//       set((state) => ({ ...state, isLoading: true }));

//       const response = await wixClient.currentCart.addToCurrentCart({
//         lineItems: [
//           {
//             catalogReference: {
//               appId: process.env.NEXT_PUBLIC_WIX_ID,
//               catalogItemId: productId,
//               ...(variantId && { options: { variantId } }),
//             },
//             quantity: quantity,
//           },
//         ],
//       });

//       set({
//         cart: response.cart,
//         count: response.cart?.lineItems?.length || 0,
//         isLoading: false,
//       });
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       set((state) => ({
//         ...state,
//         isLoading: false,
//       }));
//     }
//   },
//   removeItem: async (wixClient, itemId) => {
//     try {
//       set((state) => ({ ...state, isLoading: true }));

//       const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
//       set({
//         cart: response.cart,
//         count: response.cart?.lineItems?.length || 0,
//         isLoading: false,
//       });
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//       set((state) => ({
//         ...state,
//         isLoading: false,
//       }));
//     }
//   },
// }));
