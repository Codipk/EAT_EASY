// slices/expenseSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setAllExpenses: (state, action) => {
      state.expenses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setProductName: (state, action) => {
      state.expenses.productName = action.payload;
    },
    setProductDescription: (state, action) => {
      state.expenses.productDescription = action.payload;
    },
    setProductQuantity: (state, action) => {
      state.expenses.productQuantity = action.payload;
    },
    setProductPrice: (state, action) => {
      state.expenses.productPrice = action.payload;
    },

    resetExpense: (state) => {
      state.expenses = initialState.expenses;
      state.error = null;
    },
    setTotalExpense: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const {
  startLoading,
  setExpenses,
  setProductName,
  setProductDescription,
  setProductQuantity,
  setProductPrice,
  setError,
  resetExpense,
  setAllExpenses,
  setTotalExpense,
} = expenseSlice.actions;

export const selectExpenses = (state) => state.expense.expenses;
export const selectLoading = (state) => state.expense.loading;
export const selectError = (state) => state.expense.error;

export default expenseSlice.reducer;
