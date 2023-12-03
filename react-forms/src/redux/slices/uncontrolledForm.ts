import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FormElements as F } from '../../constants/formElements';

type UncontrolledFormState = {
  errors: {
    [F.name.field]: string;
    [F.age.field]: string;
    [F.email.field]: string;
    [F.passwordGroup.field.password]: string;
    [F.passwordGroup.field.passwordConfirm]: string;
    [F.gender.field]: string;
    [F.terms.field]: string;
    [F.picture.field]: string;
    [F.country.field]: string;
  };
};

const initialState: UncontrolledFormState = {
  errors: {
    [F.name.field]: '',
    [F.age.field]: '',
    [F.email.field]: '',
    [F.passwordGroup.field.password]: '',
    [F.passwordGroup.field.passwordConfirm]: '',
    [F.gender.field]: '',
    [F.terms.field]: '',
    [F.picture.field]: '',
    [F.country.field]: '',
  },
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setErrors: (
      state,
      action: PayloadAction<Partial<UncontrolledFormState['errors']>>
    ) => {
      state.errors = {
        ...initialState.errors,
        ...action.payload,
      };
    },
  },
});

export { uncontrolledFormSlice, type UncontrolledFormState };
export const { setErrors } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
