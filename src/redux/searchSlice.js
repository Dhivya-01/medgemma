



import { createSlice } from "@reduxjs/toolkit";

// Current date
const currentDate = new Date();

// Yesterday's date
const startDate = new Date();
startDate.setDate(currentDate.getDate() - 1);

// Formatting current date
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
const currentDay = String(currentDate.getDate()).padStart(2, "0");
const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`;

// Formatting yesterday's date
const startYear = startDate.getFullYear();
const startMonth = String(startDate.getMonth() + 1).padStart(2, "0");
const startDay = String(startDate.getDate()).padStart(2, "0");
const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;

// Default initial state with start_date as yesterday and end_date as today
const defaultInitialState = {
  start_date: formattedStartDate,
  end_date: formattedCurrentDate,
  data_type: "All",
  confidence_flag: "All",
  approve_status: 'false',
  process_status: 'true',  // Default to 'true' for non-approved items
  page_number: 1,
  page_size: 100,
  bucket_type: "All",  // Add bucket_type to initial state
};

// Load saved state from localStorage or use default if none exists
const loadState = () => {
  try {
    const savedState = localStorage.getItem('dashboardSearchState');
    if (savedState === null) {
      return defaultInitialState;
    }
    return JSON.parse(savedState);
  } catch (err) {

    return defaultInitialState;
  }
};

// Initial state - either from localStorage or default
const initialState = loadState();

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearch: (state) => {
      localStorage.setItem('dashboardSearchState', JSON.stringify(defaultInitialState));
      return defaultInitialState;  // Properly reset the state
    },

    setSearch: (state, action) => {
      const {
        start_date = null,
        end_date = null,
        data_type = null,
        page_number = null,
        page_size = null,
        approve_status = null,
        confidence_flag = null,
        process_status = null,
        bucket_type = null,  // Add bucket_type here
      } = action.payload;

      if (start_date) state.start_date = start_date;
      if (end_date) state.end_date = end_date;
      if (data_type !== null) state.data_type = data_type;
      if (page_number !== null) state.page_number = page_number;
      if (page_size !== null) state.page_size = page_size;
      if (approve_status !== null) state.approve_status = approve_status;
      if (confidence_flag !== null) state.confidence_flag = confidence_flag;
      if (process_status !== null) state.process_status = process_status;
      if (bucket_type !== null) state.bucket_type = bucket_type;
      
      // Save the updated state to localStorage
      localStorage.setItem('dashboardSearchState', JSON.stringify(state));
    },
  },
});

export const { setSearch, resetSearch } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;