import React, {createContext, useContext} from 'react'

import useClientGet from '../hooks/useClientGet'
import {User} from '../types'

const UserContext = createContext<User>({} as User)

const UserProvider: React.FC = ({children}) => {
  let {data} = useClientGet<User>('currentUser')

  const {data: slackId} = useClientGet<string>(
    'currentUser.customField:slack_id',
  )

  if (!data) {
    data = {} as User
  } else if (slackId) {
    data.slackId = slackId
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

const useCurrentUser = (): User => {
  return useContext(UserContext)
}

export {UserContext, UserProvider, useCurrentUser}
