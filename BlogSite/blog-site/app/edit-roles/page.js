"use client";
import React, { useState } from 'react';







function EditRoles() {
    const [savedUsers, setSavedUsers] = useState([]);
    const [expandedRoleId, setExpandedRoleId] = useState(null);
    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin', permissions: ['Create', 'Edit', 'Delete'] },
        { id: 2, name: 'Editor', permissions: ['Create', 'Edit'] },
        { id: 3, name: 'Viewer', permissions: ['View'] },
    ]);



    const handleRoleChange = async (email, role) => {
        try {
            const response = await fetch(`/api/role`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, role }),
            });

            const result = await response.json();

            if (result) {
                alert(`${result.message} for ${email} to ${role}`);
                setSavedUsers((prevUsers) => {
                    return prevUsers.map((user) =>
                        user.email === email ? { ...user, role } : user
                    );
                })} 
                else {
                alert('Failed to update user role:', result.error);
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };


    const handleEdit = async (role) => {
        try {
            const url = new URL('/api/role', window.location.origin);
            url.searchParams.append('role', role);
            let req = await fetch(url);
            let res = await req.json();
            setSavedUsers(res.users);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleDelete = (id) => {
        console.log(`Delete role with ID: ${id}`);
    };

    const toggleExpandedRole = (id) => {
        setExpandedRoleId(expandedRoleId === id ? null : id); // Toggle visibility
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-[#191947] mb-6">Edit Roles</h1>
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-gray-600">Role</th>
                            <th className="px-4 py-2 text-gray-600">Permissions</th>
                            <th className="px-4 py-2 text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <React.Fragment key={role.id}>
                                <tr className="bg-gray-50">
                                    <td className="border px-4 py-2">{role.name}</td>
                                    <td className="border px-4 py-2">{role.permissions.join(', ')}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className="text-white bg-[#8D8080] px-4 py-2 rounded-full hover:bg-[#726f6f] transition duration-300 mr-2"
                                            onClick={() => {
                                                handleEdit(role.name);
                                                toggleExpandedRole(role.id);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                                            onClick={() => handleDelete(role.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                {expandedRoleId === role.id && (
                                    <tr>
                                        <td colSpan="3" className="px-4 py-2">
                                            <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
                                                <table className="w-full text-left table-auto border-collapse">

                                                    <tbody>
                                                        {savedUsers.filter(user => user.role === role.name).map((user) => (
                                                            <tr key={user.id}>
                                                                <td className="border px-4 py-2">{user.name}</td>
                                                                <td className="border px-4 py-2">{user.email}</td>
                                                                <td className="border px-4 py-2">
                                                                    <select
                                                                        name="role"
                                                                        id={`role-${user.id}`}
                                                                        defaultValue={user.role}
                                                                        className="border px-2 py-1 rounded"
                                                                        onChange={(e) => handleRoleChange(user.email, e.target.value)}
                                                                    >
                                                                        <option value="Admin">Admin</option>
                                                                        <option value="Editor">Editor</option>
                                                                        <option value="Viewer">Viewer</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EditRoles;
