import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuscapdfSharedModule } from '../../shared';
import {
    TipoDocumentoService,
    TipoDocumentoPopupService,
    TipoDocumentoComponent,
    TipoDocumentoDetailComponent,
    TipoDocumentoDialogComponent,
    TipoDocumentoPopupComponent,
    TipoDocumentoDeletePopupComponent,
    TipoDocumentoDeleteDialogComponent,
    tipoDocumentoRoute,
    tipoDocumentoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoDocumentoRoute,
    ...tipoDocumentoPopupRoute,
];

@NgModule({
    imports: [
        BuscapdfSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoDocumentoComponent,
        TipoDocumentoDetailComponent,
        TipoDocumentoDialogComponent,
        TipoDocumentoDeleteDialogComponent,
        TipoDocumentoPopupComponent,
        TipoDocumentoDeletePopupComponent,
    ],
    entryComponents: [
        TipoDocumentoComponent,
        TipoDocumentoDialogComponent,
        TipoDocumentoPopupComponent,
        TipoDocumentoDeleteDialogComponent,
        TipoDocumentoDeletePopupComponent,
    ],
    providers: [
        TipoDocumentoService,
        TipoDocumentoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuscapdfTipoDocumentoModule {}
