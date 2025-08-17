import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios"

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
});
//Async Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch orders" });
        }
    }
);
//Async thunk to fetch orders details by ID
export const fetchOrderDetails = createAsyncThunk(
    "orders/fetchOrderDetails",
    async (orderId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch order details" });
        }
    }
);
const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearOrderDetails: (state) => {
            state.orderDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //Fetch user orders
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch orders";
            })
            //Fetch order details
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch order details";
            });
    },
});

export const { clearError, clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;