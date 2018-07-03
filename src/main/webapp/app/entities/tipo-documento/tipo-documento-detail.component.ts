import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TipoDocumento } from './tipo-documento.model';
import { TipoDocumentoService } from './tipo-documento.service';

@Component({
    selector: 'jhi-tipo-documento-detail',
    templateUrl: './tipo-documento-detail.component.html'
})
export class TipoDocumentoDetailComponent implements OnInit, OnDestroy {

    tipoDocumento: TipoDocumento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoDocumentoService: TipoDocumentoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoDocumentos();
    }

    load(id) {
        this.tipoDocumentoService.find(id)
            .subscribe((tipoDocumentoResponse: HttpResponse<TipoDocumento>) => {
                this.tipoDocumento = tipoDocumentoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoDocumentos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoDocumentoListModification',
            (response) => this.load(this.tipoDocumento.id)
        );
    }
}
