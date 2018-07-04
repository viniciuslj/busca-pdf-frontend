import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Colecao } from './colecao.model';
import { ColecaoPopupService } from './colecao-popup.service';
import { ColecaoService } from './colecao.service';

@Component({
    selector: 'jhi-colecao-delete-dialog',
    templateUrl: './colecao-delete-dialog.component.html'
})
export class ColecaoDeleteDialogComponent {

    colecao: Colecao;

    constructor(
        private colecaoService: ColecaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.colecaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'colecaoListModification',
                content: 'Deleted an colecao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-colecao-delete-popup',
    template: ''
})
export class ColecaoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colecaoPopupService: ColecaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.colecaoPopupService
                .open(ColecaoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
