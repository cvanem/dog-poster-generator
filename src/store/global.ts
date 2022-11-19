import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from './store';
import { isEmpty, uuid } from '../helpers';

export interface GlobalState {
  breeds?: any;
  images?: any;
  selected?: any;
  loading?: boolean;
  error?: any;
  open?: boolean; // Open state for images modal
}

export interface SelectBreed {
  id?: string;
  breed?: string;
  subBreed?: string;
  count?: number;
}

const initialState: GlobalState = {
  breeds: {},
  images: [],
  selected: { [uuid()]: { count: 1 } }, // Initialize first row
  loading: false,
  error: undefined,
  open: false
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<GlobalState>) => ({
      ...state,
      ...action.payload
    }),
    select: (state, action: PayloadAction<SelectBreed>) => ({
      ...state,
      selected: {
        ...state.selected,
        [action.payload.id]: {
          ...state.selected[action.payload.id],
          ...action.payload,
          count: [action.payload?.count, state.selected[action.payload.id]?.count, 1].filter(v => !isEmpty(v))[0] // Auto-set count to 1 by default
        }
      }
    }),
    remove: (state, action: PayloadAction<SelectBreed>) => ({
      ...state,
      selected: Object.keys(state.selected)
        .filter(k => k !== action.payload.id)
        .reduce((t, c) => ({ ...t, [c]: state.selected[c] }), {})
    })
  }
});

export const { update } = globalSlice.actions;

export const useUpdateState = () => {
  const dispatch = useAppDispatch();
  return React.useCallback((payload: GlobalState) => dispatch(globalSlice.actions.update(payload)), [dispatch]);
};

export const useSelectBreed = () => {
  const dispatch = useAppDispatch();
  return React.useCallback(
    (payload: SelectBreed) => dispatch(globalSlice.actions.select({ ...payload, id: payload.id ?? uuid() })), // auto-assign an id if not provided
    [dispatch]
  );
};

export const useRemoveBreed = () => {
  const dispatch = useAppDispatch();
  return React.useCallback((payload: SelectBreed) => dispatch(globalSlice.actions.remove(payload)), [dispatch]);
};
