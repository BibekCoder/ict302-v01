import { apiPost } from "../api";

export async function sendSingleEmail(data,token){
    return apiPost("/api/emails/send",data,token);
}