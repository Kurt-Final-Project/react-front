import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Entrypoint from "./pages/Entrypoint";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Login, { action as loginAction } from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";

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
				element: <Login />,
				action: loginAction,
			},
			{
				path: "signup",
				element: <Signup />,
			},
			{
				path: "profile/:id",
				element: <Header />,
				children: [
					{
						index: true,
						element: <Profile />,
					},
				],
			},
			{
				path: "feed",
				element: <Header />,
				children: [
					{
						index: true,
						element: <Feed />,
					},

					{
						path: ":id",
						element: <Post />,
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
