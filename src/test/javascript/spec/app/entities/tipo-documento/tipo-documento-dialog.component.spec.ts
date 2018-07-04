/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BuscapdfTestModule } from '../../../test.module';
import { TipoDocumentoDialogComponent } from '../../../../../../main/webapp/app/entities/tipo-documento/tipo-documento-dialog.component';
import { TipoDocumentoService } from '../../../../../../main/webapp/app/entities/tipo-documento/tipo-documento.service';
import { TipoDocumento } from '../../../../../../main/webapp/app/entities/tipo-documento/tipo-documento.model';

describe('Component Tests', () => {

    describe('TipoDocumento Management Dialog Component', () => {
        let comp: TipoDocumentoDialogComponent;
        let fixture: ComponentFixture<TipoDocumentoDialogComponent>;
        let service: TipoDocumentoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [TipoDocumentoDialogComponent],
                providers: [
                    TipoDocumentoService
                ]
            })
            .overrideTemplate(TipoDocumentoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoDocumentoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoDocumentoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TipoDocumento(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tipoDocumento = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tipoDocumentoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TipoDocumento();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tipoDocumento = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tipoDocumentoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
