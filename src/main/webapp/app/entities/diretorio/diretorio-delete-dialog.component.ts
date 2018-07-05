import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Diretorio } from './diretorio.model';
import { DiretorioPopupService } from './diretorio-popup.service';
import { DiretorioService } from './diretorio.service';

@Component({
    selector: 'jhi-diretorio-delete-dialog',
    templateUrl: './diretorio-delete-dialog.component.html'
})
export class DiretorioDeleteDialogComponent {

    diretorio: Diretorio;

    constructor(
        private diretorioService: DiretorioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diretorioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'diretorioListModification',
                content: 'Deleted an diretorio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-diretorio-delete-popup',
    template: ''
})
export class DiretorioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diretorioPopupService: DiretorioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.diretorioPopupService
                .open(DiretorioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
