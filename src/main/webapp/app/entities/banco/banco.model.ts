import { BaseEntity } from './../../shared';

export class Banco implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public indice?: string,
        public notificacao?: boolean,
        public ativo?: boolean,
    ) {
        this.notificacao = false;
        this.ativo = false;
    }
}
