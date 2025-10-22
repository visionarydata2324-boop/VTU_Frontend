import React, { createContext, useEffect, useState } from 'react';
import { MdOutlinePayment, MdSpaceDashboard } from 'react-icons/md';
import { FaUserAlt, FaUsers, FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Main_links from './sidebar/main/Main_links';
import Services_links from './sidebar/services/Services_links';
import Extra_links from './sidebar/extra/Extra_links';
import { useSelector } from 'react-redux';
import { GrTransaction } from 'react-icons/gr';
import AdminNav from '../pages/admin/AdminNav';
import UserLogoutButton from '../components/user_dashboard_component/UserLogout';
import WalletBalance from '../components/walletBallance/WalletBallance';
import { getBaseUrl } from '../config';

const mainlinks = [
  {
    title: 'Dashboard',
    path: '/profile',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <MdSpaceDashboard className="text-xl" />,
  },
  {
    title: 'Fund Wallet',
    path: 'fund_wallet',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <GrTransaction className="text-xl" />,
  },
  {
    title: 'Transaction History',
    path: 'transaction-history',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <GrTransaction className="text-xl" />,
  },
];

export const SidebarLinkContext = createContext();

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Access the existingUser from Redux store to get the token
  const { existingUser } = useSelector((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);

  // Local state to store the fetched user profile data
  const [user, setUser] = useState([]);

  // console.log(existingUser);

  useEffect(() => {
    // Ensure existingUser and existingUser.data are defined
    if (existingUser.data && existingUser.data.role === 'admin') {
      setIsAdmin(true);
    } else if(existingUser && existingUser.role === 'admin') {
      setIsAdmin(true);
    }
    else {
      console.log("No current user or user data available.");
    }
  }, [existingUser]);

  // useEffect runs when the component mounts or when existingUser changes
  useEffect(() => {
    // Define an async function to fetch the user profile
    const fetchUserProfile = async () => {
      try {
        // Send GET request to the profile API endpoint
        const response = await fetch(`${getBaseUrl()}/api/v1/get-profile`, {
          method: "GET",
          headers: {
            // Send the token in the Authorization header
            'Authorization': `Bearer ${existingUser?.token}`,
            'Content-Type': 'application/json',
          },
        });

        // Parse the JSON response
        const data = await response.json();

        // Check for errors in the response
        if (!response.ok || data.error) {
          console.error("Failed to fetch user profile:", data.error || response.statusText);
          return;
        }

        // Update the user state with fetched profile data
        setUser(data.data);
      } catch (error) {
        // Handle any network or unexpected errors
        console.error("Error fetching user profile:", error.message);
      }
    };

    // Call the fetch function if the token exists
    if (existingUser?.token) {
      fetchUserProfile();
    }
  }, [existingUser]); // Only re-run the effect if existingUser changes

  return (
    <div
      className={`h-screen sidebarOverflow overflow-y-auto pb-5 z-20 bg-slate-900 text-gray-400 fixed lg:static ${ isOpen ? '64' : 'w-0'
      } transition-all duration-300`}>
      <div className="px-5 py-6 flex items-center justify-between border-b border-slate-700 relative">
        <Link to={'user-detail'}>
        <div className="flex items-center justify-center gap-2">
          <div className="text-slate-100 text-3xl font-bold flex items-center text-white/60 border-2 border-blue-500 rounded-full p-2">
            <FaUserAlt />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white/60 capitalize">
             Hi, {existingUser?.data?.firstName || existingUser.firstName || "User"}
            </h1>
            <p className="text-sm text-white/40">
              {
                existingUser ? (
                  <div className='flex items-center gap-2'>
                    Wallet:
                    <WalletBalance/>
                  </div>
                ) : (
                  <>
                    0
                  </>
                )
              }
            </p>
          </div>
        </div>
        </Link>
        <div className="absolute top-8 right-2">
          {/* Close button for mobile view */}
          <button onClick={toggleSidebar} className="text-gray-800 text-2xl bg-slate-100 lg:hidden focus:outline-none rounded-md hover:bg-gray-700 transition-colors duration-200" aria-label="Close Sidebar">
            <IoClose />
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-1 mx-2 mt-5">
        <div>
          <p className="text-[12px] text-blue-500 pl-3 font-medium">MAIN</p>
        </div>
        {mainlinks.length > 0 &&
          mainlinks.map((link, index) => (
            <SidebarLinkContext.Provider value={link} key={index}>
              <Main_links link={link} />
            </SidebarLinkContext.Provider>
          ))}
        <Services_links />
        <Extra_links />
        {
          isAdmin && (
            <div className="bg-gray-900 pt-2 pb-4">
              <p className="text-[12px] text-blue-500 pl-3 font-semibold uppercase">Admin</p>
              <AdminNav/>
            </div>
          )
        }
      </nav>
    </div>
  );
};

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const { existingUser } = useSelector((state) => state.user);

  const handleBack = () => {
    navigate(-1) // Go back to the previous page
  }
  return (
    <header className="text-white z-10 top-0 sticky bg-blue-500">
      <div className="flex items-center justify-between md:px-6 px-2 lg:py-4 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button onClick={toggleSidebar} className="text-2xl p-2 text-slate-50 focus:outline-none" aria-label="Open Sidebar">
            ☰
          </button>
        </div>

        <div className="">
          <button className="bg-gray-50 md:py-2 md:px-4 py-1 px-2 rounded-lg font-semibold text-red-800" onClick={handleBack}>Back</button>
        </div>
        {/* User Actions */}
        {
          existingUser && ( 
            <div className="">
              <UserLogoutButton/>
              {/* <Link to={'/profile'} className={`text-black`}>
                <FaUserAlt />
              </Link> */}
            </div>
          )
        }
      </div>
    </header>
  );
};

export default function Layout() {
  // State to track if sidebar is open or closed
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Access the current route path
  const location = useLocation();

  // Function to toggle the sidebar (used on small screens)
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  /**
   * Close sidebar automatically on route change
   * Only does this on screens less than 992px (mobile/tablet)
   */
  useEffect(() => {
    if (window.innerWidth < 992) {
      setSidebarOpen(false); // Auto-close sidebar on mobile after route change
    }
  }, [location.pathname]);

  /**
   * Listen to screen resizing to show/hide sidebar
   * Shows sidebar on desktop, hides it on smaller devices
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSidebarOpen(false); // Small screens: hide sidebar
      } else {
        setSidebarOpen(true); // Large screens: show sidebar
      }
    };

    // Add listener and run it immediately on mount
    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col relative max-h-[100vh]">
      <div className="flex flex-1">
        {/* Sidebar Panel */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <div className="overflow-x-hidden h-[100vh] flex-1 overflow-y-auto bg-gray-50 text-black relative">
          {/* Sticky Header with menu and logout */}
          <Header toggleSidebar={toggleSidebar} />

          {/* Dynamic page content */}
          <div className="pb-20">
            <Outlet />
          </div>

          {/* Footer */}
          <div className="fixed bottom-0 w-full bg-white p-3 flex justify-between items-center lg:flex-row flex-col">
            <p className="text-gray-400 text-sm">Copyright &copy; 2025</p>
            <p className="text-gray-400 text-sm">Made with Love from Nigeria</p>
          </div>

          {/* Floating WhatsApp Icon */}
          <Link to={'https://wa.me/+2347062194220'}>
            <div className="text-white flex justify-center items-center fixed bottom-8 right-5 h-[40px] w-[40px] bg-green-500 animate-bounce rounded-full">
              <FaWhatsapp />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
