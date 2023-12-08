import { createSlice } from '@reduxjs/toolkit';
import countries from '../../constants/countries';

type AllCountriesState = typeof countries;

const initialState = countries;

const allCountries = createSlice({
  name: 'allCountries',
  initialState,
  reducers: {},
});

export { allCountries as reactHookFormSlice, type AllCountriesState };
export const {} = allCountries.actions;
export default allCountries.reducer;
