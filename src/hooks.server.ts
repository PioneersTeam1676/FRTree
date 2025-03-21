import { redirect } from "@sveltejs/kit";
import { getSessionBySessionId } from "$lib/db/sessions";
import { responseError } from "$lib/apis";

const adminOnlyPaths = [
    "/admin",
];

function isPathAdminOnly(path) {
    return adminOnlyPaths.some(adminPath => {
        return path.startsWith(adminPath) || path === adminPath;
    });
}

export const handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get("sessionId");
    const session = getSessionBySessionId(sessionId);

    const url = new URL(event.request.url);
    if (!isPathAdminOnly(url.pathname)) {
        return await resolve(event);
    }

    if (!session) {
        throw redirect(302, "/sign_in");
    }

    if (!session.user.flag_is_admin) {
        throw redirect(302, "/sign_in");
    }

    return await resolve(event);
        
}