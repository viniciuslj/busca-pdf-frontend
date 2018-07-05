/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BuscapdfTestModule } from '../../../test.module';
import { DocumentoDetailComponent } from '../../../../../../main/webapp/app/entities/documento/documento-detail.component';
import { DocumentoService } from '../../../../../../main/webapp/app/entities/documento/documento.service';
import { Documento } from '../../../../../../main/webapp/app/entities/documento/documento.model';

describe('Component Tests', () => {

    describe('Documento Management Detail Component', () => {
        let comp: DocumentoDetailComponent;
        let fixture: ComponentFixture<DocumentoDetailComponent>;
        let service: DocumentoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [DocumentoDetailComponent],
                providers: [
                    DocumentoService
                ]
            })
            .overrideTemplate(DocumentoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Documento(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.documento).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
