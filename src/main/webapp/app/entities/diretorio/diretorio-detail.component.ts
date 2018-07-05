import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Diretorio } from './diretorio.model';
import { DiretorioService } from './diretorio.service';

@Component({
    selector: 'jhi-diretorio-detail',
    templateUrl: './diretorio-detail.component.html'
})
export class DiretorioDetailComponent implements OnInit, OnDestroy {

    diretorio: Diretorio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private diretorioService: DiretorioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiretorios();
    }

    load(id) {
        this.diretorioService.find(id)
            .subscribe((diretorioResponse: HttpResponse<Diretorio>) => {
                this.diretorio = diretorioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiretorios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'diretorioListModification',
            (response) => this.load(this.diretorio.id)
        );
    }
}
