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
        await contactForm.fillForm(false, { nameAndSurname: { value: "a", error: "" } });
        await contactForm.fillForm(false, { nameAndSurname: { value: "1", error: contactForm.nameAndSurnameIncorrectCharactersErrorMessage } });
        await contactForm.fillForm(false, { nameAndSurname: { value: "1a", error: contactForm.nameAndSurnameIncorrectCharactersErrorMessage } });
        await contactForm.fillForm(false, { nameAndSurname: { value: "a1", error: contactForm.nameAndSurnameIncorrectCharactersErrorMessage } });
        await contactForm.fillForm(false, { nameAndSurname: { value: "a 1", error: contactForm.nameAndSurnameIncorrectCharactersErrorMessage } });
        await contactForm.fillForm(false, { nameAndSurname: { value: "abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij", error: "" } });
        await contactForm.fillForm(false, {
            nameAndSurname: { value: "abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijk", error: contactForm.nameAndSurnameTooLongErrorMessage },
        });

        await contactForm.fillForm(false, {
            nameAndSurname: { value: "abcdefghij abcdefghij abcdefghij'abcde abcdefghij-abcdefghij", error: "" },
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
        await contactForm.fillForm(false, { email: { value: "test@email.com", error: "" } });
        await contactForm.fillForm(false, { email: { value: "test@email.c", error: contactForm.emailInputIncorrectFormatErrorMessage } });
        await contactForm.fillForm(false, { email: { value: "test@email.", error: contactForm.emailInputIncorrectFormatErrorMessage } });
        await contactForm.fillForm(false, { email: { value: "test@email", error: contactForm.emailInputIncorrectFormatErrorMessage } });
        await contactForm.fillForm(false, { email: { value: "test@", error: contactForm.emailInputIncorrectFormatErrorMessage } });
        await contactForm.fillForm(false, { email: { value: "test", error: contactForm.emailInputIncorrectFormatErrorMessage } });
        await contactForm.fillForm(false, { email: { value: "t", error: contactForm.emailInputIncorrectFormatErrorMessage } });
        await contactForm.fillForm(false, { email: { value: "", error: contactForm.emailInputEmptyInputErrorMessage } });

        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { value: "testname.testsurname@email.com", error: "" },
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
        await contactForm.fillForm(false, { phone: { value: "12345678", error: contactForm.phoneInputTooShortInputErrorMessage } });
        await contactForm.fillForm(false, { phone: { value: "abcdefghi", error: contactForm.phoneInputIncorrectCharactersInputErrorMessage } });
        await contactForm.fillForm(false, { phone: { value: "abcdefghij", error: contactForm.phoneInputTooLongInputErrorMessage } });
        await contactForm.fillForm(false, { phone: { value: "1234567890", error: contactForm.phoneInputTooLongInputErrorMessage } });
        await contactForm.fillForm(false, { phone: { value: "+12345678", error: contactForm.phoneInputIncorrectCharactersInputErrorMessage } });

        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { value: "123456789", error: "" },
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
        await contactForm.fillForm(false, { subject: { value: "0", error: "" } });
        await contactForm.fillForm(false, { subject: { value: "", error: contactForm.subjectEmptyInputErrorMessage } });
        await contactForm.fillForm(false, { subject: { value: " ", error: "" } });
        await contactForm.fillForm(false, { subject: { value: "t", error: "" } });

        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { value: "test", error: "" },
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

        await contactForm.fillForm(false, { sendCopy: false });
        await contactForm.fillForm(false, { sendCopy: true });
        await contactForm.fillForm(false, { sendCopy: false });
    });

    test("message", async () => {
        await contactForm.fillForm(false, { message: { value: "0", error: "" } });
        await contactForm.fillForm(false, { message: { value: "", error: contactForm.messageEmptyTextAreaErrorMessage } });
        await contactForm.fillForm(false, { message: { value: " ", error: "" } });
        await contactForm.fillForm(false, { message: { value: "t", error: "" } });

        await contactForm.fillForm(false, {
            nameAndSurname: { error: contactForm.nameAndSurnameEmptyInputErrorMessage },
            email: { error: contactForm.emailInputEmptyInputErrorMessage },
            phone: { error: contactForm.phoneInputEmptyInputErrorMessage },
            subject: { error: contactForm.subjectEmptyInputErrorMessage },
            message: { value: "test", error: "" },
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
