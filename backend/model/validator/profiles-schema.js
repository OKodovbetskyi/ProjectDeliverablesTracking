import joi from "joi"
export const profileSchema = joi.object({
    ProfileName: joi.string().min(5).required(),
    ProfileDetails: joi.string(),
    
})