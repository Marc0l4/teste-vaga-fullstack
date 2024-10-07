import { Request, Response } from 'express'
import user from '../services/user'
import Auth from '../auths/jwt'

const createUser = async (req: Request, res: Response) => {
  if(req.body.name && req.body.email) {
    const { email, name } = req.body
    const hasUser = await user.getOne(email)
    if(!hasUser) {
      const newUser = await user.create({ email, name })
      if(newUser) {
        const token = Auth.generateToken({ 
          id: newUser.id, 
          email: newUser.email 
      })

      res.status(201).json({ user: newUser, token })
      } else {
        res.json({ error: 'Ocorreu um erro' });
      }
    } else {
      res.json({ error: 'E-mail já existe.' });
    }
  } else {
    res.json({ error: 'E-mail e/ou nome não enviados.' });
  }
}

const login = async (req: Request, res: Response) => {
  if(req.body.name && req.body.email) {
    const { email, name } = req.body
    const all = await user.getAll()
    if(all) {
      const hasUser = all.find(item => item.name === name)
      if (hasUser && hasUser.name === name && hasUser.email === email) {
        const token = Auth.generateToken({ 
          id: hasUser.id, 
          email: hasUser.email 
        })
        res.json({ status: true, token })
      } else {
        res.json({ error: 'Dados Invalidos' })
      }
    }
  } else {
    res.json({ error: 'Ocorreu um erro' })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await user.getAll()
  res.json({ users: allUsers })
}

const getUser = async (req: Request, res: Response) => {
  if (req.params.id) {
    const User = await user.getOne(parseInt(req.params.id))
    res.json({ user: User })
  } else {
    res.json({ error: 'Usuario não encontrado' })
  }
}

const updateUser = async (req: Request, res: Response) => {
  if (req.body.name || req.body.email && req.params.id) {
    const { email, name } = req.body
    const { id } = req.params
    const hasUser = await user.getOne(parseInt(id))
    if (hasUser) {
      const updatedUser = await user.update( parseInt(id),{email, name })
      res.json({ user: updatedUser })
    } else {
      res.json({ error: 'Ocorreu um erro' })
    } 
  } else {
    res.json({ error: 'Usuario não encontrado' })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  if (req.params.id) {
    const { id } = req.params
    const hasUser = await user.getOne(parseInt(id))
    if (hasUser) {
      const deletedUser = await user.remove(parseInt(id))
      if(deletedUser) {
        res.json({ message: 'Usuario deletado com sucesso' })
      } else {
        res.json({ error: 'Ocorreu um erro' })
      }
    } else {
      res.json({ error: 'Usuario não encontrado' })
    } 
  } else {
    res.json({ error: 'Ocorreu um erro' })
  }
}

export default { createUser, getAllUsers, getUser, updateUser, deleteUser, login }