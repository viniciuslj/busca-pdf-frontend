/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BuscapdfTestModule } from '../../../test.module';
import { TipoDocumentoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tipo-documento/tipo-documento-delete-dialog.component';
import { TipoDocumentoService } from '../../../../../../main/webapp/app/entities/tipo-documento/tipo-documento.service';

describe('Component Tests', () => {

    describe('TipoDocumento Management Delete Component', () => {
        let comp: TipoDocumentoDeleteDialogComponent;
        let fixture: ComponentFixture<TipoDocumentoDeleteDialogComponent>;
        let service: TipoDocumentoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [TipoDocumentoDeleteDialogComponent],
                providers: [
                    TipoDocumentoService
                ]
            })
            .overrideTemplate(TipoDocumentoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoDocumentoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoDocumentoService);
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
