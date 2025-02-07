export const CONSTANTS = {
  API_URL: 'http://localhost:5000',
}

export const API_ENDPOINTS = {
  LOGIN: '/api/firms/login',
  REGISTER: '/api/firms/register',
  UPDATE: '/api/firms/firm',
  GET_FIRM: '/api/firms/firm',
  LOGOUT: '/api/firms/logout'
};

export const ERROR_MESSAGES = {
  PASSWORDS_DO_NOT_MATCH: 'The passwords do not match. Please try again.',
  ERROR_LOGIN : 'An error occurred while logging in the firm. Please try again later.',
  ERROR_REGISTER : 'An error occurred while registering the firm. Please try again later.',
  ERROR_UPDATE : 'An error occurred while updating the firm. Please try again later.',
  PASSWORD_TOO_SHORT: 'The password is too short. It must be at least 8 characters long.',
  PASSWORD_NO_UPPERCASE: 'The password must contain at least one uppercase letter.',
  PASSWORD_NO_LOWERCASE: 'The password must contain at least one lowercase letter.',
  PASSWORD_NO_NUMBER: 'The password must contain at least one number.',
  PASSWORD_NO_SPECIAL_CHAR: 'The password must contain at least one special character (!@#$%^&*).',
  ERROR_FETCHING_FIRM_DETAILS: 'Error fetching firm details'
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Firm logged in successfully',
  REGISTER_SUCCESS: 'Firm registered successfully',
  UPDATE_SUCCESS: 'Firm updated successfully'
};

export const ROUTES = {
  STOCK: 'stock',
  TRANSACTIONS: 'transactions',
  LOGIN: 'login',
  REGISTER: 'register',
  UPDATE: 'update'
};

export const COOKIE_NAMES = {
  AUTH: 'authToken'
};