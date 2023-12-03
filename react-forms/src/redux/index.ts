import { configureStore } from '@reduxjs/toolkit';
import uncontrolledForm from './slices/uncontrolledForm';

const store = configureStore({
  reducer: {
    uncontrolledForm,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, type RootState, type AppDispatch };
