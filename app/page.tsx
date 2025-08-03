import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold">OpenVent</h1>
      <p className="text-3xl mt-6">FInd your Next Event</p>
      <p className="text-sm mt-1 opacity-65">in association with Psypher AI </p>

      <Link href="/events">
        <button className="group flex items-center rounded-full cursor-pointer mt-8 gap-1 px-1">
          <div className="lg:py-7 lg:px-16 py-6 px-12 rounded-full lg:text-2xl text-lg border-2 border-[#7f7f7f] text-black transition-colors duration-300 ease-in-out">
            <p>Get Started</p>
          </div>

          <div
            className="
      bg-blue-300 lg:p-4.5 p-3 rounded-full 
      flex items-center justify-center

      transform transition-all duration-300 ease-in-out
      group-hover:rotate-45
            group-hover:translate-x-1

      
    "
          >
            <Image src="/arrowd2.svg" alt="arrow" width={52.5} height={53.5} />
          </div>
        </button>
      </Link>
    </section>
  );
}
