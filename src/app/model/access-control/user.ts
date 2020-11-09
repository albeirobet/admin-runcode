export interface IUser {
    _id?: string;
    name?: string;
    lastname?: string;
    email?: string;
    photo?: string;
    password?: string;
    passwordConfirm?: string;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    active?: Boolean;
    token?: string;
    authorities?: string[];
    companyId?: string;
}

export class User implements IUser {
    constructor(
        public _id?: string,
        public name?: string,
        public lastname?: string,
        public email?: string,
        public photo?: string,
        public password?: string,
        public passwordConfirm?: string,
        public passwordChangedAt?: Date,
        public passwordResetToken?: string,
        public passwordResetExpires?: Date,
        public active?: Boolean,
        public token?: string,
        public authorities?: string[],
        public companyId?: string) {}
}