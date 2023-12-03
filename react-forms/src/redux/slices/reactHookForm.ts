import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import initialState, { type FormState } from '../share/formState';

const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    setSubmitData: (state, action: PayloadAction<FormState['submit']>) => {
      state.submit = action.payload;
    },
  },
});

export { reactHookFormSlice, type FormState as ReactHookFormState };
export const { setSubmitData } = reactHookFormSlice.actions;
export default reactHookFormSlice.reducer;
