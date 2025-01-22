import { IoPersonAddSharp } from "react-icons/io5";
import Icon from "../ui/Icon";

interface Referral {
  email: string;
  phone: string;
  status: string;
  id: string;
  fullname: string;
  createdAt: string;
}

interface ReferralListProps {
  referrals: Referral[];
}

export default function ReferralList({ referrals }: ReferralListProps) {
  return (
    <>
      {referrals.map((referral) => (
        <section
          key={referral.id}
          className="flex justify-between bg-light-grey shadow-sm shadow-[#00000026] p-4 rounded-common my-4"
        >
          <div className="flex gap-4">
            <Icon
              icon={<IoPersonAddSharp className="text-color-one"/>}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div className="space-y-1">
              <p className="text-sm font-medium text-color-zero">
                {referral.fullname}
              </p>
              <p className="text-xs text-[#6B7385B2]">{referral.email}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-[#6B7385B2]">
              Joined {new Date(referral.createdAt).toLocaleDateString("en-US")}
            </p>
            <p className="text-color-one text-xs text-end">
              {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
            </p>
          </div>
        </section>
      ))}
    </>
  );
}
