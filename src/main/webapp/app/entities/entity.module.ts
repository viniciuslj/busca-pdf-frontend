import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BuscapdfUserExtraModule } from './user-extra/user-extra.module';
import { BuscapdfBancoModule } from './banco/banco.module';
import { BuscapdfDiretorioModule } from './diretorio/diretorio.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BuscapdfUserExtraModule,
        BuscapdfBancoModule,
        BuscapdfDiretorioModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuscapdfEntityModule {}
