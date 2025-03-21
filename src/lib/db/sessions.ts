import { createHash, randomBytes } from "crypto";
import { createdThisYear, getUserByUID, type User } from "./mysql";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export type Session = {
    uid: number;
    started: Date;
    team_num: number;
    sessionId: string;
    user: User;
}

let sessions: Session[] = [];

/**
 * Returns whether or not a given session has expired.
 * A session is expired if it was started more than 24 hours ago.
 * @param session The session to check
 * @returns Whether or not it is expired
 */
export function sessionExpired(session: Session): boolean {
    
    if (!createdThisYear(session.user)) {
        return true;
    }
    
    const started = session.started.getTime();
    const expires = started + HOUR * 24;
    
    if (Date.now() > expires) {
        return true;
    }
    return false;
}

/**
 * Filters the sessions list of any sessions whose uid matches the provided uid.
 * @param uid The uid to check
 */
export function deleteSessionOfUID(uid: number): void {
    sessions = sessions.filter(s => {
        if (uid === s.uid) {
            return false; // delete it
        }
        return true;
    });
}

export function deleteSession(session: Session): void {
    sessions = sessions.filter(s => {
        if (session.sessionId === s.sessionId) {
            return false;
        }
        return true;
    })
}

/**
 * Filters the sessions list of any sessions who are expired.
 * @see {@link sessionExpired}
 */
export function deleteExpiredSessions(): void {
    sessions = sessions.filter(s => {
        if (sessionExpired(s)) {
            return false; // delete it
        }
        return true;
    })
}

/**
 * Creates a new session object with a given uid.
 * Deletes any expired sessions or any overlapping sessions as well.
 * Throws an error if the UID does not have a real user with it
 * @param uid The uid to make a session for
 * @returns The session
 * @see {@link deleteExpiredSessions}
 * @see {@link deleteSessionOfUID}
 */
export async function createSessionForUser(user: User): Promise<Session> {
    const started: Date = new Date();

    deleteExpiredSessions();
    deleteSessionOfUID(user.uid);

    const sessionId: string = randomBytes(8).toString("hex");
    const session: Session = {
        uid: user.uid,
        started: started,
        team_num: user.team_num,
        sessionId: sessionId,
        user: user
    }

    sessions.push(session);
    return session;
}

/**
 * Returns a Session object with a given sessionId.
 * Returns undefined if no valid session is found.
 * @param sessionId The sessionId to check
 * @returns The session, or undefined if the sessionId is invalid
 */
export function getSessionBySessionId(sessionId: string): Session | undefined {
    deleteExpiredSessions();
    for (const session of sessions) {
        if (session.sessionId === sessionId) {
            return session;
        }
    }
    return undefined;
}

export function hashAndSaltPassword(password: string, salt: string): string {
    return createHash("sha256").update(`${password}: ${salt}`).digest("hex");
}

export function createHashAndSalt(password: string): { passhash: string, salt: string } {
    const salt = randomBytes(16).toString("hex");
    const passhash = hashAndSaltPassword(password, salt);
    return { passhash, salt };
}