/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuscapdfTestModule } from '../../../test.module';
import { DocumentoComponent } from '../../../../../../main/webapp/app/entities/documento/documento.component';
import { DocumentoService } from '../../../../../../main/webapp/app/entities/documento/documento.service';
import { Documento } from '../../../../../../main/webapp/app/entities/documento/documento.model';

describe('Component Tests', () => {

    describe('Documento Management Component', () => {
        let comp: DocumentoComponent;
        let fixture: ComponentFixture<DocumentoComponent>;
        let service: DocumentoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [DocumentoComponent],
                providers: [
                    DocumentoService
                ]
            })
            .overrideTemplate(DocumentoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Documento(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.documentos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
