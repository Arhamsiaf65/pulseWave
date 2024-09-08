import Image from "next/image";


export default function Home() {
  return (
    <>
      <div className="flex gap-4  flex-col justify-center items-center h-[44vh] text-white">
        <div
          className="text-5xl font-bold flex justify-center items-center">
          <div>Buy me a Chai</div>
          <span><img width={88} src="/cofee.gif" w alt="" /></span>
        </div>
        <p>
          A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
        </p>
        <div>
          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Start here!
          </button>
          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Read More
          </button>
        </div>
      </div>

      <div className="bg-white opacity-10 h-1">
      </div>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center my-10">Your fans can buy you a Chai</h1>
        <div className="flex justify-around gap-5">
          <div className="item flex flex-col justify-center items-center">
            <img className="rounded-full" src="/coin.gif" width={88} alt="" />
            <p className="font-bold text-lg space-x-2">Your fans want to help</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item flex flex-col justify-center items-center">
            <img className="rounded-full" src="/man.gif" width={88} alt="" />
            <p className="font-bold text-lg space-x-2">Your fans want to help</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item flex flex-col justify-center items-center">
            <img className="rounded-full" src="/coin.gif" width={88} alt="" />
            <p className="font-bold text-lg space-x-2">Your fans want to help</p>
            <p>Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white opacity-10 mt-16 h-1">
      </div>

      <div className="container mx-auto py-10  flex justify-center flex-col items-center">

      <h1 className="text-3xl font-thin text-center pb-10">Learn more about us</h1>

    
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-8p4TujQt_4?autoplay=1&mute=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>  

      </div>

    </>
  );
}
