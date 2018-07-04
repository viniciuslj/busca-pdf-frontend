import { BaseEntity } from './../../shared';

export class TipoDocumento implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public diretorio?: string,
        public divisaoAnual?: boolean,
        public pesquisaAutomatica?: boolean,
    ) {
        this.divisaoAnual = false;
        this.pesquisaAutomatica = false;
    }
}
