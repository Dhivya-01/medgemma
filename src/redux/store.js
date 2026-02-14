import { configureStore } from "@reduxjs/toolkit";

import { loadingReducer } from "./loadingSlice";
import { searchReducer } from "./searchSlice";
import { tableReducer } from "./tableSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    search: searchReducer,
    table: tableReducer,
  },
});
