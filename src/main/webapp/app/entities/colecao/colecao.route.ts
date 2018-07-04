import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ColecaoComponent } from './colecao.component';
import { ColecaoDetailComponent } from './colecao-detail.component';
import { ColecaoPopupComponent } from './colecao-dialog.component';
import { ColecaoDeletePopupComponent } from './colecao-delete-dialog.component';

export const colecaoRoute: Routes = [
    {
        path: 'colecao',
        component: ColecaoComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.colecao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'colecao/:id',
        component: ColecaoDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.colecao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const colecaoPopupRoute: Routes = [
    {
        path: 'colecao-new',
        component: ColecaoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.colecao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colecao/:id/edit',
        component: ColecaoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.colecao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colecao/:id/delete',
        component: ColecaoDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.colecao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
