import React, { useState } from 'react';

const Profile = () => {
    const [editing, setEditing] = useState(false);

    const [user, setUser] = useState({
        id: 1,
        username: 'john_doe',
        email: 'john@example.com',
        bio: 'Web Developer | React Enthusiast',
        followers: 120,
        following: 80,
        posts: 42,
        // ...other user information
    });

    const handleEditProfile = () => {
        setEditing(true);
    };

    const handleSaveProfile = () => {
        // Add logic to save updated profile data to the server
        // For now, let's just set editing to false
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            {!editing ? (
                <div>
                    <p className="text-gray-700">
                        <span className="font-semibold">Username:</span> {user.username}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Bio:</span> {user.bio}
                    </p>
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="text-gray-700">
                                <span className="font-semibold">Followers:</span> {user.followers}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Following:</span> {user.following}
                            </p>
                        </div>
                        <p className="text-gray-700">
                            <span className="font-semibold">Posts:</span> {user.posts}
                        </p>
                    </div>
                    <button
                        onClick={handleEditProfile}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form>
                    {/* Add form fields for editing user profile */}
                    <label className="block mb-2">
                        <span className="text-gray-700">Username:</span>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Bio:</span>
                        <textarea
                            name="bio"
                            value={user.bio}
                            onChange={handleChange}
                            className="form-textarea mt-1 block w-full"
                        />
                    </label>
                    {/* Add more fields as needed */}
                    <div className="flex justify-between mb-4">
                        <div>
                            <label className="block mb-2">
                                <span className="text-gray-700">Followers:</span>
                                <input
                                    type="number"
                                    name="followers"
                                    value={user.followers}
                                    onChange={handleChange}
                                    className="form-input mt-1 block w-full"
                                />
                            </label>
                            <label className="block mb-2">
                                <span className="text-gray-700">Following:</span>
                                <input
                                    type="number"
                                    name="following"
                                    value={user.following}
                                    onChange={handleChange}
                                    className="form-input mt-1 block w-full"
                                />
                            </label>
                        </div>
                        <label className="block mb-2">
                            <span className="text-gray-700">Posts:</span>
                            <input
                                type="number"
                                name="posts"
                                value={user.posts}
                                onChange={handleChange}
                                className="form-input mt-1 block w-full"
                            />
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={handleSaveProfile}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Save Profile
                    </button>
                </form>
            )}
        </div>
    );
};

export default Profile;