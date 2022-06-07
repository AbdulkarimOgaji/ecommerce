import supertest from "supertest"
import jwt, {Secret} from "jsonwebtoken"
import {Order} from "../../models/order"
import app from "../../server"

const request = supertest(app)
const SECRET = process.env.TOKEN_SECRET as Secret
