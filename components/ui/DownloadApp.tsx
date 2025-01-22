
import AppStoreButton from "./AppStoreButton";
import GooglePlayButton from "./GooglePlayButton";

export default function DownloadApp() {
    return (
        <section className="flex flex-col justify-center items-center px-4 lg:px-0">
            <div className="flex flex-col justify-center w-full h-[191px] items-center bg-color-one text-center rounded-[20px] mx-4 bg-lim lg:h-[275px] md:max-w-[46rem] lg:max-w-4xl xl:max-w-[76rem]">
                <h2 className={`text-white text-[1.4rem] w-[19.5rem] font-extrabold lg:text-[39px] lg:w-[523px]`}>Start putting your money in the right places</h2>
                <div className="flex justify-center items-center gap-2 mt-8">
                    <AppStoreButton textColor="text-color-one" backgroundColor="bg-white" width="w-152.19px" height="h-56.63px" />
                    <GooglePlayButton textColor="text-color-one" backgroundColor="bg-white" width="w-152.19px" height="h-56.63px" />
                </div>
            </div>
        </section>  
    )
}