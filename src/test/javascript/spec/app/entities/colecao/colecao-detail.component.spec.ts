/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BuscapdfTestModule } from '../../../test.module';
import { ColecaoDetailComponent } from '../../../../../../main/webapp/app/entities/colecao/colecao-detail.component';
import { ColecaoService } from '../../../../../../main/webapp/app/entities/colecao/colecao.service';
import { Colecao } from '../../../../../../main/webapp/app/entities/colecao/colecao.model';

describe('Component Tests', () => {

    describe('Colecao Management Detail Component', () => {
        let comp: ColecaoDetailComponent;
        let fixture: ComponentFixture<ColecaoDetailComponent>;
        let service: ColecaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [ColecaoDetailComponent],
                providers: [
                    ColecaoService
                ]
            })
            .overrideTemplate(ColecaoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColecaoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColecaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Colecao(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.colecao).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
