import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuscapdfSharedModule } from '../../shared';
import { BuscapdfAdminModule } from '../../admin/admin.module';
import {
    UserExtraService,
} from './';

const ENTITY_STATES = [

];

@NgModule({
    imports: [
        BuscapdfSharedModule,
        BuscapdfAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [

    ],
    entryComponents: [
    ],
    providers: [
        UserExtraService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuscapdfUserExtraModule {}
