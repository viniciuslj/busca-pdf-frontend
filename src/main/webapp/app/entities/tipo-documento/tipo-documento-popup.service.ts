import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TipoDocumento } from './tipo-documento.model';
import { TipoDocumentoService } from './tipo-documento.service';

@Injectable()
export class TipoDocumentoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tipoDocumentoService: TipoDocumentoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tipoDocumentoService.find(id)
                    .subscribe((tipoDocumentoResponse: HttpResponse<TipoDocumento>) => {
                        const tipoDocumento: TipoDocumento = tipoDocumentoResponse.body;
                        this.ngbModalRef = this.tipoDocumentoModalRef(component, tipoDocumento);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoDocumentoModalRef(component, new TipoDocumento());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoDocumentoModalRef(component: Component, tipoDocumento: TipoDocumento): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipoDocumento = tipoDocumento;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
