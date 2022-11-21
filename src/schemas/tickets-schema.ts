import { TicketTypeParams } from "@/services/tickets-service";
import Joi from "joi";

export const TicketTypeSchema = Joi.object<TicketTypeParams>({
    ticketTypeId: Joi.number().required(),
});
