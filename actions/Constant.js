export const PLACE = 'PLACE';

export const RIGHT = 'RIGHT';// RIGHT
export const LEFT = 'LEFT';// LEFT
export const MOVE = 'MOVE';

export const INIT_TABLE = 'INIT_TABLE';

export const EAST = 'EAST';
export const WEST = 'WEST';
export const NORTH = 'NORTH';
export const SOUTH = 'SOUTH';

export const RIGHT_OF = {
    EAST: "SOUTH",
    SOUTH: "WEST",
    WEST: "NORTH",
    NORTH: "EAST"
};
export const LEFT_OF ={
    EAST: "NORTH",
    SOUTH: "EAST",
    WEST: "SOUTH",
    NORTH: "WEST"
}

export const DIRECTION_OF = {
    EAST: {dx: 0, dy:1},
    SOUTH: {dx: 1, dy:0},
    WEST: {dx: 0, dy:-1},
    NORTH: {dx: -1, dy:0},
    NONE: {dx: 0, dy:0}
}