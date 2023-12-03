import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import initialState, { type FormState } from '../share/formState';

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setSubmitData: (state, action: PayloadAction<FormState['submit']>) => {
      state.submit = action.payload;
    },
    setAllErrors: (
      state,
      action: PayloadAction<Partial<FormState['errors']>>
    ) => {
      state.errors = {
        ...initialState.errors,
        ...action.payload,
      };
    },
  },
});

export { uncontrolledFormSlice, type FormState as UncontrolledFormState };
export const { setAllErrors, setSubmitData } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
