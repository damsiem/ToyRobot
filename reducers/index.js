import * as constant from '../actions/Constant';

import { combineReducers } from 'redux';
import { LEFT_OF, LEFT, RIGHT_OF, DIRECTION_OF } from '../actions/Constant';
export const initialState = {cols: 5, rows: 5, x: -1, y: -1, direction: 'NONE', unit: 0, isPlaced: false};

export const toyRobotReducers =(state=initialState, action) => {
    let data = action.data;

    switch (action.type){

        case constant.PLACE:

            return {...state, ...data, isPlaced: true};
        case constant.LEFT:

            return {...state, direction: LEFT_OF[state.direction]};
        case constant.RIGHT:
            return {...state, direction: RIGHT_OF[state.direction]};
        case constant.MOVE:
            const {x, y, direction} = state;
            return {...state, x: x + DIRECTION_OF[direction].dx * data.unit, y: y + DIRECTION_OF[direction].dy * data.unit}
        case constant.INIT_TABLE:

            return {...state, cols: data.cols, rows: data.rows};
    }
    return state;
}
const rootReducers = combineReducers({

    toyRobot: toyRobotReducers,
});
export default rootReducers;