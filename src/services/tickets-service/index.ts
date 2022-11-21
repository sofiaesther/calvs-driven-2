import { TicketType, Ticket} from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";

export type TicketTypeParams = { ticketTypeId: number };

async function getTypes(): Promise<TicketType[]> {

    return ticketsRepository.findTicketTypes();;
  }

async function getTickets(userId: number): Promise<Ticket> {

    const enrollmentId = await ticketsRepository.findEnrollment(userId);
    if (!enrollmentId){
        return;
    }
    
    const tickets = await ticketsRepository.findTicketByUser(enrollmentId.id);

    if (!tickets){
        return;
    }
    return tickets;
  }


  async function upsertTicket(userId: number, ticketTypeId: number): Promise<TicketParams> {

    const tickets = await ticketsRepository.upsertUserTicket(userId,ticketTypeId)
    return tickets;
  }

export type TicketParams = {
    id: number,
    status: string,
    ticketTypeId: number,
    enrollmentId: number,
    TicketType: {
      id: number,
      name: string,
      price: number,
      isRemote: boolean,
      includesHotel: boolean,
      createdAt: Date,
      updatedAt: Date,
    },
    createdAt: Date,
    updatedAt: Date,
  };
const ticketsService = {
    getTypes,
    getTickets,
    upsertTicket

};



export default ticketsService;

