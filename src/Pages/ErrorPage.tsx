import { Button } from '@mantine/core';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-linkedin-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
        {/* Decorative 404 Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold opacity-5 z-0">
          404
        </div>

        {/* Left Content */}
        <div className="relative z-10 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-linkedin-blue">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to your professional journey.
          </p>
          
          <Button
            component="a"
            href="/"
            size="xl"
            radius="md"
            className="bg-linkedin-blue hover:bg-linkedin-blue-dark transition-colors"
          >
            Back to Homepage
          </Button>
        </div>

        {/* Illustration */}
        <div className="relative z-10">
          <img 
            src="https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-online-shopping-removal-from-cart-unload-cartoon-character_335657-2578.jpg?w=826&t=st=1708879224~exp=1708879824~hmac=3a3a7d4f9a5c0a0b4f4e4b4e4f4e4e4e4f4e4e4e4f4e4e4e4e4e4e4e4e4e4e4" 
            alt="Page not found"
            className="max-w-xs md:max-w-md h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;