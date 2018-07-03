import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoDocumento } from './tipo-documento.model';
import { TipoDocumentoPopupService } from './tipo-documento-popup.service';
import { TipoDocumentoService } from './tipo-documento.service';

@Component({
    selector: 'jhi-tipo-documento-dialog',
    templateUrl: './tipo-documento-dialog.component.html'
})
export class TipoDocumentoDialogComponent implements OnInit {

    tipoDocumento: TipoDocumento;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tipoDocumentoService: TipoDocumentoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipoDocumento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoDocumentoService.update(this.tipoDocumento));
        } else {
            this.subscribeToSaveResponse(
                this.tipoDocumentoService.create(this.tipoDocumento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TipoDocumento>>) {
        result.subscribe((res: HttpResponse<TipoDocumento>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoDocumento) {
        this.eventManager.broadcast({ name: 'tipoDocumentoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tipo-documento-popup',
    template: ''
})
export class TipoDocumentoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoDocumentoPopupService: TipoDocumentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoDocumentoPopupService
                    .open(TipoDocumentoDialogComponent as Component, params['id']);
            } else {
                this.tipoDocumentoPopupService
                    .open(TipoDocumentoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
