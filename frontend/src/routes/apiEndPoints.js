export const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const API_PREFIX = {
    auth : `${BASE_URL}/auth`,
    transactions : `${BASE_URL}/transactions`,

}

export const URLS = {
    changePassword : `${API_PREFIX.auth}/change-password`,
    deleteAccount : `${API_PREFIX.auth}/delete-account`,
    forgotPassword : `${API_PREFIX.auth}/forgot-password`,
    logout : `${API_PREFIX.auth}/logout`,
    isProtected : `${API_PREFIX.auth}/is_protected`,
    updateProfile : `${API_PREFIX.auth}/update-profile`,
    userDetails : `${API_PREFIX.auth}/user-details`,
    login : `${API_PREFIX.auth}/login`,
    resetPassword : `${API_PREFIX.auth}/reset-password`,
    signUp : `${API_PREFIX.auth}/signup`,
    verifyEmail : (token) => `${API_PREFIX.auth}/verify-email/${token}`,
    filterTransaction : `${API_PREFIX.transactions}/get-transactions/filter`,
    getTransaction : `${API_PREFIX.transactions}/get-transactions`,
    deleteTransaction : (id) => `${API_PREFIX.transactions}/delete-transaction/${id}`,

}