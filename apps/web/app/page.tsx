import Input from "./component/Input";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
  
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/wall.mp4" type="video/mp4" />
      </video>

  
      <div className="absolute inset-0 bg-black/50"></div>

      
      <div className="relative z-10 flex justify-center pt-20">
        <h1 className="tracking-wide font-bold text-6xl">
          <span className="text-white">modern</span>{" "}
          <span className="text-orange-500">finance</span>
        </h1>
      </div>
    <div className="relative z-10 flex justify-center pt-10">
     <p className="flex flex-col items-center tracking-wide font-thin text-xl text-gray-400 text-center">
       <span>Your brokerage, your exchange, your money. Trade,</span>
       <span>borrow, spend, and earn in the most powerful margin</span>
       <span>account in finance.</span>
      </p>
    </div>

    <Input />

    </div>
  );
}