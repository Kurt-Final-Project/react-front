const DataLoaderComponent = ({ mainDependency, isLoading, loader, children }) => {
	const isArray = Array.isArray(mainDependency);

	if (isLoading && isArray && !mainDependency.length) {
		return loader;
	} else if (!mainDependency && isLoading) {
		return loader;
	} else if (!mainDependency) {
		return <p>Resource not found</p>;
	}

	return children(mainDependency);
};

export default DataLoaderComponent;
