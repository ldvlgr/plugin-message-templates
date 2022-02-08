import {
    NotificationType,
} from "@twilio/flex-ui";

export const CompleteTaskBlocked = {
    id: "CompleteTaskBlocked",
    content: "You must update the Task before completing it.",
    type: NotificationType.error,
    timeout: 0
};