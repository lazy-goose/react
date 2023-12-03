import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { type ListFields, initialListFields } from '../share/formState';

type UncontrolledFormState = {
  errors: ListFields;
  submit: ListFields;
  lastSubmitAt: number | null;
};

const initialState: UncontrolledFormState = {
  errors: initialListFields,
  submit: initialListFields,
  lastSubmitAt: null,
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setSubmitData: (state, action: PayloadAction<ListFields>) => {
      state.submit = action.payload;
      state.lastSubmitAt = Date.now();
    },
    setAllErrors: (state, action: PayloadAction<Partial<ListFields>>) => {
      state.errors = {
        ...initialListFields,
        ...action.payload,
      };
    },
  },
});

export { uncontrolledFormSlice, type UncontrolledFormState };
export const { setAllErrors, setSubmitData } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
