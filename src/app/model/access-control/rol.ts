export interface IRol {
    _id?: string;
    name?: string;
    description?: string;
    active?: Boolean;
}

export class Rol implements IRol {
    constructor(
        public _id?: string,
        public name?: string,
        public description?: string,
        public active?: Boolean) {}
}