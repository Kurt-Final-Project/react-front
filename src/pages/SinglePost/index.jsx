import React, { useMemo, memo } from "react";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import samplePosts from "../../store/sample.posts";
import { useParams } from "react-router-dom";

const SinglePost = () => {
	const { id } = useParams();

	const postDetails = useMemo(() => {
		return samplePosts.find((data) => data.id.toString() === id);
	}, [id]);

	console.log("haha rerenders");
	return (
		<>
			<Post isSinglePost={true} postDetails={postDetails} />
			<Comment />
			<Comment />
			<Comment />
			<Comment />
			<Comment />
		</>
	);
};

export default memo(SinglePost);
