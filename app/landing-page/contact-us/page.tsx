//app/contact-us/page.tsx
import Footer from "@/components/Sections/Footer";
import Header from "@/components/Sections/Header";
import CardComponentThree from "@/components/ui/CardComponentThree";
import DownloadApp from "@/components/ui/DownloadApp";
import FormButton from "@/components/ui/FormButton";

export default function ContactUs() {
    return (
        <div className={`flex flex-col`}>
            <Header/>
            <main className="flex flex-col justify-center items-center">
                <section className="text-center mt-16 lg:mt-28">
                    <h1 className={`text-color-zero font-extrabold text-[28px] lg:text-[39px]`}>Contact Us</h1>
                    <p className="text-sm text-colour-five text-center">Need our help? Feel free to reach out to us</p>
                </section>

                {/*Contact Us Section */}
                <section className="flex flex-col justify-center items-center py-8 bg-white w-full my-12 md:px-16">
                    <div className="flex flex-col justify-center items-center gap-6 lg:flex-row mx-4 w-full">
                        {/* Chat on Whatsapp */}
                        <CardComponentThree icon="/images/whatsapp-icon.svg" text="Whatsapp" contact="09010201223" href="tel:+2349010201223"/>
                        
                        {/* Call on Phone */}
                        <CardComponentThree icon="/images/phone-icon.svg" text="Phone" contact="09010201223" href="tel:+2349010201223"/>
                        
                        {/* Send a Mail */}
                        <CardComponentThree icon="/images/mail-icon.svg" text="Mail" contact="INFO@ROYALSTONECAPITAL.COM" href="mailto:INFO@ROYALSTONECAPITAL.COM"/>
                    </div>

                    {/* Contact Us Form*/}
                    <section className="px-4 w-full my-4 flex flex-col lg:max-w-4xl xl:max-w-[74rem]">
                        <h2 className={`text-color-zero font-semibold text-lg mt-8 border-t border-slate-200 pt-8 lg:text-[22px]`}>Want to fill a form instead?</h2>
                        <form  className={`flex flex-col justify-between mt-4 gap-8 mb-6 md:flex-row`}>
                            <div className="flex flex-col gap-8 w-full">
                                {/* Name */}
                                <div className="flex flex-col gap-2 w-full border-b border-slate-200">
                                    <label className="text-color-form text-sm">Full Name</label>
                                    <input 
                                    type="name" 
                                    name="name" 
                                    required 
                                    className="rounded-sm  h-[40px] placeholder:text-black"
                                    placeholder=""/>
                                </div>
                                
                                {/* Phone Number */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-color-form text-sm">Phone Number</label>
                                    <input 
                                    type="tel" 
                                    required 
                                    className="rounded-sm border-b border-slate-200 h-[40px] placeholder:text-black"
                                    placeholder=""/>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-8 w-full">
                                {/* Email */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-color-form text-sm">Email</label>
                                    <input 
                                    type="email" 
                                    name="email" 
                                    required 
                                    className="rounded-sm border-b border-slate-200 h-[40px] placeholder:text-black"
                                    placeholder=""/>
                                </div>

                                {/* Message */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-color-form text-sm">Message</label>
                                    <textarea 
                                    name="message" 
                                    rows={2} 
                                    required 
                                    className="rounded-sm border-b border-slate-200 w-full placeholder:text-xs"
                                    placeholder=""
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                        <FormButton ButtonText="Send Message" className="py-4"/>
                    </section>
                </section>
            </main>
            <DownloadApp />
            <Footer/>
        </div>
    )
}