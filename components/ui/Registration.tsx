// import Image from "next/image";
// import Link from "next/link";
// import CardComponentFour from "./CardComponentFour";
// export default function RegistrationComponent() {
//     return (
//         <div className="lg:grid grid-cols-2 gap-8">
//         <section className="bg-color-two hidden px-8 lg:flex flex-col space-y-8">
//             <div className="w-full border-b border-b-slate-200 py-4">
//                 <Image 
//                     className="hidden lg:flex"
//                     src={"/images/logo.svg"}
//                     alt="Royal-Stone Logo"
//                     width={117.43}
//                     height={22}
//                 />
//             </div>
            
//             <p className="font-extrabold text-[29px] text-color-one">1,000+ users are making smart investment choices. Why not be one of them? 🤔</p>
//             <Image 
//                 src={"/images/hero-img.svg"}
//                 alt="Hero Image"
//                 className=""
//                 width={516}
//                 height={771.98}
//             />
//         </section>
//         <section className="flex flex-col p-4 space-y-6 lg:px-8">
//             <Link href="/" className="flex">
//                 <Image 
//                     className="logo lg:hidden"
//                     src={"/images/logo.svg"}
//                     alt="Royal-Stone Logo"
//                     width={106.75}
//                     height={20}
//                 />
//             </Link>
//             <section className="flex flex-col space-y-4">
//                 <h1 className="font-semibold text-base text-color-zero border-y py-4 lg:border-y-0 lg:border-b lg:text-[22px]">Create a Royal Stone Account</h1>
//                 <div className="grid grid-cols-2 gap-2">
//                     {/* Signup/Signin with Email */}
//                     <CardComponentFour icon="/images/mail-icon.svg"  className="lg:h-[83px]"/>

//                     {/* Signup/Signin with Google */}
//                     <CardComponentFour icon="/images/google-icon.svg" className="lg:h-[83px]"/>

//                     {/* Signup/Signin with Apple (full width across both columns) */}
//                     <CardComponentFour icon="/images/apple-icon.svg" className="col-span-2 justify-between h-[83px]" />
//                 </div>
//             </section>
//             <p className="text-slate-400 lg:border-t lg:pt-4">
//                 Already have an account? <span className="font-semibold text-color-one duration-300 hover:text-green-700">
//                     <Link href="/login">Sign in</Link>
//                 </span>
//             </p>
//         </section> 
//     </div>
//     )
// }