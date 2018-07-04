import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Banco e2e test', () => {

    let navBarPage: NavBarPage;
    let bancoDialogPage: BancoDialogPage;
    let bancoComponentsPage: BancoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Bancos', () => {
        navBarPage.goToEntity('banco');
        bancoComponentsPage = new BancoComponentsPage();
        expect(bancoComponentsPage.getTitle())
            .toMatch(/buscapdfApp.banco.home.title/);

    });

    it('should load create Banco dialog', () => {
        bancoComponentsPage.clickOnCreateButton();
        bancoDialogPage = new BancoDialogPage();
        expect(bancoDialogPage.getModalTitle())
            .toMatch(/buscapdfApp.banco.home.createOrEditLabel/);
        bancoDialogPage.close();
    });

    it('should create and save Bancos', () => {
        bancoComponentsPage.clickOnCreateButton();
        bancoDialogPage.setNomeInput('nome');
        expect(bancoDialogPage.getNomeInput()).toMatch('nome');
        bancoDialogPage.setDescricaoInput('descricao');
        expect(bancoDialogPage.getDescricaoInput()).toMatch('descricao');
        bancoDialogPage.setIndiceInput('indice');
        expect(bancoDialogPage.getIndiceInput()).toMatch('indice');
        bancoDialogPage.getNotificacaoInput().isSelected().then((selected) => {
            if (selected) {
                bancoDialogPage.getNotificacaoInput().click();
                expect(bancoDialogPage.getNotificacaoInput().isSelected()).toBeFalsy();
            } else {
                bancoDialogPage.getNotificacaoInput().click();
                expect(bancoDialogPage.getNotificacaoInput().isSelected()).toBeTruthy();
            }
        });
        bancoDialogPage.getAtivoInput().isSelected().then((selected) => {
            if (selected) {
                bancoDialogPage.getAtivoInput().click();
                expect(bancoDialogPage.getAtivoInput().isSelected()).toBeFalsy();
            } else {
                bancoDialogPage.getAtivoInput().click();
                expect(bancoDialogPage.getAtivoInput().isSelected()).toBeTruthy();
            }
        });
        bancoDialogPage.save();
        expect(bancoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BancoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-banco div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BancoDialogPage {
    modalTitle = element(by.css('h4#myBancoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    descricaoInput = element(by.css('input#field_descricao'));
    indiceInput = element(by.css('input#field_indice'));
    notificacaoInput = element(by.css('input#field_notificacao'));
    ativoInput = element(by.css('input#field_ativo'));

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

    setIndiceInput = function(indice) {
        this.indiceInput.sendKeys(indice);
    };

    getIndiceInput = function() {
        return this.indiceInput.getAttribute('value');
    };

    getNotificacaoInput = function() {
        return this.notificacaoInput;
    };
    getAtivoInput = function() {
        return this.ativoInput;
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
