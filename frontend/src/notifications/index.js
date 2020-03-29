export const Index = {
    SHOW_MESSAGE  : 'NOTIFICATIONS/SHOW_MESSAGE',
    SHOW_ERROR    : 'NOTIFICATIONS/SHOW_ERROR',
    SHOW_WARNING  : 'NOTIFICATIONS/SHOW_WARNING',
    SHOW_SUCCESS  : 'NOTIFICATIONS/SHOW_SUCCESS',
};

export const getWallet         = () => ({type: SCATTER_ACTIONS.GET_WALLET});
export const errorGettingWallet= payload => ({type: SCATTER_ACTIONS.GET_WALLET_ERROR, payload});
export const setWallet         = payload => ({type: SCATTER_ACTIONS.SET_WALLET, payload});