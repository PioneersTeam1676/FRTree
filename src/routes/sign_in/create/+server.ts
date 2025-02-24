import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { createHashAndSalt, createSessionForUser, hashAndSaltPassword } from "$lib/db/sessions";
import { getUserByEmail, mysqlConnection, type User } from "$lib/db/mysql";
import { responseError, responseSuccess, HTTP } from "$lib/apis";

export const POST: RequestHandler = async ({ request, params }) => {
    const json = await request.json();
    const { email, password } = json;

    // return responseError("Disabled", HTTP.NOT_IMPLEMENTED);

    // Make sure they sent the params
    if (!email) {
        return responseError("Missing email parameter", HTTP.BAD_REQUEST);
    }

    if (!password) {
        return responseError("Missing password parameter", HTTP.BAD_REQUEST);
    }

    // Make sure email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    if (!validEmail) {
        return responseError(`email (${email}) is not a valid email address (must pass ${emailRegex})`, HTTP.BAD_REQUEST);
    }

    // Make sure password is valid
    if (password.length < 8) {
        return responseError(`password must be at least eight characters long`, HTTP.BAD_REQUEST);
    }

    // Check if account exists
    const account: User | undefined = await getUserByEmail(email);
    if (!account) {
        return responseError(`no account found with email ${email}`, HTTP.NOT_FOUND);
    }

    // Check password
    const correctPasshash = account.passhash;
    const givenPasshash = hashAndSaltPassword(password, account.salt);
    console.log("Given: " + givenPasshash)
    if (correctPasshash !== givenPasshash) {
        return responseError(`incorrect password`, HTTP.UNAUTHORIZED);
    }

    // Create a session
    try {
        const session = await createSessionForUser(account);
        return responseSuccess(`success`, {
            sessionId: session.sessionId
        });
    } catch (e) {
        return responseError(e, HTTP.INTERNAL_SERVER_ERROR);
    }

};