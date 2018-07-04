/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuscapdfTestModule } from '../../../test.module';
import { ColecaoComponent } from '../../../../../../main/webapp/app/entities/colecao/colecao.component';
import { ColecaoService } from '../../../../../../main/webapp/app/entities/colecao/colecao.service';
import { Colecao } from '../../../../../../main/webapp/app/entities/colecao/colecao.model';

describe('Component Tests', () => {

    describe('Colecao Management Component', () => {
        let comp: ColecaoComponent;
        let fixture: ComponentFixture<ColecaoComponent>;
        let service: ColecaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuscapdfTestModule],
                declarations: [ColecaoComponent],
                providers: [
                    ColecaoService
                ]
            })
            .overrideTemplate(ColecaoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColecaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColecaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Colecao(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.colecaos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
