import Joi from "joi";

export type PaymentBody = {
	ticketId: number,
	cardData: {
		issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
	}
}

export const paymentSchema = Joi.object<PaymentBody>({
	ticketId: Joi.number().required(),
	cardData: {
		issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.number().required()
	}
});
