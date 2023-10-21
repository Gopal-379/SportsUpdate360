export type User = {
    id: number;
    name: string;
    email: string;
}

export type Teams = {
    id: number;
    name: string;
}

export type Match = {
    id: number;
    endsAt: string;
    isRunning: boolean;
    location: string;
    name: string;
    sportName: string;
    teams: Teams[];
}