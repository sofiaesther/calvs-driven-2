import { prisma } from "@/config";
import { Prisma, Ticket,TicketType, Enrollment } from "@prisma/client";

async function findTicketTypes() {
    return prisma.ticketType.findMany({})
}

async function findEnrollment(userId: number) {
    return await prisma.enrollment.findFirst({
        where:{
            userId:userId
        },
        select:{
            id:true
        }
    })
}
async function findTicketByUser(enrollmentId: number) {

    return prisma.ticket.findFirst({
    where:{
        enrollmentId:enrollmentId
    },
include:{
    TicketType:true
}})
}

async function upsertUserTicket(userId: number, ticketTypeId: number) {
    let ticketType = await prisma.ticketType.findFirst({
        where:{
            id:ticketTypeId
        }
    });
    let enrollmentId = await prisma.enrollment.findFirst({
        where:{
            userId:userId
        },
        select:{
            id:true
        }
    });

    const ticketId = (await prisma.ticket.findFirst({
        where:{
            enrollmentId:enrollmentId.id
        }
    }));


    await prisma.ticket.create({
        data: {
            status: 'RESERVED',
            ticketTypeId: ticketTypeId,
            enrollmentId: enrollmentId.id
        }
})
let ticket = (await prisma.ticket.findFirst({
    where:{
        enrollmentId:enrollmentId.id
    },
    include:{
        TicketType:true
    }
}));
    return ticket;
};

const ticketsRepository = {
    findTicketTypes,
    findTicketByUser,
    upsertUserTicket,
    findEnrollment
  };
  
  export default ticketsRepository;