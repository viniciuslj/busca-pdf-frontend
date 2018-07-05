import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Diretorio } from './diretorio.model';
import { DiretorioPopupService } from './diretorio-popup.service';
import { DiretorioService } from './diretorio.service';
import { Banco, BancoService } from '../banco';

@Component({
    selector: 'jhi-diretorio-dialog',
    templateUrl: './diretorio-dialog.component.html'
})
export class DiretorioDialogComponent implements OnInit {

    diretorio: Diretorio;
    isSaving: boolean;

    bancos: Banco[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private diretorioService: DiretorioService,
        private bancoService: BancoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bancoService.query()
            .subscribe((res: HttpResponse<Banco[]>) => { this.bancos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.diretorio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.diretorioService.update(this.diretorio));
        } else {
            this.subscribeToSaveResponse(
                this.diretorioService.create(this.diretorio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Diretorio>>) {
        result.subscribe((res: HttpResponse<Diretorio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Diretorio) {
        this.eventManager.broadcast({ name: 'diretorioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBancoById(index: number, item: Banco) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-diretorio-popup',
    template: ''
})
export class DiretorioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diretorioPopupService: DiretorioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.diretorioPopupService
                    .open(DiretorioDialogComponent as Component, params['id']);
            } else {
                this.diretorioPopupService
                    .open(DiretorioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
