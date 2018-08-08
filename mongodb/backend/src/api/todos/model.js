import mongoose, { Schema } from 'mongoose'

const todosSchema = new Schema({
  usuario: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  descripcion: {
    type: String
  },
  estado: {
    type: String
  },
  fecha_creacion: {
    type: String
  },
  fecha_actualizacion: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

todosSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      usuario: this.usuario.view(full),
      descripcion: this.descripcion,
      estado: this.estado,
      fecha_creacion: this.fecha_creacion,
      fecha_actualizacion: this.fecha_actualizacion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Todos', todosSchema)

export const schema = model.schema
export default model
