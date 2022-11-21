import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const ticketsTypes = await ticketsService.getTypes();    
        return res.status(200).send(ticketsTypes);

      } catch (error) {
        return res.sendStatus(404);
      }
}
export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const tickets = await ticketsService.getTickets(userId);  
        if (!tickets){
            return res.sendStatus(404);
        } 
        
        return res.status(200).send(tickets);

      } catch (error) {
        return res.sendStatus(404);
      }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const ticketTypeId = req.body.ticketTypeId as number;

    try {
        const ticket = await ticketsService.upsertTicket(userId,ticketTypeId);  
        console.log(ticket,'ticket')  
        return res.status(201).send(ticket);

      } catch (error) {
        return res.sendStatus(404);
      }
}