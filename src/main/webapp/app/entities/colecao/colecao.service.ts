import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Colecao } from './colecao.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Colecao>;

@Injectable()
export class ColecaoService {

    private resourceUrl =  SERVER_API_URL + 'api/colecaos';

    constructor(private http: HttpClient) { }

    create(colecao: Colecao): Observable<EntityResponseType> {
        const copy = this.convert(colecao);
        return this.http.post<Colecao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(colecao: Colecao): Observable<EntityResponseType> {
        const copy = this.convert(colecao);
        return this.http.put<Colecao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Colecao>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Colecao[]>> {
        const options = createRequestOption(req);
        return this.http.get<Colecao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Colecao[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Colecao = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Colecao[]>): HttpResponse<Colecao[]> {
        const jsonResponse: Colecao[] = res.body;
        const body: Colecao[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Colecao.
     */
    private convertItemFromServer(colecao: Colecao): Colecao {
        const copy: Colecao = Object.assign({}, colecao);
        return copy;
    }

    /**
     * Convert a Colecao to a JSON which can be sent to the server.
     */
    private convert(colecao: Colecao): Colecao {
        const copy: Colecao = Object.assign({}, colecao);
        return copy;
    }
}
