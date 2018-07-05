import { BaseEntity } from './../../shared';

export class Documento implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public complementoDiretorio?: string,
        public nomeArquivo?: string,
        public diretorio?: BaseEntity,
    ) {
    }
}
