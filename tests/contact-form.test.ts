import { test, expect } from "@playwright/test";

import { Shared } from "@page-objects/shared";
import { ContactForm } from "@page-objects/contact-form";

let shared: Shared;
let contactForm: ContactForm;

test.beforeEach(async ({ page }) => {
    shared = new Shared(page);
    contactForm = new ContactForm(page);
});

test.describe("Contact Form", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/contact");

        await shared.acceptCookies();

        await contactForm.fillForm(false, { nameAndSurname: { error: "" }, email: { error: "" }, phone: { error: "" }, subject: { error: "" }, message: { error: "" } });
        await contactForm.fillForm(true);
        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { error: contactForm.messageEmptyTextAreaErrorMessage },
        });
    });

    test("name and surname", async () => {
        const valuesAndErrors = [
            { value: "a", error: "" },
            { value: "1", error: contactForm.nameAndSurnameIncorrectCharactersErrorMessage },
            { value: "1a", error: contactForm.nameAndSurnameIncorrectCharactersErrorMessage },
            { value: "a1", error: contactForm.nameAndSurnameIncorrectCharactersErrorMessage },
            { value: "a 1", error: contactForm.nameAndSurnameIncorrectCharactersErrorMessage },
            { value: "abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij", error: "" },
            { value: "abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijk", error: contactForm.nameAndSurnameTooLongErrorMessage },
            { value: "abcdefghij abcdefghij abcdefghij'abcde abcdefghij-abcdefghij", error: "" },
        ];
        for (const valueAndError of valuesAndErrors) {
            await contactForm.fillForm(false, { nameAndSurname: valueAndError });
        }

        await contactForm.fillForm(false, {
            nameAndSurname: { error: "" },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { error: contactForm.messageEmptyTextAreaErrorMessage },
        });
        await contactForm.fillForm(true);
        await contactForm.fillForm(false, {
            nameAndSurname: { error: "" },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { error: contactForm.messageEmptyTextAreaErrorMessage },
        });
    });

    test("email", async () => {
        const valuesAndErrors = [
            { value: "test@email.com", error: "" },
            { value: "test@email.c", error: contactForm.emailInputIncorrectFormatErrorMessage },
            { value: "test@email.", error: contactForm.emailInputIncorrectFormatErrorMessage },
            { value: "test@email", error: contactForm.emailInputIncorrectFormatErrorMessage },
            { value: "test@", error: contactForm.emailInputIncorrectFormatErrorMessage },
            { value: "test", error: contactForm.emailInputIncorrectFormatErrorMessage },
            { value: "t", error: contactForm.emailInputIncorrectFormatErrorMessage },
            { value: "", error: contactForm.emailInputEmptyInputErrorMessage },
            { value: "testname.testsurname@email.com", error: "" },
        ];
        for (const valueAndError of valuesAndErrors) {
            await contactForm.fillForm(false, { email: valueAndError });
        }

        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: "" },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { error: contactForm.messageEmptyTextAreaErrorMessage },
        });
        await contactForm.fillForm(true);
        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: "" },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { error: contactForm.messageEmptyTextAreaErrorMessage },
        });
    });

    test("phone", async () => {
        const valuesAndErrors = [
            { value: "12345678", error: contactForm.phoneInputTooShortInputErrorMessage },
            { value: "abcdefghi", error: contactForm.phoneInputIncorrectCharactersInputErrorMessage },
            { value: "abcdefghij", error: contactForm.phoneInputTooLongInputErrorMessage },
            { value: "1234567890", error: contactForm.phoneInputTooLongInputErrorMessage },
            { value: "+12345678", error: contactForm.phoneInputIncorrectCharactersInputErrorMessage },
            { value: "123456789", error: "" },
        ];
        for (const valueAndError of valuesAndErrors) {
            await contactForm.fillForm(false, { phone: valueAndError });
        }

        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: "" },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { error: contactForm.messageEmptyTextAreaErrorMessage },
        });
        await contactForm.fillForm(true);
        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: "" },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { error: contactForm.messageEmptyTextAreaErrorMessage },
        });
    });

    test("subject", async () => {
        const valuesAndErrors = [
            { value: "0", error: "" },
            { value: "", error: contactForm.subjectEmptyInputErrorMessage },
            { value: " ", error: "" },
            { value: "t", error: "" },
            { value: "test", error: "" },
        ];
        for (const valueAndError of valuesAndErrors) {
            await contactForm.fillForm(false, { subject: valueAndError });
        }

        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: "" },
            message: { error: contactForm.messageEmptyTextAreaErrorMessage },
        });
        await contactForm.fillForm(true);
        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: "" },
            message: { error: contactForm.messageEmptyTextAreaErrorMessage },
        });
    });

    test.fixme("send copy?", async () => {
        await expect(contactForm.sendCopyCheckbox).toBeChecked();

        const values = [false, true, false];
        for (const value of values) {
            await contactForm.fillForm(false, { sendCopy: value });
        }
    });

    test("message", async () => {
        const valuesAndErrors = [
            { value: "0", error: "" },
            { value: "", error: contactForm.messageEmptyTextAreaErrorMessage },
            { value: " ", error: "" },
            { value: "t", error: "" },
            { value: "test", error: "" },
        ];
        for (const valueAndError of valuesAndErrors) {
            await contactForm.fillForm(false, { message: valueAndError });
        }

        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { error: "" },
        });
        await contactForm.fillForm(true);
        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { error: "" },
        });
    });

    test.fixme("send @smoke", async () => {
        // send
        // fill name
        // fill email
        // fill phone
        // fill subject
        // fill message
        // fill name, email
        // fill name, phone
        // fill name, subject
        // fill name, message
        // fill email, phone
        // fill email, subject
        // fill email, message
        // fill phone, subject
        // fill phone, message
        // fill subject, message
        // fill name, email, phone
        // fill name, email, subject
        // fill name, email, message
        // fill name, phone, subject
        // fill name, phone, message
        // fill name, subject, message
        // fill email, phone, subject
        // fill email, phone, message
        // fill email, subject, message
        // fill phone, subject, message
        // fill name, email, phone, subject
        // fill name, email, phone, message
        // fill name, email, subject, message
        // fill name, phone, subject, message
        // fill name, email, phone, subject, message
        // send
    });
});
