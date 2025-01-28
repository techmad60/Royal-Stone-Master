import Icon from "@/components/ui/Icon";
import { FaBell } from "react-icons/fa6";
export default function NotificationsMobile() {
  return (
    <div>
      <div>
        <div className="lg:hidden">
          <p className="text-sm text-color-form pb-3">11/9/2024</p>
          <hr />
        </div>
        <section className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
          <div className="flex gap-2 lg:gap-4">
            <Icon
              icon={<FaBell className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                Sodales et tortor diam sit elit gravida
              </p>
              <p className=" text-sm text-color-form">
                Id netus malesuada luctus...
              </p>
            </div>
          </div>

          <div>
            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">
              12/9/2024
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              11:04 AM
            </p>
          </div>
        </section>
        <section className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
          <div className="flex gap-2 lg:gap-4">
            <Icon
              icon={<FaBell className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                Sodales et tortor diam sit elit gravida
              </p>
              <p className=" text-sm text-color-form">
                Id netus malesuada luctus...
              </p>
            </div>
          </div>

          <div>
            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">
              12/9/2024
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              11:04 AM
            </p>
          </div>
        </section>
        <section className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6">
          <div className="flex gap-2 lg:gap-4">
            <Icon
              icon={<FaBell className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                Sodales et tortor diam sit elit gravida
              </p>
              <p className=" text-sm text-color-form">
                Id netus malesuada luctus...
              </p>
            </div>
          </div>

          <div>
            <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">
              12/9/2024
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              11:04 AM
            </p>
          </div>
        </section>
        
      </div>
    </div>
  );
}
