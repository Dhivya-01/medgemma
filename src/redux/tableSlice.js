import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  totalItemCount: 0,
  firstDataId: null,
  lastDataId: null,
  currentId: null,
  currentStatus: null,
  index: 0,
};

const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setTableData: (state, action) => {
      const {
        data = null,
        totalItemCount = null,
        firstDataId = null,
        lastDataId = null,
        currentId = null,
        currentStatus,
        index,
      } = action.payload;

      if (data) state.data = data;
      if (totalItemCount) state.totalItemCount = totalItemCount;
      if (firstDataId) state.firstDataId = firstDataId;
      if (lastDataId) state.lastDataId = lastDataId;
      if (currentId) state.currentId = currentId;
      if (currentStatus !== undefined) state.currentStatus = currentStatus;
      if (index !== undefined) state.index = index;
    },
  },
});

export const { setTableData } = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
