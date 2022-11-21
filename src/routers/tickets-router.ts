import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";

import { TicketTypeSchema } from "@/schemas/tickets-schema";
import { getTicketsTypes, getTickets,postTickets } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
    .get("/types", authenticateToken, getTicketsTypes)
    .get("/", authenticateToken, getTickets)
    .post("/", authenticateToken, validateBody(TicketTypeSchema), postTickets)

export { ticketsRouter };