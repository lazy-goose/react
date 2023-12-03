import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { type ListFields, initialListFields } from '../share/formState';

type ReactHookFormState = {
  submit: ListFields;
};

const initialState: ReactHookFormState = {
  submit: initialListFields,
};

const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    setSubmitData: (state, action: PayloadAction<ListFields>) => {
      state.submit = action.payload;
    },
  },
});

export { reactHookFormSlice, type ReactHookFormState };
export const { setSubmitData } = reactHookFormSlice.actions;
export default reactHookFormSlice.reducer;
