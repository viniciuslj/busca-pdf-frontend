import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Colecao e2e test', () => {

    let navBarPage: NavBarPage;
    let colecaoDialogPage: ColecaoDialogPage;
    let colecaoComponentsPage: ColecaoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Colecaos', () => {
        navBarPage.goToEntity('colecao');
        colecaoComponentsPage = new ColecaoComponentsPage();
        expect(colecaoComponentsPage.getTitle())
            .toMatch(/buscapdfApp.colecao.home.title/);

    });

    it('should load create Colecao dialog', () => {
        colecaoComponentsPage.clickOnCreateButton();
        colecaoDialogPage = new ColecaoDialogPage();
        expect(colecaoDialogPage.getModalTitle())
            .toMatch(/buscapdfApp.colecao.home.createOrEditLabel/);
        colecaoDialogPage.close();
    });

    it('should create and save Colecaos', () => {
        colecaoComponentsPage.clickOnCreateButton();
        colecaoDialogPage.setNomeInput('nome');
        expect(colecaoDialogPage.getNomeInput()).toMatch('nome');
        colecaoDialogPage.setDescricaoInput('descricao');
        expect(colecaoDialogPage.getDescricaoInput()).toMatch('descricao');
        colecaoDialogPage.getAtivaInput().isSelected().then((selected) => {
            if (selected) {
                colecaoDialogPage.getAtivaInput().click();
                expect(colecaoDialogPage.getAtivaInput().isSelected()).toBeFalsy();
            } else {
                colecaoDialogPage.getAtivaInput().click();
                expect(colecaoDialogPage.getAtivaInput().isSelected()).toBeTruthy();
            }
        });
        colecaoDialogPage.save();
        expect(colecaoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ColecaoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-colecao div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ColecaoDialogPage {
    modalTitle = element(by.css('h4#myColecaoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    descricaoInput = element(by.css('input#field_descricao'));
    ativaInput = element(by.css('input#field_ativa'));

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

    getAtivaInput = function() {
        return this.ativaInput;
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
