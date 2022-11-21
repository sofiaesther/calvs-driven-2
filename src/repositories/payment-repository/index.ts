import { Payment, Ticket, Prisma} from "@prisma/client";
import { prisma } from "@/config";
import { PaymentBody } from "@/schemas/payments-schema";

async function findPayment(ticketId:number) {
    return prisma.payment.findFirst({
        where:{
            ticketId:ticketId
        }
    })
}
async function findTicket(ticketId:number) {
    return prisma.ticket.findFirst({
        where:{
            id:ticketId
        }
    });
}

async function updateTicket(body: PaymentBody) {
    return await prisma.ticket.update({
        where: {
          id: body.ticketId,
        },
        data: {
            status: 'PAID',
        },
      })
}

async function createPayment(body: { ticketId: number, value:number, issuer: string, digits:string }) {
    return prisma.payment.create({
        data:{
        ticketId: body.ticketId,
        value: body.value,
        cardIssuer: body.issuer, 
        cardLastDigits: body.digits
        }
    })
}

async function ticketPrice(ticketId: number) {
    const ticketPrice = await prisma.ticketType.findFirst({
        where:{
            id:ticketId
        },
        select:{
            price:true
        }
    });
    return ticketPrice; 
};


const paymentsRepository ={
    findPayment,
    findTicket,
    updateTicket,
    ticketPrice,
    createPayment
}

export default paymentsRepository;