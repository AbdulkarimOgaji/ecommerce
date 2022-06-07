import Client from './../database';

export type Order = {
    order_id?:string;
    order_status:string;
    purchase_date:Date;
    delivery_date:Date;
    id?:string;
}

export class OrderStore {
    async index():Promise<Order[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch (err){
        throw new Error(`cannot get the Orders ${err}`)
        }
    }
    async show(order_id:string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE order_id=($1)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [order_id])
            conn.release()
            return result.rows[0]
        } catch (err) {
        throw new Error(`Cannot find the Order ${order_id}. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (order_status, purchase_date, delivery_date, id) VALUES ($1, $2, $3, $4) RETURNING *'
            const conn = await Client.connect()
            const result = await conn.query(sql, [o.order_status, o.purchase_date, o.delivery_date, o.id])
            const rturnedOrder = result.rows[0]
            conn.release()
            return rturnedOrder
        } catch (err) {
        throw new Error(`Cannot add a new Order ${o.order_status}. Error: ${err}`)
        }
    }
    async update (order_id: string, newUserData: Order): Promise<Order> {
            const {order_status, delivery_date} = newUserData
        
            try {
            const sql = "UPDATE orders SET order_status = $1, delivery_date = $2 WHERE order_id = $3 RETURNING *"
            const connection = await Client.connect()
            const {rows} = await connection.query(sql, [order_status, delivery_date, order_id])
        
            connection.release()
        
            return rows[0]
            } catch (err) {
            throw new Error(`Cannot not update order ${order_status} ${delivery_date}. ${err}`)
            }
        }
    async delete(order_id: string): Promise<Order> {
    try {
        const sql = 'DELETE FROM orders WHERE order_id=($1)'
        const conn = await Client.connect()
        const result = await conn.query(sql, [order_id])
        const order = result.rows[0]
        conn.release()
        return order
        } catch (err) {
            throw new Error(`Cannot delete the order ${order_id}. Error: ${err}`)
        }
    }
}