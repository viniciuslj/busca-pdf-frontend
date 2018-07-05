/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuscapdfTestModule } from '../../../test.module';
import { DiretorioComponent } from '../../../../../../main/webapp/app/entities/diretorio/diretorio.component';
import { DiretorioService } from '../../../../../../main/webapp/app/entities/diretorio/diretorio.service';
import { Diretorio } from '../../../../../../main/webapp/app/entities/diretorio/diretorio.model';

describe('Component Tests', () => {

    describe('Diretorio Management Component', () => {
        let comp: DiretorioComponent;
        let fixture: ComponentFixture<DiretorioComponent>;
        let service: DiretorioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [DiretorioComponent],
                providers: [
                    DiretorioService
                ]
            })
            .overrideTemplate(DiretorioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiretorioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiretorioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Diretorio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.diretorios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
