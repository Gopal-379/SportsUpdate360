/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
    id: number;
    name: string;
    email: string;
}

export type Teams = {
    id: number;
    name: string;
    plays?: string;
}

export type Sport = {
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

export type MatchDetails = {
    id: number;
    startsAt: string;
    endsAt: string;
    isRunning: boolean;
    location: string;
    name: string;
    sportName: string;
    teams: Teams[];
    score: any;
    playingTeam: number;
    story: string;
}

export type Article = {
    id: number;
    title: string;
    thumbnail: string;
    sport: {
        id: number;
        name: string;
    };
    date: string;
    summary: string;
    teams: Teams[];
};

export type ArticleDetails = {
    id: number;
    title: string;
    summary: string;
    thumbnail: string;
    sport: {
        id: number;
        name: string;
    };
    date: string;
    content: string;
    teams: Teams[];
}

export type UserPreferences = {
    sports: string[];
    teams: number[];
}