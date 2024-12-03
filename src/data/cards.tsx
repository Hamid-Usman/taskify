import { CardType } from "../props/cardColumn";

export const DEFAULT_CARDS: CardType[] = [
    // BACKLOG
    { title: "Keep going down", id: "1", column: "backlog" },
    { title: "Pray", id: "2", column: "in progress" },
    { title: "Document 2 API", id: "4", column: "backlog" },
    { title: '"Brodamid, hotspot my WiFi👼🏼"', id: "5", column: "backlog" },
    // TODO
    {
    title: "Build PG's landing page",
    id: "6",
    column: "todo",
    },

    // DOING
    {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "in progress",
    },
    { title: "50 pushups", id: "3", column: "done" },
    // DONE
    {
    title: "Survive the day",
    id: "10",
    column: "done",
    },
];