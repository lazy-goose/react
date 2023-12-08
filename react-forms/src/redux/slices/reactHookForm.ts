import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { type ListFields, initialListFields } from '../share/formState';

type ReactHookFormState = {
  values: ListFields;
  errors: ListFields;
  submit: ListFields;
  lastSubmitAt: number | null;
};

const initialState: ReactHookFormState = {
  values: initialListFields,
  errors: initialListFields,
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
    setPartialErrors: (state, action: PayloadAction<Partial<ListFields>>) => {
      state.errors = {
        ...initialListFields,
        ...action.payload,
      };
    },
    setPartialFormValues: (
      state,
      action: PayloadAction<Partial<ListFields>>
    ) => {
      state.values = {
        ...state.values,
        ...action.payload,
      };
    },
  },
});

export { reactHookFormSlice, type ReactHookFormState };
export const { setSubmitData, setPartialErrors, setPartialFormValues } =
  reactHookFormSlice.actions;
export default reactHookFormSlice.reducer;
