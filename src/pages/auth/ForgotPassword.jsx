import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

export default function ForgotPassword() {
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [resetCode, setResetCode] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  console.log({resetCode, newPass, confirmPass, email})

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      setDialogMessage('Passwords do not match!');
      setIsDialogOpen(true);
      return;
    }

    const payload = { resetCode, newPass, confirmPass, email };

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/v1/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        setIsSuccess(false);
        if (data.errors) {
          setDialogMessage(data.errors || 'Failed to reset password.');
          return;
        }else{
          setDialogMessage(data.message || 'Failed to reset password.');
        }
      } else {
        setIsSuccess(true);
        setDialogMessage(data.message);
        localStorage.removeItem('userEmail');
        navigate('/login');
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
    <div className="">
      <Header />
      <div className="w-96 mx-auto my-20 p-5 shadow-lg rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required/>
          <input type="number" placeholder="Reset Code" value={resetCode} onChange={(e) => setResetCode(e.target.value)} className="w-full p-2 border rounded" required/>
          <input type="password" placeholder="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full p-2 border rounded" required/>
          <input type="password" placeholder="Confirm New Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full p-2 border rounded" required/>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {/* Success/Error Dialog */}
        <Transition appear show={isDialogOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30"
            onClose={() => setIsDialogOpen(false)}
          >
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <Dialog.Title
                className={`text-lg font-bold ${
                  isSuccess ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isSuccess ? 'Success' : 'Error'}
              </Dialog.Title>
              <p className="mt-2 text-gray-700">{dialogMessage}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </button>
            </Dialog.Panel>
          </Dialog>
        </Transition>
      </div>
      <Footer />
    </div>
  );
}
