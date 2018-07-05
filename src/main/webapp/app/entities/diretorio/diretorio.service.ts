import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Diretorio } from './diretorio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Diretorio>;

@Injectable()
export class DiretorioService {

    private resourceUrl =  SERVER_API_URL + 'api/diretorios';

    constructor(private http: HttpClient) { }

    create(diretorio: Diretorio): Observable<EntityResponseType> {
        const copy = this.convert(diretorio);
        return this.http.post<Diretorio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(diretorio: Diretorio): Observable<EntityResponseType> {
        const copy = this.convert(diretorio);
        return this.http.put<Diretorio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Diretorio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Diretorio[]>> {
        const options = createRequestOption(req);
        return this.http.get<Diretorio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Diretorio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Diretorio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Diretorio[]>): HttpResponse<Diretorio[]> {
        const jsonResponse: Diretorio[] = res.body;
        const body: Diretorio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Diretorio.
     */
    private convertItemFromServer(diretorio: Diretorio): Diretorio {
        const copy: Diretorio = Object.assign({}, diretorio);
        return copy;
    }

    /**
     * Convert a Diretorio to a JSON which can be sent to the server.
     */
    private convert(diretorio: Diretorio): Diretorio {
        const copy: Diretorio = Object.assign({}, diretorio);
        return copy;
    }
}
