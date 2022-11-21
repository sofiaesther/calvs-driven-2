import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";
import { paymentSchema } from "@/schemas/payments-schema";


export async function getPayments(req: AuthenticatedRequest, res: Response) {
    const ticketId = req.query.ticketId ;
    const { userId } = req;
    
    if (!ticketId){
        return res.sendStatus(400);
    }

    try {
    
    const ticket = await paymentService.getTicketByTicketId(Number(ticketId)); 

    if(!ticket){
        return res.sendStatus(404);
    }

    const enrollmentId = await paymentService.getEnrollemnts(userId);

    if(enrollmentId.id!==ticket.enrollmentId){
        return res.sendStatus(401);
    }

    const payment= await paymentService.getPayment(Number(ticketId));
          
        return res.status(200).send(payment);

      } catch (error) {
        console.log(error)
        return res.sendStatus(error);
      }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
    const body = req.body;
    const { userId } = req;

    if (!body.ticketId){
        return res.sendStatus(400);
    }
    if (!body.cardData){
        return res.sendStatus(400);
    }

    try {
        const ticket = await paymentService.getTicketByTicketId(Number(body.ticketId)); 

        if(!ticket){
            return res.sendStatus(404);
        }
    
        const enrollmentId = await paymentService.getEnrollemnts(userId);
    
        if(enrollmentId.id!==ticket.enrollmentId){
            return res.sendStatus(401);
        }
    const payment= await paymentService.postPayment(body)
          
    return res.status(201).send(payment);

    } catch (error) {
        return res.sendStatus(error);
      }
}