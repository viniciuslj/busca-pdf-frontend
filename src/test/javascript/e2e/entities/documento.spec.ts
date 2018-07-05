import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Documento e2e test', () => {

    let navBarPage: NavBarPage;
    let documentoDialogPage: DocumentoDialogPage;
    let documentoComponentsPage: DocumentoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Documentos', () => {
        navBarPage.goToEntity('documento');
        documentoComponentsPage = new DocumentoComponentsPage();
        expect(documentoComponentsPage.getTitle())
            .toMatch(/buscapdfApp.documento.home.title/);

    });

    it('should load create Documento dialog', () => {
        documentoComponentsPage.clickOnCreateButton();
        documentoDialogPage = new DocumentoDialogPage();
        expect(documentoDialogPage.getModalTitle())
            .toMatch(/buscapdfApp.documento.home.createOrEditLabel/);
        documentoDialogPage.close();
    });

    it('should create and save Documentos', () => {
        documentoComponentsPage.clickOnCreateButton();
        documentoDialogPage.setNomeInput('nome');
        expect(documentoDialogPage.getNomeInput()).toMatch('nome');
        documentoDialogPage.setDescricaoInput('descricao');
        expect(documentoDialogPage.getDescricaoInput()).toMatch('descricao');
        documentoDialogPage.setComplementoDiretorioInput('complementoDiretorio');
        expect(documentoDialogPage.getComplementoDiretorioInput()).toMatch('complementoDiretorio');
        documentoDialogPage.setNomeArquivoInput('nomeArquivo');
        expect(documentoDialogPage.getNomeArquivoInput()).toMatch('nomeArquivo');
        documentoDialogPage.diretorioSelectLastOption();
        documentoDialogPage.save();
        expect(documentoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DocumentoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-documento div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DocumentoDialogPage {
    modalTitle = element(by.css('h4#myDocumentoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    descricaoInput = element(by.css('input#field_descricao'));
    complementoDiretorioInput = element(by.css('input#field_complementoDiretorio'));
    nomeArquivoInput = element(by.css('input#field_nomeArquivo'));
    diretorioSelect = element(by.css('select#field_diretorio'));

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

    setComplementoDiretorioInput = function(complementoDiretorio) {
        this.complementoDiretorioInput.sendKeys(complementoDiretorio);
    };

    getComplementoDiretorioInput = function() {
        return this.complementoDiretorioInput.getAttribute('value');
    };

    setNomeArquivoInput = function(nomeArquivo) {
        this.nomeArquivoInput.sendKeys(nomeArquivo);
    };

    getNomeArquivoInput = function() {
        return this.nomeArquivoInput.getAttribute('value');
    };

    diretorioSelectLastOption = function() {
        this.diretorioSelect.all(by.tagName('option')).last().click();
    };

    diretorioSelectOption = function(option) {
        this.diretorioSelect.sendKeys(option);
    };

    getDiretorioSelect = function() {
        return this.diretorioSelect;
    };

    getDiretorioSelectedOption = function() {
        return this.diretorioSelect.element(by.css('option:checked')).getText();
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
