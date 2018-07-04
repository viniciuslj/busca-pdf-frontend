import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { User, UserService } from '../../shared';
import { UserModalService } from './user-modal.service';

@Component({
    selector: 'jhi-user-mgmt-delete-dialog',
    templateUrl: './user-management-delete-dialog.component.html'
})
export class UserMgmtDeleteDialogComponent {
    user: User;
    inProcess: boolean;

    constructor(
        private userService: UserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
        this.inProcess = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(login) {
        this.inProcess = true;
        this.userService.delete(login).subscribe(
            (response) => {
                this.inProcess = false;
                this.eventManager.broadcast({ name: 'userListModification',
                    content: 'Deleted a user'});
                this.activeModal.dismiss(true);
            },
            (error) => {
                this.inProcess = false;
                console.error(error);
            }
        );
    }
}

@Component({
    selector: 'jhi-user-delete-dialog',
    template: ''
})
export class UserDeleteDialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userModalService: UserModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userModalService.open(UserMgmtDeleteDialogComponent as Component, params['login']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
