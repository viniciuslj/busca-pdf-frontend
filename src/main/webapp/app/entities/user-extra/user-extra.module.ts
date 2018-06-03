import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuscapdfSharedModule } from '../../shared';
import { BuscapdfAdminModule } from '../../admin/admin.module';
import {
    UserExtraService,
    UserExtraPopupService,
    UserExtraComponent,
    UserExtraDetailComponent,
    UserExtraDialogComponent,
    UserExtraPopupComponent,
    UserExtraDeletePopupComponent,
    UserExtraDeleteDialogComponent,
    userExtraRoute,
    userExtraPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userExtraRoute,
    ...userExtraPopupRoute,
];

@NgModule({
    imports: [
        BuscapdfSharedModule,
        BuscapdfAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserExtraComponent,
        UserExtraDetailComponent,
        UserExtraDialogComponent,
        UserExtraDeleteDialogComponent,
        UserExtraPopupComponent,
        UserExtraDeletePopupComponent,
    ],
    entryComponents: [
        UserExtraComponent,
        UserExtraDialogComponent,
        UserExtraPopupComponent,
        UserExtraDeleteDialogComponent,
        UserExtraDeletePopupComponent,
    ],
    providers: [
        UserExtraService,
        UserExtraPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuscapdfUserExtraModule {}
