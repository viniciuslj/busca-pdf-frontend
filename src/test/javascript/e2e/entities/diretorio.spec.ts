import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Diretorio e2e test', () => {

    let navBarPage: NavBarPage;
    let diretorioDialogPage: DiretorioDialogPage;
    let diretorioComponentsPage: DiretorioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Diretorios', () => {
        navBarPage.goToEntity('diretorio');
        diretorioComponentsPage = new DiretorioComponentsPage();
        expect(diretorioComponentsPage.getTitle())
            .toMatch(/buscapdfApp.diretorio.home.title/);

    });

    it('should load create Diretorio dialog', () => {
        diretorioComponentsPage.clickOnCreateButton();
        diretorioDialogPage = new DiretorioDialogPage();
        expect(diretorioDialogPage.getModalTitle())
            .toMatch(/buscapdfApp.diretorio.home.createOrEditLabel/);
        diretorioDialogPage.close();
    });

    it('should create and save Diretorios', () => {
        diretorioComponentsPage.clickOnCreateButton();
        diretorioDialogPage.setNomeInput('nome');
        expect(diretorioDialogPage.getNomeInput()).toMatch('nome');
        diretorioDialogPage.setDescricaoInput('descricao');
        expect(diretorioDialogPage.getDescricaoInput()).toMatch('descricao');
        diretorioDialogPage.setPathInput('path');
        expect(diretorioDialogPage.getPathInput()).toMatch('path');
        diretorioDialogPage.bancoSelectLastOption();
        diretorioDialogPage.save();
        expect(diretorioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DiretorioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-diretorio div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DiretorioDialogPage {
    modalTitle = element(by.css('h4#myDiretorioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    descricaoInput = element(by.css('input#field_descricao'));
    pathInput = element(by.css('input#field_path'));
    bancoSelect = element(by.css('select#field_banco'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    setDescricaoInput = function(descricao) {
        this.descricaoInput.sendKeys(descricao);
    };

    getDescricaoInput = function() {
        return this.descricaoInput.getAttribute('value');
    };

    setPathInput = function(path) {
        this.pathInput.sendKeys(path);
    };

    getPathInput = function() {
        return this.pathInput.getAttribute('value');
    };

    bancoSelectLastOption = function() {
        this.bancoSelect.all(by.tagName('option')).last().click();
    };

    bancoSelectOption = function(option) {
        this.bancoSelect.sendKeys(option);
    };

    getBancoSelect = function() {
        return this.bancoSelect;
    };

    getBancoSelectedOption = function() {
        return this.bancoSelect.element(by.css('option:checked')).getText();
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
