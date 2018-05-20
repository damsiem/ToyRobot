import * as constant from './Constant';
export const initTable = (data) => {
    return {
        type: constant.INIT_TABLE,
        data
    }
}
export const place = (data) => {
    return {
        type: constant.PLACE,
        data
    }
}
export const left = (data) => {
    return {
        type: constant.LEFT,
        data
    }
}

export const right = (data) => {
    return {
        type: constant.RIGHT,
        data
    }
}

export const up = (data) => {
    return {
        type: constant.NORTH,
        data
    }
}

export const down = (data) => {
    return {
        type: constant.SOUTH,
        data
    }
}

export const move = (data) => {
    return {
        type: constant.MOVE,
        data
    }
}