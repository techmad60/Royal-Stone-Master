import { IoPersonAddSharp } from "react-icons/io5";
import Icon from "../ui/Icon";

interface Referral {
  fullname: string;
  email: string;
  phone: string;
  status: string;
  id: string;
  createdAt: string;
}

interface ReferralListProps {
  referrals: Referral[];
}

export default function ReferredDesktopList({ referrals }: ReferralListProps) {
  return (
    <>
      <div className="grid grid-cols-6 bg-light-grey shadow-sm p-3 mr-8 rounded-[15px]">
        <p className="col-span-2 text-sm text-[#0F1C3980]">Full Name</p>
        <p className="col-span-2 text-sm text-[#0F1C3980]">Email Address</p>
        <p className="text-sm text-[#0F1C3980]">Date Joined</p>
        <p className="text-sm text-[#0F1C3980]">Status</p>
      </div>
      {referrals.map((referral, index) => (
        <section
          key={index}
          className="grid grid-cols-6 p-3 mr-8 border-b py-6"
        >
          <div className="flex items-center gap-4 col-span-2">
            <Icon
              icon={<IoPersonAddSharp className="text-color-one"/>}
              containerSize="w-[23.86px] h-[23.86px]"
            />
            <p className="text-color-zero text-sm">
              {referral.fullname.charAt(0).toUpperCase() +
                referral.fullname.slice(1)}
            </p>
          </div>
          <p className="col-span-2 text-color-zero text-sm">{referral.email}</p>
          <p className="text-color-zero text-sm">
            {new Date(referral.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="text-color-one text-sm">
            {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
          </p>
        </section>
      ))}
    </>
  );
}
