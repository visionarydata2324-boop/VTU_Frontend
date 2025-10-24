import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getBaseUrl } from '../../config';

export default function ForgotPasswordRequest() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    let navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${getBaseUrl()}/api/v1/send-verification-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok || data.status === 'error') {
                setIsSuccess(false);
                setDialogMessage(data.message || 'Failed to send reset link.');
                return;
            }

            // Save email to localStorage
            localStorage.setItem('userEmail', email);

            setIsSuccess(true);
            setDialogMessage(data.message);
            navigate('/forgot-password')
        } catch (error) {
            setIsSuccess(false);
            setDialogMessage(error.message || 'Something went wrong!');
        } finally {
            setDialogOpen(true);
            setLoading(false);
        }
    };

    return (
        <div className="">
            <Header />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl animate-fade-in">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Forgot Password Request</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Enter Email Address</label>
                            <input
                                onChange={handleChange}
                                value={email}
                                id="email"
                                type="email"
                                className="w-full mt-2 border rounded-md p-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        {error && <div className="text-center text-red-500 font-semibold">{error}</div>}
                        <div className="text-center">
                            <Link to="/login" className="text-gray-400 text-sm hover:underline">
                                Back to login
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />

            {/* Success/Error Dialog */}
            <Transition appear show={dialogOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setDialogOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className={`text-lg font-medium leading-6 ${
                                            isSuccess ? 'text-green-600' : 'text-red-600'
                                        }`}
                                    >
                                        {isSuccess ? 'Success' : 'Error'}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{dialogMessage}</p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => setDialogOpen(false)}
                                        >
                                            Got it
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
