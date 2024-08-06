/* eslint-disable no-unused-vars */
import { baseURL } from 'api/baseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdEdit, MdSearch } from 'react-icons/md';
import { message, Tooltip } from 'antd';
import { apis } from 'api/apis';
import moment from 'moment';

const UserTooltip = ({ userInfo }) => (
    <div>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.contact}</p>
        <p><strong>CCM Number:</strong> {userInfo.ccm_number}</p>
        <p><strong>Date Joined:</strong> {moment(userInfo.date_joined).format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
);

const Representatives = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [editingWilaya, setEditingWilaya] = useState(null); // State to track the wilaya being edited
    const [repData, setRepData] = useState({
        name: '', email: '', contact: '', ccm_number: ''
    });
    const [representatives, setRepresentatives] = useState([]);

    const fetchWilaya = async () => {
        try {
            const response = await axios.get(`${baseURL}api/ccm/get-mikoa/`);

            if (response.data.success) {
                const wilayaData = Object.entries(response.data.wilaya).flatMap(
                    ([mkoa, wilayas]) => wilayas.map((wilaya) => ({ mkoa, wilaya }))
                );
                setData(wilayaData);
                console.log('Success: ', response.data);
            } else {
                console.log('error occurred: ', response.data.error);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const fetchWilayaRepresentatives = async () => {
        const response = await axios.get(apis.getWilayaRepresentativesUrl, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('refresh_token')}`
            }
        });
        if (response.data.success) {
            setRepresentatives(response.data.data); // Update the state with the representatives data
            console.log('Data: ', response.data.data);
        } else {
            console.log('An error occurred');
        }
    };

    useEffect(() => {
        fetchWilaya();
        fetchWilayaRepresentatives();
    }, []);

    const filteredData = data
        .filter(({ wilaya }) =>
            wilaya.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.wilaya.localeCompare(b.wilaya));

    // Function to handle opening the editing mode for a wilaya
    const handleEditWilaya = (wilaya) => {
        setEditingWilaya(wilaya); // Set the wilaya being edited
        setRepData({
            name: wilaya.name || '',
            email: wilaya.email || '',
            contact: wilaya.contact || '',
            ccm_number: wilaya.ccm_number || '',
        }); // Set the initial value of the edited name
    };

    const handleSaveData = async () => {
        try {
            const response = await axios.post(`${baseURL}api/ccm/assign-representative/`, {
                ...repData,
                wilaya: editingWilaya.wilaya,
                mkoa: editingWilaya.mkoa
            }, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                }
            });
            if (response.data.success) {
                const updatedRepresentative = response.data.representative;
                const rep = response.data.user;
                message.success('Success');
                // Find the corresponding item in the data array and update its name
                const updatedData = data.map(item => {
                    if (item.wilaya === updatedRepresentative.wilaya) {
                        return { ...item, name: rep.fullname };
                    }
                    return item;
                });
                setData(updatedData);
                // Reset editing state after saving
                setEditingWilaya(null);
                setRepData({
                    name: '',
                    email: '',
                    contact: '',
                    ccm_number: ''
                });
            } else {
                console.log('failed');
            }
        } catch (error) {
            console.error('Error saving:', error);
            // Handle errors here
        }
    };

    // Function to handle cancelling editing
    const handleCancelEdit = () => {
        // Reset editing state
        setEditingWilaya(null);
        setRepData({
            name: '',
            email: '',
            contact: '',
            ccm_number: ''
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Representatives</h1>
            <div className="flex justify-between mb-4 items-center relative w-full max-w-xs">
                <input
                    type="text"
                    placeholder="Search by province"
                    className="border p-2 rounded w-full bg-white shadow-lg border-outline pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MdSearch className="absolute right-2 top-2 h-6 w-6 text-black p-1 rounded bg-gray-200" />
            </div>
            <div className="bg-white p-4 rounded shadow-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">S/N</th>
                                <th className="py-2 px-4 border-b">Province / Jimbo</th>
                                <th className="py-2 px-4 border-b">Region</th>
                                <th className="py-2 px-4 border-b">Representative</th>
                                <th className="py-2 px-4 border-b"></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {filteredData.map((item, index) => {
                                const representative = representatives.find(rep => rep.wilaya === item.wilaya);
                                const userInfo = representative ? {
                                    email: representative.user.email,
                                    contact: representative.user.contact,
                                    ccm_number: representative.user.ccm_number,
                                    date_joined: representative.user.created_at
                                } : {};
                                return (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{index + 1}</td>
                                        <td className="py-2 px-4 border-b">{item.wilaya}</td>
                                        <td className="py-2 px-4 border-b">{item.mkoa}</td>
                                        <td className="py-2 px-4 border-b">
                                            {representative ? (
                                                <Tooltip title={<UserTooltip userInfo={userInfo} />} placement="top">
                                                    <span>{representative.user.fullname}</span>
                                                </Tooltip>
                                            ) : ''}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {editingWilaya === item ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter representative name"
                                                        className="border p-2 rounded w-full bg-white shadow-lg border-outline mb-2"
                                                        value={repData.name}
                                                        onChange={(e) => setRepData({ ...repData, name: e.target.value })}
                                                    />
                                                    <input
                                                        type="email"
                                                        placeholder="Enter representative email"
                                                        className="border p-2 rounded w-full bg-white shadow-lg border-outline mb-2"
                                                        value={repData.email}
                                                        onChange={(e) => setRepData({ ...repData, email: e.target.value })}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Enter phone number 0**"
                                                        className="border p-2 rounded w-full bg-white shadow-lg border-outline mb-2"
                                                        value={repData.contact}
                                                        onChange={(e) => setRepData({ ...repData, contact: e.target.value })}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Enter ccm number"
                                                        className="border p-2 rounded w-full bg-white shadow-lg border-outline mb-2"
                                                        value={repData.ccm_number}
                                                        onChange={(e) => setRepData({ ...repData, ccm_number: e.target.value })}
                                                    />
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded"
                                                            onClick={handleCancelEdit}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 bg-blue-500 text-white rounded"
                                                            onClick={handleSaveData}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleEditWilaya(item)}
                                                >
                                                    <MdEdit className="inline h-5 w-5" />
                                                    {representative ? 'Edit' : 'Add'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Representatives;
