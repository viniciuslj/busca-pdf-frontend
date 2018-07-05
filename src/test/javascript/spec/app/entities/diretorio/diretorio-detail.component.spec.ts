/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BuscapdfTestModule } from '../../../test.module';
import { DiretorioDetailComponent } from '../../../../../../main/webapp/app/entities/diretorio/diretorio-detail.component';
import { DiretorioService } from '../../../../../../main/webapp/app/entities/diretorio/diretorio.service';
import { Diretorio } from '../../../../../../main/webapp/app/entities/diretorio/diretorio.model';

describe('Component Tests', () => {

    describe('Diretorio Management Detail Component', () => {
        let comp: DiretorioDetailComponent;
        let fixture: ComponentFixture<DiretorioDetailComponent>;
        let service: DiretorioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [DiretorioDetailComponent],
                providers: [
                    DiretorioService
                ]
            })
            .overrideTemplate(DiretorioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiretorioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiretorioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Diretorio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.diretorio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
