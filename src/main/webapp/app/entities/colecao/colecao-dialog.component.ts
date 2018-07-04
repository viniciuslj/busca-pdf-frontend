import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Colecao } from './colecao.model';
import { ColecaoPopupService } from './colecao-popup.service';
import { ColecaoService } from './colecao.service';

@Component({
    selector: 'jhi-colecao-dialog',
    templateUrl: './colecao-dialog.component.html'
})
export class ColecaoDialogComponent implements OnInit {

    colecao: Colecao;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private colecaoService: ColecaoService,
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
        if (this.colecao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.colecaoService.update(this.colecao));
        } else {
            this.subscribeToSaveResponse(
                this.colecaoService.create(this.colecao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Colecao>>) {
        result.subscribe((res: HttpResponse<Colecao>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Colecao) {
        this.eventManager.broadcast({ name: 'colecaoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-colecao-popup',
    template: ''
})
export class ColecaoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colecaoPopupService: ColecaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.colecaoPopupService
                    .open(ColecaoDialogComponent as Component, params['id']);
            } else {
                this.colecaoPopupService
                    .open(ColecaoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
