import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

export const CustomerController = {
    getCustomers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customers = await prisma.customer.findMany();
            res.status(200).json(customers);
        } catch (error) {
            next(error);
        }
    },
    getCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await prisma.customer.findUnique({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    },
    createCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await prisma.customer.create({
                data: req.body,
            });
            res.status(201).json(customer);
        } catch (error) {
            next(error);
        }
    },
    updateCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await prisma.customer.update({
                where: {
                    id: req.params.id,
                },
                data: req.body,
            });
            res.status(200).json(customer);
        }        catch (error) {
            next(error);
        }
    },
    deleteCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await prisma.customer.delete({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    },
}