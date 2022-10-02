import Error404 from './error-404.svg';

export const ErrorFallback = ({ error }) => {
  return (
    <div className=" bg-white flex justify-center grow">
      <div className="p-12 flex flex-col justify-center">
        <h1 className="text-center text-3xl font-bold text-primary">
          Something went wrong!
        </h1>
        <p className="m-4 text-primary text-center">
          Please refresh the page or check your network if the problem persists.
        </p>
        <p>{error.message}</p>
        <img className="m-4 h-72" src={Error404} alt="error" />
      </div>
    </div>
  );
};
