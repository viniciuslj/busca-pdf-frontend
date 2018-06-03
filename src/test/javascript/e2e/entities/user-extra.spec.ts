import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UserExtra e2e test', () => {

    let navBarPage: NavBarPage;
    let userExtraDialogPage: UserExtraDialogPage;
    let userExtraComponentsPage: UserExtraComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserExtras', () => {
        navBarPage.goToEntity('user-extra');
        userExtraComponentsPage = new UserExtraComponentsPage();
        expect(userExtraComponentsPage.getTitle())
            .toMatch(/buscapdfApp.userExtra.home.title/);

    });

    it('should load create UserExtra dialog', () => {
        userExtraComponentsPage.clickOnCreateButton();
        userExtraDialogPage = new UserExtraDialogPage();
        expect(userExtraDialogPage.getModalTitle())
            .toMatch(/buscapdfApp.userExtra.home.createOrEditLabel/);
        userExtraDialogPage.close();
    });

    it('should create and save UserExtras', () => {
        userExtraComponentsPage.clickOnCreateButton();
        userExtraDialogPage.setCpfInput('cpf');
        expect(userExtraDialogPage.getCpfInput()).toMatch('cpf');
        userExtraDialogPage.setRgInput('5');
        expect(userExtraDialogPage.getRgInput()).toMatch('5');
        userExtraDialogPage.setFunctionalNumberInput('5');
        expect(userExtraDialogPage.getFunctionalNumberInput()).toMatch('5');
        userExtraDialogPage.userSelectLastOption();
        userExtraDialogPage.save();
        expect(userExtraDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserExtraComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-extra div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserExtraDialogPage {
    modalTitle = element(by.css('h4#myUserExtraLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    cpfInput = element(by.css('input#field_cpf'));
    rgInput = element(by.css('input#field_rg'));
    functionalNumberInput = element(by.css('input#field_functionalNumber'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCpfInput = function(cpf) {
        this.cpfInput.sendKeys(cpf);
    };

    getCpfInput = function() {
        return this.cpfInput.getAttribute('value');
    };

    setRgInput = function(rg) {
        this.rgInput.sendKeys(rg);
    };

    getRgInput = function() {
        return this.rgInput.getAttribute('value');
    };

    setFunctionalNumberInput = function(functionalNumber) {
        this.functionalNumberInput.sendKeys(functionalNumber);
    };

    getFunctionalNumberInput = function() {
        return this.functionalNumberInput.getAttribute('value');
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
