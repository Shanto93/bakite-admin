import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {},
});

export const {} = agentSlice.actions;
export default agentSlice.reducer;
