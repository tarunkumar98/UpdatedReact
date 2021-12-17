import { createSelector } from 'reselect';

const selectPost=state=>state.postcart;

export const selectPostCart=createSelector(
    [selectPost],
    postcart=>postcart.postcart
)
export const selectPostHidden=createSelector(
    [selectPost],
    postcart=>postcart.hidden
)
