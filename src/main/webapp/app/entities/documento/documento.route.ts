import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DocumentoComponent } from './documento.component';
import { DocumentoDetailComponent } from './documento-detail.component';
import { DocumentoPopupComponent } from './documento-dialog.component';
import { DocumentoDeletePopupComponent } from './documento-delete-dialog.component';

export const documentoRoute: Routes = [
    {
        path: 'documento',
        component: DocumentoComponent,
        data: {
            authorities: ['ROLE_OPERATOR', 'ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.documento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'documento/:id',
        component: DocumentoDetailComponent,
        data: {
            authorities: ['ROLE_OPERATOR', 'ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.documento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentoPopupRoute: Routes = [
    {
        path: 'documento-new',
        component: DocumentoPopupComponent,
        data: {
            authorities: ['ROLE_OPERATOR', 'ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.documento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'documento/:id/edit',
        component: DocumentoPopupComponent,
        data: {
            authorities: ['ROLE_OPERATOR', 'ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.documento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'documento/:id/delete',
        component: DocumentoDeletePopupComponent,
        data: {
            authorities: ['ROLE_OPERATOR', 'ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.documento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
