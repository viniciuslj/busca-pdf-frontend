/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuscapdfTestModule } from '../../../test.module';
import { TipoDocumentoComponent } from '../../../../../../main/webapp/app/entities/tipo-documento/tipo-documento.component';
import { TipoDocumentoService } from '../../../../../../main/webapp/app/entities/tipo-documento/tipo-documento.service';
import { TipoDocumento } from '../../../../../../main/webapp/app/entities/tipo-documento/tipo-documento.model';

describe('Component Tests', () => {

    describe('TipoDocumento Management Component', () => {
        let comp: TipoDocumentoComponent;
        let fixture: ComponentFixture<TipoDocumentoComponent>;
        let service: TipoDocumentoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [TipoDocumentoComponent],
                providers: [
                    TipoDocumentoService
                ]
            })
            .overrideTemplate(TipoDocumentoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoDocumentoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoDocumentoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TipoDocumento(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tipoDocumentos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
