import { Locator, Page, expect } from "@playwright/test";

export class ContactForm {
    readonly page: Page;

    readonly nameAndSurnameInput: Locator;
    readonly nameAndSurnameInputError: Locator;
    readonly nameAndSurnameEmptyInputErrorMessage: string;
    readonly nameAndSurnameIncorrectCharactersErrorMessage: string;
    readonly nameAndSurnameTooLongErrorMessage: string;

    readonly emailInput: Locator;
    readonly emailInputError: Locator;
    readonly emailInputEmptyInputErrorMessage: string;
    readonly emailInputIncorrectFormatErrorMessage: string;

    readonly phoneInput: Locator;
    readonly phoneInputError: Locator;
    readonly phoneInputEmptyInputErrorMessage: string;
    readonly phoneInputIncorrectCharactersInputErrorMessage: string;
    readonly phoneInputTooShortInputErrorMessage: string;
    readonly phoneInputTooLongInputErrorMessage: string;

    readonly subjectInput: Locator;
    readonly subjectInputError: Locator;
    readonly subjectEmptyInputErrorMessage: string;

    readonly sendCopyCheckbox: Locator;

    readonly messageTextArea: Locator;
    readonly messageTextAreaError: Locator;
    readonly messageEmptyTextAreaErrorMessage: string;

    readonly sendButton: Locator;

    constructor(page: Page) {
        this.nameAndSurnameInput = page.locator('input[name="name"]');
        this.nameAndSurnameInputError = page.locator('input[name="name"] + div.field__error');
        this.nameAndSurnameEmptyInputErrorMessage = "Imię i nazwisko jest wymagane.";
        this.nameAndSurnameIncorrectCharactersErrorMessage = "Niedozwolone znaki. Możesz użyć liter, spacji, myślnika lub apostrofu (').";
        this.nameAndSurnameTooLongErrorMessage = "Imię i nazwisko jest za długie. Możesz wpisać maksymalnie 60 znaków.";

        this.emailInput = page.locator('input[name="email"]');
        this.emailInputError = page.locator('input[name="email"] + div.field__error');
        this.emailInputEmptyInputErrorMessage = "E-mail jest wymagany.";
        this.emailInputIncorrectFormatErrorMessage = "E-mail ma niepoprawny format. Poprawny format to np. jan.kowalski@nowaera.pl";

        this.phoneInput = page.locator('input[name="phone"]');
        this.phoneInputError = page.locator('input[name="phone"] + div.field__error');
        this.phoneInputEmptyInputErrorMessage = "Numer telefonu jest wymagany.";
        this.phoneInputIncorrectCharactersInputErrorMessage = "Niedozwolone znaki. Możesz użyć cyfr.";
        this.phoneInputTooShortInputErrorMessage = "Numer telefonu jest za krótki. Możesz wpisać 9 cyfr.";
        this.phoneInputTooLongInputErrorMessage = "Numer telefonu jest za długi. Możesz wpisać maks. 9 cyfr.";

        this.subjectInput = page.locator('input[name="subject"]');
        this.subjectInputError = page.locator('input[name="subject"] + div.field__error');
        this.subjectEmptyInputErrorMessage = "Temat jest wymagany.";

        this.sendCopyCheckbox = page.locator('input[name="copy"]');

        this.messageTextArea = page.locator('textarea[name="message"]');
        this.messageTextAreaError = page.locator('textarea[name="message"] + div.field__error');
        this.messageEmptyTextAreaErrorMessage = "Wiadomość jest wymagana.";

        this.sendButton = page.locator('button[type="submit"]', { hasText: "wyślij" });
    }

    async fillForm(
        send: boolean,
        options?: {
            nameAndSurname?: { value?: string; error?: string };
            email?: { value?: string; error?: string };
            phone?: { value?: string; error?: string };
            subject?: { value?: string; error?: string };
            sendCopy?: boolean;
            message?: { value?: string; error?: string };
        }
    ): Promise<void> {
        if (options?.nameAndSurname?.value) {
            await this.nameAndSurnameInput.fill(options.nameAndSurname.value);
        } else if (options?.nameAndSurname?.value === "") {
            await this.nameAndSurnameInput.clear();
        }
        if (options?.nameAndSurname?.error) {
            await expect(this.nameAndSurnameInputError).toContainText(options.nameAndSurname.error);
        } else if (options?.nameAndSurname?.error === "") {
            await expect(this.nameAndSurnameInputError).toBeHidden();
        }

        if (options?.email?.value) {
            await this.emailInput.fill(options.email.value);
        } else if (options?.email?.value === "") {
            await this.emailInput.clear();
        }
        if (options?.email?.error) {
            await expect(this.emailInputError).toContainText(options.email.error);
        } else if (options?.email?.error === "") {
            await expect(this.emailInputError).toBeHidden();
        }

        if (options?.phone?.value) {
            await this.phoneInput.fill(options.phone.value);
        } else if (options?.phone?.value === "") {
            await this.phoneInput.clear();
        }
        if (options?.phone?.error) {
            await expect(this.phoneInputError).toContainText(options.phone.error);
        } else if (options?.phone?.error === "") {
            await expect(this.phoneInputError).toBeHidden();
        }

        if (options?.subject?.value) {
            await this.subjectInput.fill(options.subject.value);
        } else if (options?.subject?.value === "") {
            await this.subjectInput.clear();
        }
        if (options?.subject?.error) {
            await expect(this.subjectInputError).toContainText(options.subject.error);
        } else if (options?.subject?.error === "") {
            await expect(this.subjectInputError).toBeHidden();
        }

        if (typeof options?.sendCopy === "boolean") {
            this.sendCopyCheckbox.setChecked(options.sendCopy);
        }

        if (options?.message?.value) {
            await this.messageTextArea.fill(options.message.value);
        } else if (options?.message?.value === "") {
            await this.messageTextArea.clear();
        }
        if (options?.message?.error) {
            await expect(this.messageTextAreaError).toContainText(options.message.error);
        } else if (options?.message?.error === "") {
            await expect(this.messageTextAreaError).toBeHidden();
        }

        if (send) {
            this.sendButton.click();
        }
    }
}
