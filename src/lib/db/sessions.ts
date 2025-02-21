export function getTeam(sessionId: string): number {
    if (sessionId === "TEMPORARY") {
        return 1676;
    } else {
        return -1;
    }
}