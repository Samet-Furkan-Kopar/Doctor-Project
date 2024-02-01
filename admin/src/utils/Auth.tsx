export const getCurrentUser = () => {
    let user = null;
    try {
        user = localStorage.getItem('current_user') != null ? JSON.parse(localStorage.getItem('current_user') || '{}') : null;
    } catch (error) {
        console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
        user = null;
    }
    return user;
};

export const getUserToken = () => {
    let token = null;
    let tokenObj = null;
    try {
        tokenObj = localStorage.getItem('current_user') != null ? JSON.parse(localStorage.getItem('current_user') || '{}') : null;
        token = tokenObj != null ? tokenObj.uid : null;
    } catch (error) {
        console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
        token = null;
    }
    return token;
};

export const setCurrentUser = (user: any) => {
    try {
        if (user) {
            localStorage.setItem('current_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('current_user');
        }
    } catch (error) {
        console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
    }
};
