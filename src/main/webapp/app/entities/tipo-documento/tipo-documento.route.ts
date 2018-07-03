import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TipoDocumentoComponent } from './tipo-documento.component';
import { TipoDocumentoDetailComponent } from './tipo-documento-detail.component';
import { TipoDocumentoPopupComponent } from './tipo-documento-dialog.component';
import { TipoDocumentoDeletePopupComponent } from './tipo-documento-delete-dialog.component';

export const tipoDocumentoRoute: Routes = [
    {
        path: 'tipo-documento',
        component: TipoDocumentoComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-documento/:id',
        component: TipoDocumentoDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoDocumentoPopupRoute: Routes = [
    {
        path: 'tipo-documento-new',
        component: TipoDocumentoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-documento/:id/edit',
        component: TipoDocumentoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-documento/:id/delete',
        component: TipoDocumentoDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.tipoDocumento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
