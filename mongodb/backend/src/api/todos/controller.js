import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Todos } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Todos.create({ ...body, usuario: user })
    .then((todos) => todos.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Todos.count(query)
    .then(count => Todos.find(query, select, cursor)
      .populate('usuario')
      .then((todos) => ({
        count,
        rows: todos.map((todos) => todos.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Todos.findById(params.id)
    .populate('usuario')
    .then(notFound(res))
    .then((todos) => todos ? todos.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Todos.findById(params.id)
    .populate('usuario')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'usuario'))
    .then((todos) => todos ? Object.assign(todos, body).save() : null)
    .then((todos) => todos ? todos.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Todos.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'usuario'))
    .then((todos) => todos ? todos.remove() : null)
    .then(success(res, 204))
    .catch(next)
