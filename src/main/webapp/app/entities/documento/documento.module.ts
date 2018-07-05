import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {ButtonModule} from 'primeng/button';

import { BuscapdfSharedModule } from '../../shared';
import {
    DocumentoService,
    DocumentoPopupService,
    DocumentoComponent,
    DocumentoDetailComponent,
    DocumentoDialogComponent,
    DocumentoPopupComponent,
    DocumentoDeletePopupComponent,
    DocumentoDeleteDialogComponent,
    documentoRoute,
    documentoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...documentoRoute,
    ...documentoPopupRoute,
];

@NgModule({
    imports: [
        BuscapdfSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        ButtonModule
    ],
    declarations: [
        DocumentoComponent,
        DocumentoDetailComponent,
        DocumentoDialogComponent,
        DocumentoDeleteDialogComponent,
        DocumentoPopupComponent,
        DocumentoDeletePopupComponent,
    ],
    entryComponents: [
        DocumentoComponent,
        DocumentoDialogComponent,
        DocumentoPopupComponent,
        DocumentoDeleteDialogComponent,
        DocumentoDeletePopupComponent,
    ],
    providers: [
        DocumentoService,
        DocumentoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuscapdfDocumentoModule {}
