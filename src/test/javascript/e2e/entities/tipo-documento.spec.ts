import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TipoDocumento e2e test', () => {

    let navBarPage: NavBarPage;
    let tipoDocumentoDialogPage: TipoDocumentoDialogPage;
    let tipoDocumentoComponentsPage: TipoDocumentoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TipoDocumentos', () => {
        navBarPage.goToEntity('tipo-documento');
        tipoDocumentoComponentsPage = new TipoDocumentoComponentsPage();
        expect(tipoDocumentoComponentsPage.getTitle())
            .toMatch(/buscapdfApp.tipoDocumento.home.title/);

    });

    it('should load create TipoDocumento dialog', () => {
        tipoDocumentoComponentsPage.clickOnCreateButton();
        tipoDocumentoDialogPage = new TipoDocumentoDialogPage();
        expect(tipoDocumentoDialogPage.getModalTitle())
            .toMatch(/buscapdfApp.tipoDocumento.home.createOrEditLabel/);
        tipoDocumentoDialogPage.close();
    });

    it('should create and save TipoDocumentos', () => {
        tipoDocumentoComponentsPage.clickOnCreateButton();
        tipoDocumentoDialogPage.setNomeInput('nome');
        expect(tipoDocumentoDialogPage.getNomeInput()).toMatch('nome');
        tipoDocumentoDialogPage.setDescricaoInput('descricao');
        expect(tipoDocumentoDialogPage.getDescricaoInput()).toMatch('descricao');
        tipoDocumentoDialogPage.setDiretorioInput('diretorio');
        expect(tipoDocumentoDialogPage.getDiretorioInput()).toMatch('diretorio');
        tipoDocumentoDialogPage.getDivisaoAnualInput().isSelected().then((selected) => {
            if (selected) {
                tipoDocumentoDialogPage.getDivisaoAnualInput().click();
                expect(tipoDocumentoDialogPage.getDivisaoAnualInput().isSelected()).toBeFalsy();
            } else {
                tipoDocumentoDialogPage.getDivisaoAnualInput().click();
                expect(tipoDocumentoDialogPage.getDivisaoAnualInput().isSelected()).toBeTruthy();
            }
        });
        tipoDocumentoDialogPage.getPesquisaAutomaticaInput().isSelected().then((selected) => {
            if (selected) {
                tipoDocumentoDialogPage.getPesquisaAutomaticaInput().click();
                expect(tipoDocumentoDialogPage.getPesquisaAutomaticaInput().isSelected()).toBeFalsy();
            } else {
                tipoDocumentoDialogPage.getPesquisaAutomaticaInput().click();
                expect(tipoDocumentoDialogPage.getPesquisaAutomaticaInput().isSelected()).toBeTruthy();
            }
        });
        tipoDocumentoDialogPage.save();
        expect(tipoDocumentoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TipoDocumentoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tipo-documento div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TipoDocumentoDialogPage {
    modalTitle = element(by.css('h4#myTipoDocumentoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    descricaoInput = element(by.css('input#field_descricao'));
    diretorioInput = element(by.css('input#field_diretorio'));
    divisaoAnualInput = element(by.css('input#field_divisaoAnual'));
    pesquisaAutomaticaInput = element(by.css('input#field_pesquisaAutomatica'));

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

    setDiretorioInput = function(diretorio) {
        this.diretorioInput.sendKeys(diretorio);
    };

    getDiretorioInput = function() {
        return this.diretorioInput.getAttribute('value');
    };

    getDivisaoAnualInput = function() {
        return this.divisaoAnualInput;
    };
    getPesquisaAutomaticaInput = function() {
        return this.pesquisaAutomaticaInput;
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
