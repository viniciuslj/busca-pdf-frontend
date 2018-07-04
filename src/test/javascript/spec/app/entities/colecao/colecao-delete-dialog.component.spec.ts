/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BuscapdfTestModule } from '../../../test.module';
import { ColecaoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/colecao/colecao-delete-dialog.component';
import { ColecaoService } from '../../../../../../main/webapp/app/entities/colecao/colecao.service';

describe('Component Tests', () => {

    describe('Colecao Management Delete Component', () => {
        let comp: ColecaoDeleteDialogComponent;
        let fixture: ComponentFixture<ColecaoDeleteDialogComponent>;
        let service: ColecaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [ColecaoDeleteDialogComponent],
                providers: [
                    ColecaoService
                ]
            })
            .overrideTemplate(ColecaoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColecaoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColecaoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
