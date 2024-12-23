"use client"


import React, { useState } from "react";
import CreateUserModal from './CreateUserModal'
import UserTable from './UsersList'

interface UsersParentComponentProps {
    initialUsers: User[];
}

const UsersParentComponent: React.FC<UsersParentComponentProps> = ({ initialUsers }) => {
    const [showingUsers, setShowingUsers] = useState<User[]>(initialUsers)
    return (
        <>
            <CreateUserModal setShowingUsers={setShowingUsers} />
            <UserTable users={showingUsers} />
        </>
    );
};

export default UsersParentComponent;
