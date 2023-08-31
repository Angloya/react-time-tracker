import { configureStore } from '@reduxjs/toolkit';
import userReduser from './user';
import taskReduser from './task';

const store = configureStore({
    reducer: {
        user: userReduser,
        task: taskReduser
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store;