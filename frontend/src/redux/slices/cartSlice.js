import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
});
//Helper function to load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {products: []};
};
// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};
//Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({userId, guestId}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                params: {
                    userId,
                    guestId,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch cart" });
        }
    }
);
//Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (
        {productId, quantity, size, color, guestId, userId},
        {rejectWithValue}
    ) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                productId,
                quantity,
                size,
                color,
                guestId,
                userId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to add to cart" });
        }
    }
);
//Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async (
        {productId, quantity, guestId, userId, size, color},
        {rejectWithValue}
    ) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    productId,
                    quantity,
                    guestId,
                    userId,
                    size,
                    color,
                });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update item quantity" });
        }
    }
);
//Remove an item from the cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({productId, guestId, userId, size, color}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: "DELETE",
                url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                data: {
                    productId,
                    guestId,
                    userId,
                    size,
                    color,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to remove item" });
        }
    }
);
//Merge guest cart into user cart
export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({guestId, user}, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
                {guestId, user},
                {
                    headers: getAuthHeaders(),
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to merge cart" });
        }
    }
);
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = {products: []};
            localStorage.removeItem("cart");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart";
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item";
            })
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart";
            });
    },
});

export const {clearCart, clearError} = cartSlice.actions;
export default cartSlice.reducer;