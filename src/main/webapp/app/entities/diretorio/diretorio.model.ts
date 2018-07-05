import { BaseEntity } from './../../shared';

export class Diretorio implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public path?: string,
        public banco?: BaseEntity,
    ) {
    }
}
