import joi from 'joi';

const idSchema =joi.number().integer().min(1).required();

export const deliverableSchema = joi.object({
    DeliverableTitle: joi.string().min(10).required(),
    DeliverableDetail: joi.string().required()
})

export const categorySchema = joi.object({
    CategoryName: joi.string().min(5).required()
});

export default idSchema;