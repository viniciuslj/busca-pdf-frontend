import { BaseEntity, User } from './../../shared';

export class UserExtra implements BaseEntity {
    constructor(
        public id?: number,
        public cpf?: string,
        public rg?: number,
        public functionalNumber?: number,
        public user?: User,
    ) {
    }
}
