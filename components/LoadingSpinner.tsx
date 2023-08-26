const LoadingSpinner = () => (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full m-2
        border-4 border-solid border-r-gray-800 border-gray-100 
        align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
      >
    </div>
);

export default LoadingSpinner;
