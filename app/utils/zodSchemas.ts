import { z } from 'zod'

export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    laststName: z.string().min(2, "Last name is required"),
    Address: z.string().min(2, "Address is required"),
})

export const invoiceSchema = z.object({
    invoiceName: z.string().min(1, "Invoice name is required"),
    total: z.number().min(1, "1 KES is minimum"),
    status: z.enum(["PAID", "PENDING"]).default("PENDING"),
    date: z.string().min(1, "Date is required"),
    dueDate: z.number().min(0, "Due date is required"),
    fromName: z.string().min(1, "Your name is required"),
    fromEmail: z.string().email("Invalid email address"),
    fromAddress: z.string().min(1,"Your Address is Required"),
    clientName: z.string().min(1, "Client name is required"),
    clientEmail: z.string().email("Inalid email address"),
    clientAddress: z.string().min(1, "client Address is required"),
    currency: z.string().min(1, "curreny is required"),
    invoiceNumber: z.number().min(1, "Minimum invoice number of 1"),
    note: z.string().optional(),
    invoiceItemDescription: z.string().min(1, "Description is required"),
    invoiceItemQuantity: z.number().min(1, "Quantity minimum 1"),
    invoiceItemRate: z.number().min(1, 'Rate Min is 1'),
})