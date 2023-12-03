import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { type ListFields, initialListFields } from '../share/formState';

type ReactHookFormState = {
  submit: ListFields;
  lastSubmitAt: number | null;
};

const initialState: ReactHookFormState = {
  submit: initialListFields,
  lastSubmitAt: null,
};

const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    setSubmitData: (state, action: PayloadAction<ListFields>) => {
      state.submit = action.payload;
      state.lastSubmitAt = Date.now();
    },
  },
});

export { reactHookFormSlice, type ReactHookFormState };
export const { setSubmitData } = reactHookFormSlice.actions;
export default reactHookFormSlice.reducer;
