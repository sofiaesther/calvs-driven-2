import paymentsRepository from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { PaymentBody } from "@/schemas/payments-schema";
import { Payment, Ticket } from "@prisma/client";

async function getPayment(ticketId: number): Promise<Payment> {

    const payment = await paymentsRepository.findPayment(ticketId);
    return payment;
  }

  async function getTicketByTicketId(ticketId: number): Promise<Ticket> {
    const ticket = await paymentsRepository.findTicket(ticketId);
    return ticket;
  }
  async function getEnrollemnts(userId: number): Promise<{id:number}> {

    const enrollmentId = await ticketsRepository.findEnrollment(userId);
        return enrollmentId;
    
  }
async function postPayment(body: PaymentBody): Promise<Payment> {

    const ticket = await paymentsRepository.ticketPrice(body.ticketId)

    const lastdig = String(body.cardData.number).substring(12,15);
    const payment = await paymentsRepository.createPayment({ ticketId: body.ticketId, value:ticket.price, issuer: body.cardData.issuer, digits:lastdig })
    const updateticket = await paymentsRepository.updateTicket(body);
    return {
      id: payment.id,
      ticketId: body.ticketId,
      value: ticket.price,
      cardIssuer: body.cardData.issuer,
      cardLastDigits: lastdig,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }

const paymentService = {
  getPayment,
  postPayment,
  getTicketByTicketId,
  getEnrollemnts
};



export default paymentService;