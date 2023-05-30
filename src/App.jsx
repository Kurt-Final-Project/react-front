import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Entrypoint from "./pages/Entrypoint";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{
				index: true,
				element: <Entrypoint />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "signup",
				element: <Signup />,
			},
			{
				path: "feed",
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
