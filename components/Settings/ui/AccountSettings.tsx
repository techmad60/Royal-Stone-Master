import { ReactNode } from "react";
import Icon from "../../ui/Icon";

interface SettingsProps {
  settingIcon: ReactNode;
  navigate?: ReactNode;
  setting: string;
  settingText?: string;
  containerStyle?: string;
  iconSize?: string;
  settingsTextStyle?: string;
  flexStyle?: string;
  onClick?: () => void;
}

export default function AccountSettings({
  settingIcon,
  setting,
  settingText,
  navigate,
  containerStyle,
  iconSize,
  settingsTextStyle,
  flexStyle,
  onClick
}: SettingsProps) {
  return (
    <section
      className={`${containerStyle} flex justify-between p-4 shadow-sm rounded-common`}
      onClick={onClick}
    >
      <div className={`flex gap-2 lg:gap-3 lg:flex-col ${flexStyle}`}>
        <Icon
          icon={settingIcon}
          containerSize={`${
            iconSize || "w-[39.6px] h-[39.6px] rounded-[14.85px]"
          }`}
        />
        <div>
          <p className="text-sm text-color-zero font-medium tracking-tight">
            {setting}
          </p>
          <p className={`${settingsTextStyle || "text-xs text-color-form"}`}>
            {settingText}
          </p>
        </div>
      </div>

      <div>{navigate}</div>
    </section>
  );
}
