import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
    groups: string[],
}

const initialState: TaskState = {
    groups: [],
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setGroups: (state, { payload }: PayloadAction<TaskState['groups']>) => {
            state.groups = [ ...payload ];
        },
    }
});

export const { setGroups } = taskSlice.actions;

export default taskSlice.reducer;