import { configureStore } from '@reduxjs/toolkit';
import uncontrolledForm from './slices/uncontrolledForm';
import reactHookForm from './slices/reactHookForm';

const store = configureStore({
  reducer: {
    uncontrolledForm,
    reactHookForm,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, type RootState, type AppDispatch };
