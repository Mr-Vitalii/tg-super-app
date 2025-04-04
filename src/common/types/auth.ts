/* export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}; */

export type RegisterFormData = {
  firstName: string;

};

export type SignInFormData = {
  email: string;
  password: string;
};

export type ErrorResponse = {
  message: string;
}