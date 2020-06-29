export const changeFont = (font) => {
    return {
        type: 'CHANGE_FONT',
        payload: {
            font
        }
    };
};

export const changeColor = (color) => {
    return {
        type: 'CHANGE_COLOR',
        payload: {
            color
        }
    };
};
