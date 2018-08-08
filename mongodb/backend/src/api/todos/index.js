import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Todos, { schema } from './model'

const router = new Router()
const { descripcion, estado, fecha_creacion, fecha_actualizacion } = schema.tree

/**
 * @api {post} /todos Create todos
 * @apiName CreateTodos
 * @apiGroup Todos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam descripcion Todos's descripcion.
 * @apiParam estado Todos's estado.
 * @apiParam fecha_creacion Todos's fecha_creacion.
 * @apiParam fecha_actualizacion Todos's fecha_actualizacion.
 * @apiSuccess {Object} todos Todos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todos not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ descripcion, estado, fecha_creacion, fecha_actualizacion }),
  create)

/**
 * @api {get} /todos Retrieve todos
 * @apiName RetrieveTodos
 * @apiGroup Todos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of todos.
 * @apiSuccess {Object[]} rows List of todos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /todos/:id Retrieve todos
 * @apiName RetrieveTodos
 * @apiGroup Todos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} todos Todos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todos not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /todos/:id Update todos
 * @apiName UpdateTodos
 * @apiGroup Todos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam descripcion Todos's descripcion.
 * @apiParam estado Todos's estado.
 * @apiParam fecha_creacion Todos's fecha_creacion.
 * @apiParam fecha_actualizacion Todos's fecha_actualizacion.
 * @apiSuccess {Object} todos Todos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todos not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ descripcion, estado, fecha_creacion, fecha_actualizacion }),
  update)

/**
 * @api {delete} /todos/:id Delete todos
 * @apiName DeleteTodos
 * @apiGroup Todos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Todos not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
