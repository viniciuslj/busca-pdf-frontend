import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';

import { Principal, AccountService, JhiLanguageHelper } from '../../shared';
import { UserExtraService, UserExtra } from '../../entities/user-extra';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    userExtra: UserExtra;
    inProcess: boolean;

    constructor(
        private account: AccountService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private userExtraService: UserExtraService
    ) {
        this.inProcess = false;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.userExtraService.find(account.id).subscribe((response) => {
                this.settingsAccount = this.copyAccount(account);
                this.userExtra = response.body;
            });
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
    }

    save() {
        this.inProcess = true;
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.inProcess = false;

            this.principal.identity(true).then((account) => {
                this.userExtraService.find(account.id).subscribe((response) => {
                    this.settingsAccount = this.copyAccount(account);
                    this.userExtra = response.body;
                });
            });

            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.languageService.changeLanguage(this.settingsAccount.langKey);
                }
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
            this.inProcess = false;
        });
    }

    copyAccount(account) {
        return {
            id: account.id,
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}
