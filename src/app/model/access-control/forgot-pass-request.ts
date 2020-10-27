export interface IForgotPassRequest {
    email?: string;
}

export class ForgotPassRequest implements IForgotPassRequest {
    constructor(
        public email?: string) {}
}