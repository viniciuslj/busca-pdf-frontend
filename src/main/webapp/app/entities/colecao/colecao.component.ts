import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Colecao } from './colecao.model';
import { ColecaoService } from './colecao.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-colecao',
    templateUrl: './colecao.component.html'
})
export class ColecaoComponent implements OnInit, OnDestroy {
colecaos: Colecao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private colecaoService: ColecaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.colecaoService.query().subscribe(
            (res: HttpResponse<Colecao[]>) => {
                this.colecaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInColecaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Colecao) {
        return item.id;
    }
    registerChangeInColecaos() {
        this.eventSubscriber = this.eventManager.subscribe('colecaoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
