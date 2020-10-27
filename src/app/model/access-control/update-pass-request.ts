export interface IUpdatePassRequest {
    _id?: string;
    passwordCurrent?: string;
    password?: string;
    passwordConfirm?: string;
}

export class UpdatePassRequest implements IUpdatePassRequest {
    constructor(
        public _id?: string,
        public passwordCurrent?: string,
        public password?: string,
        public passwordConfirm?: string
        ) {}
}