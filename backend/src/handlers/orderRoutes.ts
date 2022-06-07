import express, { Request, Response } from 'express';
import {Order, OrderStore} from '../models/order';

const store = new OrderStore();

const index = async(_req:Request , res:Response) => {
    try{
        const orders = await store.index()
        res.json({
            data:orders,
            message: 'show all orders'})
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try{
        const order = await store.show(req.params.id)
        res.json({
            data:order,
            message: 'show certain order'})
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {

const order: Order = {
        order_status: req.body.order_status,
        purchase_date: req.body.purchase_date,
        delivery_date: req.body.delivery_date,
        id: req.body.id
    }
    
    try {
        const newOrder = await store.create(order)
        res.json({
            data:newOrder,
            message: 'New order was created',})
    }catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
        try {
            const order_id = req.params.order_id as unknown as string
            const order_status = req.body.order_status as unknown as string
            const purchase_date = req.body.order_status as unknown as Date
            const delivery_date = req.body.delivery_date as unknown as Date
            const id  = req.body.id as unknown as string
            if (order_status === undefined || delivery_date === undefined || purchase_date === undefined || order_id === undefined || id === undefined) {
                    res.status(400)
                    res.send("Some parameters gone missing :order_id, :order_status, :purchase_date :delivery_date")
                    return false
                }
            
                const order: Order = await store.update(order_id, {order_status, delivery_date, purchase_date, id})
            
                res.json({
                    data:order,
                    message: 'order was updated successfully'})
                } catch (e) {
                res.status(400)
                res.json(e)
                }
            }
const destroy = async (req: Request, res: Response) => {
    try{
        const deleted = await store.delete(req.params.id as string)
        res.json({
            data:deleted,
            message: 'order was deleted successfully'})
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index /* verify*/)
    app.get('/orders/:id', /* verify*/show)
    app.post('/orders',  /* verify*/create)
    app.delete('/orders/:id', /* verify*/ destroy) 
    app.put('/orders/:id/',  /* verify*/update)

}

export default orderRoutes;