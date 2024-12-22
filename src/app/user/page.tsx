import UsersParentComponent from '@/components/users/UsersParentComponent'
import { getAllUsers } from '@/restAPIs/user'
import React from 'react'

const allUsers = async () => {
  try {
    const res = getAllUsers()
    return res
  } catch (error) {
    console.log(error)
  }
}

const page = async () => {
  const users = await allUsers()
  return (
    <>
      <UsersParentComponent initialUsers={users?.data?.users} />
    </>
  )
}

export default page