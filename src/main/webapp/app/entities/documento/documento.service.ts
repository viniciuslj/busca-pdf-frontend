import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Documento } from './documento.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Documento>;

@Injectable()
export class DocumentoService {

    private resourceUrl =  SERVER_API_URL + 'api/documentos';

    constructor(private http: HttpClient) { }

    create(documento: Documento): Observable<EntityResponseType> {
        const copy = this.convert(documento);
        return this.http.post<Documento>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(documento: Documento): Observable<EntityResponseType> {
        const copy = this.convert(documento);
        return this.http.put<Documento>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Documento>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Documento[]>> {
        const options = createRequestOption(req);
        return this.http.get<Documento[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Documento[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Documento = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Documento[]>): HttpResponse<Documento[]> {
        const jsonResponse: Documento[] = res.body;
        const body: Documento[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Documento.
     */
    private convertItemFromServer(documento: Documento): Documento {
        const copy: Documento = Object.assign({}, documento);
        return copy;
    }

    /**
     * Convert a Documento to a JSON which can be sent to the server.
     */
    private convert(documento: Documento): Documento {
        const copy: Documento = Object.assign({}, documento);
        return copy;
    }
}
