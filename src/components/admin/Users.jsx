import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import UsersTable from './Usertable';
import useGetAllUsers from '@/hooks/useGetAllUsers';

const Users = () => {
    useGetAllUsers();
    const [input, setInput] = useState("");

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <UsersTable />
            </div>
        </div>
    )
}

export default Users;
