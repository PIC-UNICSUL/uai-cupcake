import { v4 as uuidv4 } from 'uuid'
import { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { AuthState, User, userType } from '@/@types/types'

const UAICUPCAKES_USER_TOKEN_STORAGE_KEY = 'uaiCupcakes:user_token'
const UAICUPCAKES_USERS_STORAGE_KEY = 'uaiCupcakes:users_bd'

export const createAuthSlice: StateCreator<
  AuthState,
  [],
  [['zustand/immer', never]]
> = immer((set, get) => ({
  user: null,
  signed: false,

  initializeUserFromStorage: () => {
    const tokenData = JSON.parse(
      localStorage.getItem(UAICUPCAKES_USER_TOKEN_STORAGE_KEY) || 'null',
    )
    const users = JSON.parse(
      localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY) || '[]',
    )
    const loggedInUser = users.find(
      (user: User) => user.user_id === tokenData?.userId,
    )

    if (loggedInUser) {
      set((state) => {
        state.user = loggedInUser
        state.signed = true
      })
    }
  },

  signin: (email: string, password: string) => {
    const users = JSON.parse(
      localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY) || '[]',
    )
    const user = users.find((user: User) => user.email === email)

    if (!user) return 'Usuário não cadastrado'
    if (user.password_hash !== password) return 'E-mail ou senha incorretos'

    const tokenData = { userId: user.user_id, token: uuidv4() }
    localStorage.setItem(
      UAICUPCAKES_USER_TOKEN_STORAGE_KEY,
      JSON.stringify(tokenData),
    )

    set((state) => {
      state.user = user
      state.signed = true
    })
  },

  signup: (newUser: User) => {
    const users = JSON.parse(
      localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY) || '[]',
    )
    const normalizedEmail = newUser.email.trim().toLowerCase()
    const userExists = users.some(
      (user: User) => user.email === normalizedEmail,
    )

    if (userExists) return 'Já tem uma conta com esse E-mail'

    const userWithId = {
      ...newUser,
      user_id: uuidv4(),
      created_at: new Date(),
      user_type: newUser.user_type || 'customer',
    }
    users.push(userWithId)
    localStorage.setItem(UAICUPCAKES_USERS_STORAGE_KEY, JSON.stringify(users))
  },

  signout: () => {
    set((state) => {
      state.user = null
      state.signed = false
    })
    localStorage.removeItem(UAICUPCAKES_USER_TOKEN_STORAGE_KEY)
  },

  updateUser: (updatedUser: Partial<User>) => {
    const { user } = get()
    if (!user) return 'Nenhum usuário logado'

    const users = JSON.parse(
      localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY) || '[]',
    )
    const userIndex = users.findIndex(
      (storedUser: User) => storedUser.user_id === user.user_id,
    )

    if (userIndex === -1) return 'Usuário não encontrado'

    if (updatedUser.email) {
      const emailExists = users.some(
        (u: User) =>
          u.email.trim().toLowerCase() ===
            updatedUser.email?.trim().toLowerCase() &&
          u.user_id !== user.user_id,
      )
      if (emailExists) return 'E-mail já está registrado em outra conta'
    }

    users[userIndex] = { ...user, ...updatedUser, updated_at: new Date() }
    localStorage.setItem(UAICUPCAKES_USERS_STORAGE_KEY, JSON.stringify(users))

    set((state) => {
      state.user = users[userIndex]
    })
  },

  fetchUsers: () =>
    JSON.parse(localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY) || '[]'),

  promoteToAdmin: (userId: string) => {
    const users = JSON.parse(
      localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY) || '[]',
    )
    const userIndex = users.findIndex((user: User) => user.user_id === userId)

    if (userIndex === -1) return 'Usuário não encontrado'

    users[userIndex].user_type = userType.admin
    localStorage.setItem(UAICUPCAKES_USERS_STORAGE_KEY, JSON.stringify(users))
    return 'Usuário promovido a administrador'
  },

  isAdmin: () => get().user?.user_type === userType.admin,
}))
