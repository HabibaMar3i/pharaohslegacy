import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import "./App.css";
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Subscription from './Components/Subscription/Subscription';
import Events from './Components/Events/Events';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import AboutUs from './Components/AboutUs/AboutUs';
import HistoricalPlaces from "./Components/HistoricalPlaces/HistoricalPlaces";
import PlanMeeting from "./Components/PlanMeeting/PlanMeeting";
import MeetingDetails from "./Components/MeetingDetails/MeetingDetails";
import Ai from "./Components/Ai/Ai";
import Cart from "./Components/Cart/Cart";
import Relatives from "./Components/Relatives/Relatives";
import Feedback from "./Components/Feedback/Feedback";
import ManageTourists from "./Components/ManageTourists/ManageTourists";
import ManageServices from "./Components/ManageServices/ManageServices";
import ManageProducts from "./Components/ManageProducts/ManageProducts";
import ManageTourPersonnel from "./Components/ManageTourPersonnel/ManageTourPersonnel";
import ManageEvents from "./Components/ManageEvents/ManageEvents";
import AdminHomePage from "./Components/AdminHomePage/AdminHomePage";
import Products from "./Components/Products/Products";
import Services from "./Components/Services/Services";
import HomePage from "./Components/HomePage/HomePage";
import Order from "./Components/Order/Order";
import Wishlist from "./Components/Wishlist/Wishlist";
import ManageOrders from "./Components/ManageOrders/ManageOrders";
import ManageFeedback from "./Components/ManageFeedback/ManageFeedback";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import SubscriptionSuccess from "./Components/SubscriptionSuccess/SubscriptionSuccess";
import PreviousOrders from "./Components/PreviousOrders/PreviousOrders";
import Profile from "./Components/Profile/Profile";
import ViewReservation from "./Components/ViewReservation/ViewReservation";
import HistoricalContent from "./Components/HistoricalContent/HistoricalContent";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
export default function App() {
  const [userType, setUserType] = useState(localStorage.getItem('user_type') || 'tourist');
  const [subscriptionId, setSubscriptionId] = useState(localStorage.getItem('subscription_id') || null);

  const routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'meetingdetails', element: userType === 'tourist' && subscriptionId !== '1' ? <ProtectedRoute><MeetingDetails /></ProtectedRoute> : <Navigate to="/notfound" /> },
        { path: 'planmeeting', element: userType === 'tourist' && subscriptionId !== '1' ? <ProtectedRoute><PlanMeeting /></ProtectedRoute> : <Navigate to="/notfound" /> },
        { path: 'subscription', element: userType === 'tourist' ? <ProtectedRoute><Subscription /></ProtectedRoute> : <Navigate to="/notfound" /> },
        { path: 'events', element: <Events />},
        { path: 'historicalcontent', element: <HistoricalContent />},
        { path: 'register', element: <Register />},
        { path: 'login', element: <Login /> },
        { path: 'subscriptionsuccess', element: userType === 'tourist'? <ProtectedRoute> <SubscriptionSuccess /></ProtectedRoute>: <Navigate to="/notfound" />},
        { path: 'ai', element: userType !== 'admin' && subscriptionId !== '1' ? <ProtectedRoute><Ai /></ProtectedRoute> : <Navigate to="/notfound" /> },
        { path: 'relatives', element: userType === 'tourist' && subscriptionId !== '1' ? <ProtectedRoute><Relatives /></ProtectedRoute> : <Navigate to="/notfound" /> },
        { path: 'aboutus', element: <AboutUs /> },
        { path: 'products', element: <ProtectedRoute><Products /> </ProtectedRoute>},
        { path: 'product/:productId', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute>},
        { path: 'services', element: <ProtectedRoute><Services /></ProtectedRoute> },
        { path: 'order', element: <ProtectedRoute><Order /></ProtectedRoute> },
        { path: 'previousorders', element: <ProtectedRoute><PreviousOrders /></ProtectedRoute> },
        { path: 'feedback', element: <ProtectedRoute><Feedback /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'ordersuccess', element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> },
        { path: 'historicalplaces', element: <HistoricalPlaces /> },
        { path: 'homepage', element: <HomePage /> },
        { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute>},
        { path: 'notfound', element: <NotFound /> },
        { path: '*', element: <NotFound /> },

        { path: 'adminhomepage', element: userType === 'admin' ? <AdminHomePage /> : <Navigate to="/notfound" /> },
        { path: 'managetourists', element: userType === 'admin' ? <ManageTourists /> : <Navigate to="/notfound" /> },
        { path: 'managefeedback', element: userType === 'admin' ? <ManageFeedback /> : <Navigate to="/notfound" /> },
        { path: 'viewreservation', element: userType === 'admin' ? <ViewReservation /> : <Navigate to="/notfound" /> },
        { path: 'manageservices', element: userType === 'admin' ? <ManageServices /> : <Navigate to="/notfound" /> },
        { path: 'manageorders', element: userType === 'admin' ? <ManageOrders /> : <Navigate to="/notfound" /> },
        { path: 'manageproducts', element: userType === 'admin' ? <ManageProducts /> : <Navigate to="/notfound" /> },
        { path: 'manageevents', element: userType === 'admin' ? <ManageEvents /> : <Navigate to="/notfound" /> },
        { path: 'managepersonnel', element: userType === 'admin' ? <ManageTourPersonnel /> : <Navigate to="/notfound" /> }
      ]
    }
  ]);

  useEffect(() => {
    const userType = localStorage.getItem('user_type');
    const subscriptionId = localStorage.getItem('subscription_id');
    setUserType(userType);
    setSubscriptionId(subscriptionId);
  }, []);

  return (
    <>
      <RouterProvider router={routers} />
      <Toaster />
    </>
  );
}
