import {Order, OrderStore} from '../../models/order'


const store = new OrderStore()

describe("Order Model", () => {

    it("Must Have Index Method", () => {
        expect(store.index).toBeDefined()
    })

    it("Must Have Show Method", () => {
        expect(store.show).toBeDefined()
    })

    it("Must Have Create Method", () => {
        expect(store.create).toBeDefined()
    })

    it("Must Have Delete Method", () => {
        expect(store.delete).toBeDefined()
    })
})
