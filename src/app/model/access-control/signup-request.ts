export interface ISignUpRequest {
    name?: string;
    lastname?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

export class SignUpRequest implements ISignUpRequest {
    constructor(public name?: string,
        public lastname?: string,
        public email?: string,
        public password?: string,
        public passwordConfirm?: string) {}
}