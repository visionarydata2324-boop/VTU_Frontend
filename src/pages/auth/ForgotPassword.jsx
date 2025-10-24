import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getBaseUrl } from '../../config';

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const emailFromState = location.state?.email || localStorage.getItem('userEmail') || '';
  const [email, setEmail] = useState(emailFromState);
  const [resetCode, setResetCode] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (emailFromState) localStorage.setItem('userEmail', emailFromState);
  }, [emailFromState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      setIsSuccess(false);
      setDialogMessage('Passwords do not match. Please confirm your password correctly.');
      setIsDialogOpen(true);
      return;
    }

    const payload = { resetCode, newPass, confirmPass, email };

    try {
      setLoading(true);
      const response = await fetch(`${getBaseUrl()}/api/v1/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok && data.status === 'success') {
        setIsSuccess(true);
        setDialogMessage(data.message || 'Password reset successfully.');
        localStorage.removeItem('userEmail');
        navigate('/login');
      } else {
        setIsSuccess(false);
        setDialogMessage(
          data.message ||
            data.error ||
            'Unable to reset password. Please verify your code and try again.'
        );
      }
    } catch (error) {
      setIsSuccess(false);
      setDialogMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsDialogOpen(true);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="w-full max-w-md my-20 md:p-8 p-4 mx-2 md:mx-0 shadow-lg rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed text-gray-500"
          />
          <input
            type="number"
            placeholder="Reset Code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

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
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
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
