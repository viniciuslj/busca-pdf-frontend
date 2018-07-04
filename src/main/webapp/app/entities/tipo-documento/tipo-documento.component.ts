import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoDocumento } from './tipo-documento.model';
import { TipoDocumentoService } from './tipo-documento.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tipo-documento',
    templateUrl: './tipo-documento.component.html'
})
export class TipoDocumentoComponent implements OnInit, OnDestroy {
tipoDocumentos: TipoDocumento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoDocumentoService: TipoDocumentoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tipoDocumentoService.query().subscribe(
            (res: HttpResponse<TipoDocumento[]>) => {
                this.tipoDocumentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoDocumentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoDocumento) {
        return item.id;
    }
    registerChangeInTipoDocumentos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoDocumentoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
