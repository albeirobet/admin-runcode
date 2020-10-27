export interface IResetPassRequest {
    password?: string;
    passwordConfirm?: string;
}

export class ResetPassRequest implements IResetPassRequest {
    constructor(
        public password?: string,
        public passwordConfirm?: string) {}
}