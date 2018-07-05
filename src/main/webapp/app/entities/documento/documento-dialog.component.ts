import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Documento } from './documento.model';
import { DocumentoPopupService } from './documento-popup.service';
import { DocumentoService } from './documento.service';
import { Diretorio, DiretorioService } from '../diretorio';
import { Message } from 'primeng/components/common/message';

@Component({
    selector: 'jhi-documento-dialog',
    templateUrl: './documento-dialog.component.html'
})
export class DocumentoDialogComponent implements OnInit {

    documento: Documento;
    isSaving: boolean;

    diretorios: Diretorio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentoService: DocumentoService,
        private diretorioService: DiretorioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.diretorioService.query()
            .subscribe((res: HttpResponse<Diretorio[]>) => { this.diretorios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.documento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentoService.update(this.documento));
        } else {
            this.subscribeToSaveResponse(
                this.documentoService.create(this.documento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Documento>>) {
        result.subscribe((res: HttpResponse<Documento>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Documento) {
        this.eventManager.broadcast({ name: 'documentoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDiretorioById(index: number, item: Diretorio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-documento-popup',
    template: ''
})
export class DocumentoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    msgs: Message[];
    uploadedFiles: any[] = [];
    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    constructor(
        private route: ActivatedRoute,
        private documentoPopupService: DocumentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentoPopupService
                    .open(DocumentoDialogComponent as Component, params['id']);
            } else {
                this.documentoPopupService
                    .open(DocumentoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
