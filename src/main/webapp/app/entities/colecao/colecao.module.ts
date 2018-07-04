import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuscapdfSharedModule } from '../../shared';
import {
    ColecaoService,
    ColecaoPopupService,
    ColecaoComponent,
    ColecaoDetailComponent,
    ColecaoDialogComponent,
    ColecaoPopupComponent,
    ColecaoDeletePopupComponent,
    ColecaoDeleteDialogComponent,
    colecaoRoute,
    colecaoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...colecaoRoute,
    ...colecaoPopupRoute,
];

@NgModule({
    imports: [
        BuscapdfSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ColecaoComponent,
        ColecaoDetailComponent,
        ColecaoDialogComponent,
        ColecaoDeleteDialogComponent,
        ColecaoPopupComponent,
        ColecaoDeletePopupComponent,
    ],
    entryComponents: [
        ColecaoComponent,
        ColecaoDialogComponent,
        ColecaoPopupComponent,
        ColecaoDeleteDialogComponent,
        ColecaoDeletePopupComponent,
    ],
    providers: [
        ColecaoService,
        ColecaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuscapdfColecaoModule {}
