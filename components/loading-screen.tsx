const LoadingScreen = () => {
	return (
		<div className="h-full w-full flex flex-col gap-4 justify-center items-center">
			<div className="flex gap-2">
				<span className="animate-loading relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
				<span
					style={{ animationDelay: '0.2s' }}
					className="animate-loading relative inline-flex rounded-full h-3 w-3 bg-blue-500"
				></span>
				<span
					style={{ animationDelay: '0.4s' }}
					className="animate-loading relative inline-flex rounded-full h-3 w-3 bg-blue-500"
				></span>
			</div>
		</div>
	);
};

export default LoadingScreen;
