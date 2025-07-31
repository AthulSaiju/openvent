
import { SignIn } from '@clerk/nextjs'



export default function Page() {
  return(

<section className=' w-full min-h-screen flex items-center justify-center bg-white '>
   <section className='w-full  flex items-center justify-center'>
    <div className="fixed inset-0 pointer-events-none z-0">
        {/* vertical lines */}
        <div
          className="absolute w-px h-full bg-black opacity-20"
          style={{ left: "15%" }}
        />
        <div
          className="absolute w-px h-full bg-black opacity-20"
          style={{ left: "50%" }}
        />
        <div
          className="absolute w-px h-full bg-black opacity-20"
          style={{ left: "82%" }}
        />

        {/* horizontal lines */}
        <div
          className="absolute h-px w-full bg-black opacity-20"
          style={{ top: "30%" }}
        />
        <div
          className="absolute h-px w-full bg-black opacity-20"
          style={{ top: "65%" }}
        />
      </div>
    <SignIn />
    
    </section>

    </section>

  )

   
}