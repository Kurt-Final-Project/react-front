import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Entrypoint from "./pages/Entrypoint";
import Feed from "./pages/Feed";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";

import isAuthenticatedLoader, { isAuthenticated } from "./utils/auth";
import ProfilePicture from "./components/ProfilePicture";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{
				index: true,
				element: <Entrypoint />,
			},
			{
				path: "login",
				loader: isAuthenticated,
				element: <Login />,
			},
			{
				path: "signup",
				loader: isAuthenticated,
				element: <Signup />,
			},
			{
				path: "profile/:id",
				element: <Header />,
				loader: isAuthenticatedLoader,
				children: [
					{
						index: true,
						element: <Profile />,
					},
				],
			},
			{
				path: "/edit-profile",
				element: <Header />,
				loader: isAuthenticatedLoader,
				children: [
					{
						index: true,
						element: <EditProfile />,
					},
				],
			},
			{
				path: "/sample",
				element: <ProfilePicture />,
			},
			{
				path: "feed",
				element: <Header />,
				loader: isAuthenticatedLoader,
				children: [
					{
						index: true,
						element: <Feed />,
					},

					{
						path: ":id",
						element: <SinglePost />,
					},
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
