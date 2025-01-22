"use client"
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import Link from "next/link";
import PortfolioNavigator from "@/components/Portolio/PortfolioNavigator";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import NoHistory from "@/components/ui/NoHistory";
export default function Notification () {
    const [showNotifications, setShowNotifications] = useState(false);
    return (
        <div>
            <PortfolioNavigator currentStep={1}/>
            <p className="font-semibold text-base my-4">Notifications</p>
            {showNotifications ? (
            <div className="">
                <NoHistory icon={<FaBell/>} text="You have no notifications"/>
                <div onClick={() => setShowNotifications(false)}>
                    <Button
                        ButtonText="With notifications"
                        className="mx-auto" 
                    />
                </div>
            </div>
            ) : (
            <div>
                <div>
                    <div className="lg:hidden">
                        <p className="text-sm text-color-form pb-3">Today</p>
                        <hr />
                    </div>
                 
                    <Link href="/main/portfolio/notifications/view-notification" className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
                        <div className="flex gap-2 lg:gap-4">
                            <Icon icon={<FaBell className="text-2xl text-color-one"/>} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px] bg-[rgba(241,255,240,1)]"/>
                            <div>
                                <p className="text-sm text-color-zero font-medium tracking-tight">Sodales et tortor diam sit elit gravida</p>
                                <p className=" text-sm text-color-form">Id netus malesuada luctus...</p>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">Today</p>
                            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">11:04 AM</p>
                            {/* Green Dot */}
                            <span className="absolute -top-4 right-0 transform translate-x-[50%] -translate-y-[50%] w-[8px] h-[8px] bg-green-700 rounded-full lg:-top-0"></span>
                        </div>
                    </Link>

                    <section className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
                        <div className="flex gap-2 lg:gap-4">
                            <Icon icon={<FaBell className="text-2xl text-color-one"/>} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"/>
                            <div>
                                <p className="text-sm text-color-zero font-medium tracking-tight">Sodales et tortor diam sit elit gravida</p>
                                <p className=" text-sm text-color-form">Id netus malesuada luctus...</p>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">12/9/2024</p>
                            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">11:04 AM</p>
                              {/* Green Dot */}
                              <span className="absolute -top-0 right-0 transform translate-x-[50%] -translate-y-[50%] w-[8px] h-[8px] bg-green-700 rounded-full hidden lg:-top-0 lg:flex"></span>
                        </div>
                    </section>
                    <section className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
                        <div className="flex gap-2 lg:gap-4">
                            <Icon icon={<FaBell className="text-2xl text-color-one"/>} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"/>
                            <div>
                                <p className="text-sm text-color-zero font-medium tracking-tight">Sodales et tortor diam sit elit gravida</p>
                                <p className=" text-sm text-color-form">Id netus malesuada luctus...</p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">12/9/2024</p>
                            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">11:04 AM</p>
                        </div>
                    </section>
                </div>

                <div>
                    <div className="lg:hidden">
                        <p className="text-sm text-color-form pb-3">Yesterday, 12/9/2024</p>
                        <hr />
                    </div>
                    <section className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
                        <div className="flex gap-2 lg:gap-4">
                            <Icon icon={<FaBell className="text-2xl text-color-one"/>} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"/>
                            <div>
                                <p className="text-sm text-color-zero font-medium tracking-tight">Sodales et tortor diam sit elit gravida</p>
                                <p className=" text-sm text-color-form">Id netus malesuada luctus...</p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">12/9/2024</p>
                            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">11:04 AM</p>
                        </div>
                    </section>
                </div>

                <div>
                    <div className="lg:hidden">
                        <p className="text-sm text-color-form pb-3">11/9/2024</p>
                        <hr />
                    </div>
                    <section className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
                        <div className="flex gap-2 lg:gap-4">
                            <Icon icon={<FaBell className="text-2xl text-color-one"/>} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"/>
                            <div>
                                <p className="text-sm text-color-zero font-medium tracking-tight">Sodales et tortor diam sit elit gravida</p>
                                <p className=" text-sm text-color-form">Id netus malesuada luctus...</p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">12/9/2024</p>
                            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">11:04 AM</p>
                        </div>
                    </section>
                    <section className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
                        <div className="flex gap-2 lg:gap-4">
                            <Icon icon={<FaBell className="text-2xl text-color-one"/>} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"/>
                            <div>
                                <p className="text-sm text-color-zero font-medium tracking-tight">Sodales et tortor diam sit elit gravida</p>
                                <p className=" text-sm text-color-form">Id netus malesuada luctus...</p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">12/9/2024</p>
                            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">11:04 AM</p>
                        </div>
                    </section>
                    <section className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
                        <div className="flex gap-2 lg:gap-4">
                            <Icon icon={<FaBell className="text-2xl text-color-one"/>} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"/>
                            <div>
                                <p className="text-sm text-color-zero font-medium tracking-tight">Sodales et tortor diam sit elit gravida</p>
                                <p className=" text-sm text-color-form">Id netus malesuada luctus...</p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">12/9/2024</p>
                            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">11:04 AM</p>
                        </div>
                    </section>
                    <div onClick={() => setShowNotifications(true)}>
                        <Button
                            ButtonText="Without notifications"
                            className="mx-auto"
                        />
                    </div>
                </div>
            </div>
            )} 
        </div>
    )
}