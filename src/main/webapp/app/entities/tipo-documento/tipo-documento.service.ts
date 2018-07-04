import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TipoDocumento } from './tipo-documento.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TipoDocumento>;

@Injectable()
export class TipoDocumentoService {

    private resourceUrl =  SERVER_API_URL + 'api/tipo-documentos';

    constructor(private http: HttpClient) { }

    create(tipoDocumento: TipoDocumento): Observable<EntityResponseType> {
        const copy = this.convert(tipoDocumento);
        return this.http.post<TipoDocumento>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tipoDocumento: TipoDocumento): Observable<EntityResponseType> {
        const copy = this.convert(tipoDocumento);
        return this.http.put<TipoDocumento>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TipoDocumento>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TipoDocumento[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoDocumento[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoDocumento[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TipoDocumento = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TipoDocumento[]>): HttpResponse<TipoDocumento[]> {
        const jsonResponse: TipoDocumento[] = res.body;
        const body: TipoDocumento[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TipoDocumento.
     */
    private convertItemFromServer(tipoDocumento: TipoDocumento): TipoDocumento {
        const copy: TipoDocumento = Object.assign({}, tipoDocumento);
        return copy;
    }

    /**
     * Convert a TipoDocumento to a JSON which can be sent to the server.
     */
    private convert(tipoDocumento: TipoDocumento): TipoDocumento {
        const copy: TipoDocumento = Object.assign({}, tipoDocumento);
        return copy;
    }
}
