import { Todos } from '.'
import { User } from '../user'

let user, todos

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  todos = await Todos.create({ usuario: user, descripcion: 'test', estado: 'test', fecha_creacion: 'test', fecha_actualizacion: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = todos.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(todos.id)
    expect(typeof view.usuario).toBe('object')
    expect(view.usuario.id).toBe(user.id)
    expect(view.descripcion).toBe(todos.descripcion)
    expect(view.estado).toBe(todos.estado)
    expect(view.fecha_creacion).toBe(todos.fecha_creacion)
    expect(view.fecha_actualizacion).toBe(todos.fecha_actualizacion)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = todos.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(todos.id)
    expect(typeof view.usuario).toBe('object')
    expect(view.usuario.id).toBe(user.id)
    expect(view.descripcion).toBe(todos.descripcion)
    expect(view.estado).toBe(todos.estado)
    expect(view.fecha_creacion).toBe(todos.fecha_creacion)
    expect(view.fecha_actualizacion).toBe(todos.fecha_actualizacion)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
