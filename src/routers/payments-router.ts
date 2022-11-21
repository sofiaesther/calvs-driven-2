import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayments, postPayments } from "@/controllers/payment-controller";


const paymentsRouter = Router();

paymentsRouter
    .get("",authenticateToken,getPayments)
    .post("/process", authenticateToken, postPayments)

export { paymentsRouter };