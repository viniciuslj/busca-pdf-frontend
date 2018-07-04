import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoDocumento } from './tipo-documento.model';
import { TipoDocumentoPopupService } from './tipo-documento-popup.service';
import { TipoDocumentoService } from './tipo-documento.service';

@Component({
    selector: 'jhi-tipo-documento-delete-dialog',
    templateUrl: './tipo-documento-delete-dialog.component.html'
})
export class TipoDocumentoDeleteDialogComponent {

    tipoDocumento: TipoDocumento;

    constructor(
        private tipoDocumentoService: TipoDocumentoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoDocumentoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoDocumentoListModification',
                content: 'Deleted an tipoDocumento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-documento-delete-popup',
    template: ''
})
export class TipoDocumentoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoDocumentoPopupService: TipoDocumentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoDocumentoPopupService
                .open(TipoDocumentoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
