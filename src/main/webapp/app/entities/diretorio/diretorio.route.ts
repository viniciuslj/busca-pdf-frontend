import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DiretorioComponent } from './diretorio.component';
import { DiretorioDetailComponent } from './diretorio-detail.component';
import { DiretorioPopupComponent } from './diretorio-dialog.component';
import { DiretorioDeletePopupComponent } from './diretorio-delete-dialog.component';

@Injectable()
export class DiretorioResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const diretorioRoute: Routes = [
    {
        path: 'diretorio',
        component: DiretorioComponent,
        resolve: {
            'pagingParams': DiretorioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.diretorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'diretorio/:id',
        component: DiretorioDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.diretorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diretorioPopupRoute: Routes = [
    {
        path: 'diretorio-new',
        component: DiretorioPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.diretorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'diretorio/:id/edit',
        component: DiretorioPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.diretorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'diretorio/:id/delete',
        component: DiretorioDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'buscapdfApp.diretorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
