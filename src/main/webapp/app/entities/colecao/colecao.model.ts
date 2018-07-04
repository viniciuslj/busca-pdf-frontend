import { BaseEntity } from './../../shared';

export class Colecao implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public ativa?: boolean,
    ) {
        this.ativa = false;
    }
}
