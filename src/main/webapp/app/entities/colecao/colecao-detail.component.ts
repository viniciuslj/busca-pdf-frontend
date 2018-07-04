import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Colecao } from './colecao.model';
import { ColecaoService } from './colecao.service';

@Component({
    selector: 'jhi-colecao-detail',
    templateUrl: './colecao-detail.component.html'
})
export class ColecaoDetailComponent implements OnInit, OnDestroy {

    colecao: Colecao;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private colecaoService: ColecaoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInColecaos();
    }

    load(id) {
        this.colecaoService.find(id)
            .subscribe((colecaoResponse: HttpResponse<Colecao>) => {
                this.colecao = colecaoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInColecaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'colecaoListModification',
            (response) => this.load(this.colecao.id)
        );
    }
}
