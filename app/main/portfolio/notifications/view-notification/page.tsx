import PortfolioNavigator from "@/components/Portolio/PortfolioNavigator"

export default function ViewNotification() {
    return (
        <div>
            <PortfolioNavigator currentStep={2}/>

            <div className="my-3 flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:items-center lg:gap-32 lg:mt-8">
                <h1 className="text-base text-color-zero font-semibold lg:text-[18px]">Sodales et tortor diam sit elit gravida</h1>
                <p className="text-sm text-color-form">Today, 11:04 AM</p>
            </div>

            <hr />

            <section className="lg:w-[589px]">
                <p className="text-sm text-color-form leading-[30px] mt-4 lg:text-base">Risus dolor convallis a etiam. Lectus aliquam lorem in in scelerisque pharetra. Vulputate praesent egestas vitae ipsum etiam id ultrices. Scelerisque eu orci quisque gravida turpis massa adipiscing duis. </p>

                <p className="text-sm text-color-form leading-[30px] mt-6 lg:text-base">Tincidunt eget egestas ornare id sollicitudin. Accumsan maecenas pulvinar senectus nullam. Nibh porta sollicitudin sit ut enim in volutpat. Dictum amet lectus amet velit sodales. Hac lorem quis rutrum accumsan tellus ut. </p>
            </section>
        </div>
    )
}