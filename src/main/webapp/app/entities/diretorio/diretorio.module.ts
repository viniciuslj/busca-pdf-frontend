import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuscapdfSharedModule } from '../../shared';
import {
    DiretorioService,
    DiretorioPopupService,
    DiretorioComponent,
    DiretorioDetailComponent,
    DiretorioDialogComponent,
    DiretorioPopupComponent,
    DiretorioDeletePopupComponent,
    DiretorioDeleteDialogComponent,
    diretorioRoute,
    diretorioPopupRoute,
    DiretorioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...diretorioRoute,
    ...diretorioPopupRoute,
];

@NgModule({
    imports: [
        BuscapdfSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiretorioComponent,
        DiretorioDetailComponent,
        DiretorioDialogComponent,
        DiretorioDeleteDialogComponent,
        DiretorioPopupComponent,
        DiretorioDeletePopupComponent,
    ],
    entryComponents: [
        DiretorioComponent,
        DiretorioDialogComponent,
        DiretorioPopupComponent,
        DiretorioDeleteDialogComponent,
        DiretorioDeletePopupComponent,
    ],
    providers: [
        DiretorioService,
        DiretorioPopupService,
        DiretorioResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuscapdfDiretorioModule {}
