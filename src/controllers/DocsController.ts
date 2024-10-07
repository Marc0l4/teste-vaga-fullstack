import { Request, Response } from "express";
import user from "../services/user";
import docs from "../services/docs";

const getDoc = async (req: Request, res: Response) => {
  if(req.params.user_id && req.params.id) {
    const userId  = req.params.user_id
    const hasUser = await user.getOne(parseInt(userId))
    if(hasUser) {
      const id = parseInt(req.params.id)

      const doc = await docs.getOne(id)
      if(doc) {
        res.json({ doc: doc }) 
      } else {
        res.json({ error: 'documento não encontrado' })
      }
    } else {
      res.json({ error: 'Usuario não encontrado' })
    } 
  } else {
    res.json({ error: 'Dados inválidos' }) 
  }
} 

const addDoc = async (req: Request, res: Response) => {
  if(req.params.user_id && req.body.name && req.body.status) {
    const id  = req.params.user_id
    const hasUser = await user.getOne(parseInt(id))
    if(hasUser) {
      const { name, status } = req.body

      const newDoc = await docs.create({
        name,
        status,
        userId: parseInt(id)
      })
      
      res.status(201).json({doc: newDoc})
    } else {
      res.json({ error: 'Usuario não encontrado' })
    }
  } else {
    res.json({ error: 'Dados inválidos' })
  }
}

const updateDoc = async (req: Request, res: Response) => {
  if(req.params.user_id && req.params.id) {
    const userId  = req.params.user_id
    const hasUser = await user.getOne(parseInt(userId))
    if(hasUser) {
      const id = parseInt(req.params.id)
      const hasDoc = await docs.getOne(id)
      if(hasDoc) {
        if(req.body.name) {
          const { name } = req.body
          const updatedDoc = await docs.update(id, { name })
          res.json({ newDoc: updatedDoc })
        } else if(req.body.status) {
          const { status } = req.body
          const updatedDoc = await docs.update(id, { status })
          res.json({ newDoc: updatedDoc })
        } else if(req.body.name && req.body.status) {
          const { name, status } = req.body
          const updatedDoc = await docs.update(id, {
            name,
            status
          })
          res.json({ newDoc: updatedDoc })
        }
      } else {
        res.json({ error: 'Documento não encontrado' })
      } 
    } else {
      res.json({ error: 'Usuario não encontrado' })
    } 
  } else {
    res.json({ error: 'Dados inválidos' })
  }
}

const deleteDoc = async (req: Request, res: Response) => {
  if(req.params.user_id && req.params.id) {
    const userId  = req.params.user_id
    const hasUser = await user.getOne(parseInt(userId))
    if(hasUser) {
      const id = req.params.id
      const hasDoc = await docs.getOne(parseInt(id))
      if(hasDoc) {
        const deletedDoc = await docs.remove(hasDoc.id)
        if(!deletedDoc) {
          res.json({ error: 'Não foi possivel excluir' })
        } else {
          res.json({ message: 'Documento deletado com sucesso' })
        }
      } else {
        res.json({ error: 'Documento não encontrado' })
      }
    } else {
      res.json({ error: 'Usuario não encontrado' })
    }
  } else {
    res.json({ error: 'Dados inválidos' })
  }
} 

export default { getDoc, addDoc, updateDoc, deleteDoc }