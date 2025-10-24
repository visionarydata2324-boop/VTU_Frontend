import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getBaseUrl } from '../../config';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDialogMessage('');

        if (password !== confirmPassword) {
            setIsSuccess(false);
            setDialogMessage('Passwords do not match');
            setIsDialogOpen(true);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${getBaseUrl()}/api/v1/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();

            if (!response.ok || data.status === 'error') {
                setIsSuccess(false);
                setDialogMessage(data.message || 'Failed to reset password.');
            } else {
                setIsSuccess(true);
                setDialogMessage('Password reset successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            setIsSuccess(false);
            setDialogMessage(`Error resetting password: ${error.message}`);
        } finally {
            setIsDialogOpen(true);
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <div className="flex my-20 flex-grow items-center justify-center px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Reset Password</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className='text-gray-700 font-semibold block mb-1'>New Password</label>
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                                type="password" 
                                className='w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition' 
                                placeholder='Enter new password' 
                                required
                            />
                        </div>
                        <div>
                            <label className='text-gray-700 font-semibold block mb-1'>Confirm Password</label>
                            <input 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                value={confirmPassword} 
                                type="password" 
                                className='w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition' 
                                placeholder='Confirm new password' 
                                required
                            />
                        </div>
                        <div className="text-center mt-2">
                            <Link to='/login' className='text-blue-600 hover:underline text-sm font-medium'>Back to login</Link>
                        </div>
                        <button 
                            type="submit" 
                           npm run dev className='w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:bg-gray-400' 
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />

            {/* Headless UI Dialog for success/error feedback */}
            <Transition appear show={isDialogOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30" onClose={() => setIsDialogOpen(false)}>
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <Dialog.Title className={`text-lg font-bold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                            {isSuccess ? 'Success' : 'Error'}
                        </Dialog.Title>
                        <p className="mt-2 text-gray-700">{dialogMessage}</p>
                        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition" onClick={() => setIsDialogOpen(false)}>
                            Close
                        </button>
                    </Dialog.Panel>
                </Dialog>
            </Transition>
        </div>
    );
}
