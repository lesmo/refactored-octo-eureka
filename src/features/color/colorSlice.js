import { createSlice } from '@reduxjs/toolkit'

const colorsList = [
  '#f00',
  '#0f0',
  '#00f',
  '#ff0',
  '#0ff',
  '#f0f',
  '#fff',
  '#000',
];

export const colorSlice = createSlice({
  name: 'color',
  initialState: {
    color: colorsList[0],
    colorHistoryIndex: 0,
    colorHistory: []
  },
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
      state.colorHistory = [
        ...state.colorHistory.slice(0, state.colorHistoryIndex),
        action.payload
      ];
      state.colorHistoryIndex = state.colorHistoryIndex + 1;
    },
    setPrevColor: (state, action) => {
      const i = state.colorHistoryIndex - 1;
      if (i < 0) return;

      state.colorHistoryIndex = i;
      state.color = state.colorHistory[i];
    },
    setNextColor: (state, action) => {
      const i = state.colorHistoryIndex + 1;
      if (i >= colorsList.length) return;

      state.colorHistoryIndex = i;
      state.color = state.colorHistory[i];
    },
    setRandomColor: (state, action) => {
      const i = Math.floor(Math.random() * colorsList.length);
      state.color = colorsList[i];
      state.colorHistoryIndex = state.colorHistory.length;
      state.colorHistory = [...state.colorHistory, colorsList[i]];
    }
  },
})

export const actions = colorSlice.actions;

export default colorSlice.reducer;
