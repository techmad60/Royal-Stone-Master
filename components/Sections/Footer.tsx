// Footer Component
import Image from 'next/image';
import { FaXTwitter, FaLinkedin} from "react-icons/fa6";
import { FaFacebook} from "react-icons/fa";
import Link from 'next/link';

export default function Footer ({margin = ""}){
    return (
        <footer className={` text-color-zero pt-8 px-4 flex flex-col lg:px-16 lg:justify-center lg:items-start mx-auto ${margin}`}>
            <nav className="justify-start items-start space-y-12 border-b py-8 sm:grid grid-cols-2 sm:space-y-0 sm:gap-8 lg:border-none lg:flex lg:flex-row lg:space-y-0  lg:gap-36 xl:gap-72" aria-label="footer-nav">
                
                {/* Logo Section */}
                <section className="flex flex-col space-y-4 justify-start items-start flex-shrink-0">
                    <Link href="/">
                        <Image src={"/images/logo.svg"} alt="Royal-Stone Logo" width={129} height={24.17}/> 
                    </Link>
                    
                    <p className='text-sm text-colour-five leading-[25px] sm:w-[300px] lg:w-[330px]'>Elevate your experience with the ultimate solution.</p>
                </section>
                
                <div className='flex w-full justify-between lg:gap-20 xl:gap-28'>
                {/* Company Section */}
                    <section className="flex flex-col space-y-4 justify-start items-start">
                        <p className={`text-center text-sm font-semibold`}>COMPANY</p>
                        <ul className="flex flex-col gap-2">
                            <Link href="/" className="hover:text-green-500 duration-300 text-colour-five text-sm">Home</Link>
                            <Link href="/landing-page/about" className="hover:text-green-500 duration-300 text-colour-five text-sm">About</Link>
                            <Link href="/landing-page/contact-us" className="hover:text-green-500 duration-300 text-colour-five text-sm">Contact us</Link>
                            <Link href="/landing-page/faqs" className="hover:text-green-500 duration-300 text-colour-five text-sm">FAQs</Link>
                        </ul>
                    </section>
                    <div className='flex flex-col lg:flex-row-reverse lg:gap-20 xl:gap-40'> 
                        {/* Policies Section */}
                        <section className="flex flex-col space-y-4 justify-start items-start">
                            <p className={`text-center text-sm font-semibold`}>POLICIES</p>
                            <ul className="flex flex-col gap-2 ">
                                <Link href="/landing-page/terms-of-service" className='hover:text-green-500 duration-300 text-colour-five text-sm'>Terms of Services</Link>
                                <Link href="/landing-page/privacy-policy" className='hover:text-green-500 duration-300 text-colour-five text-sm'>Privacy Policy</Link>
                            </ul>
                        </section>

                        {/* Socials */}
                        <section className="flex flex-col space-y-4 justify-start items-start mt-8 lg:mt-0">
                            <p className={`text-center text-sm font-semibold `}>SOCIALS</p>
                            <ul className="flex flex-row space-x-2 lg:space-x-0 lg:grid grid-cols-2 lg:gap-3">
                                <li><a href="" className='hover:text-green-500 duration-300 text-blue-600'><FaFacebook/></a></li>
                                <li><a href="" className='hover:text-green-500 duration-300'> <Image src={"/images/instagram.svg"} alt="Instagram Logo" width={16} height={16}/></a></li>
                                <li><a href="" className='hover:text-green-500 duration-300 text-blue-600'><FaXTwitter className='text-black'/></a></li>
                                <li><a href="" className='hover:text-green-500 duration-300 text-blue-600'><FaLinkedin className='text-blue-700'/></a></li>
                            </ul>
                        </section>
                    </div>                   
                </div>
            </nav>
             
            {/* Copyright Section */}
            <div className='flex flex-col text-sm text-colour-five my-6 lg:relative bottom-16'>
                <p>© Copyright Royal Stone 2024</p>
            </div> 
        </footer>
    )
}