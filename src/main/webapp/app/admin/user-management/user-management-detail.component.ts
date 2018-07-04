import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalService } from './user-modal.service';
import { User, UserService } from '../../shared';
import { UserExtraService, UserExtra } from '../../entities/user-extra';

@Component({
    selector: 'jhi-user-mgmt-detail',
    templateUrl: './user-management-detail.component.html'
})
export class UserMgmtDetailComponent implements OnInit {
    user: User;
    userExtra: UserExtra;

    constructor(
        private userService: UserService,
        private userExtraService: UserExtraService,
        public activeModal: NgbActiveModal,
    ) {
    }

    ngOnInit(): void {
        this.loadUSerExtra(this.user.id);
    }

    load(login) {
        this.userService.find(login).subscribe((response) => {
            this.user = response.body;

            this.loadUSerExtra(this.user.id);
        });
    }

    loadUSerExtra(id) {
        this.userExtraService.find(id).subscribe((response) => {
            this.userExtra = response.body;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

}

@Component({
    selector: 'jhi-user-detail',
    template: ''
})
export class UserDetailComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userModalService: UserModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userModalService.open(UserMgmtDetailComponent as Component, params['login']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
