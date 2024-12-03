import { CardType } from "../props/cardColumn";

export const DEFAULT_CARDS: CardType[] = [
    // BACKLOG
    { title: "Keep going down", id: "1", status: "backlog" },
    { title: "Pray", id: "2", status: "in progress" },
    { title: "Document 2 API", id: "4", status: "backlog" },
    { title: '"Brodamid, hotspot my WiFi👼🏼"', id: "5", status: "backlog" },
    // TODO
    {
    title: "Build PG's landing page",
    id: "6",
    status: "todo",
    },

    // DOING
    {
    title: "Refactor context providers to use Zustand",
    id: "8",
    status: "in progress",
    },
    { title: "50 pushups", id: "3", status: "done" },
    // DONE
    {
    title: "Survive the day",
    id: "10",
    status: "done",
    },
];