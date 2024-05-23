import React from 'react';

const Profile = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            photo: formData.get("photo"),
        };
        console.log(data);
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700">Photo</label>
                            <input
                                type="file"
                                name="photo"
                                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;