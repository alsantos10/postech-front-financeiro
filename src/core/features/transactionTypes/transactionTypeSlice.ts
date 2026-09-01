import { TRANSACTION_OPTIONS } from "@/core/entities/Transactions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: TRANSACTION_OPTIONS
}

const transactionTypeSlice = createSlice({
    name: "transactionTypes",
    initialState,
    reducers: {}
});

export default transactionTypeSlice.reducer;