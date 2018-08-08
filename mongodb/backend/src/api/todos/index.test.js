import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Todos } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, todos

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  todos = await Todos.create({ usuario: user })
})

test('POST /todos 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, descripcion: 'test', estado: 'test', fecha_creacion: 'test', fecha_actualizacion: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.descripcion).toEqual('test')
  expect(body.estado).toEqual('test')
  expect(body.fecha_creacion).toEqual('test')
  expect(body.fecha_actualizacion).toEqual('test')
  expect(typeof body.usuario).toEqual('object')
})

test('POST /todos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /todos 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].usuario).toEqual('object')
})

test('GET /todos 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /todos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${todos.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(todos.id)
  expect(typeof body.usuario).toEqual('object')
})

test('GET /todos/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${todos.id}`)
  expect(status).toBe(401)
})

test('GET /todos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /todos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${todos.id}`)
    .send({ access_token: userSession, descripcion: 'test', estado: 'test', fecha_creacion: 'test', fecha_actualizacion: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(todos.id)
  expect(body.descripcion).toEqual('test')
  expect(body.estado).toEqual('test')
  expect(body.fecha_creacion).toEqual('test')
  expect(body.fecha_actualizacion).toEqual('test')
  expect(typeof body.usuario).toEqual('object')
})

test('PUT /todos/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${todos.id}`)
    .send({ access_token: anotherSession, descripcion: 'test', estado: 'test', fecha_creacion: 'test', fecha_actualizacion: 'test' })
  expect(status).toBe(401)
})

test('PUT /todos/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${todos.id}`)
  expect(status).toBe(401)
})

test('PUT /todos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, descripcion: 'test', estado: 'test', fecha_creacion: 'test', fecha_actualizacion: 'test' })
  expect(status).toBe(404)
})

test('DELETE /todos/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${todos.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /todos/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${todos.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /todos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${todos.id}`)
  expect(status).toBe(401)
})

test('DELETE /todos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
