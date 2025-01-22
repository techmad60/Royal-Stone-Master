import { MdArrowForwardIos } from "react-icons/md";

interface NavigatorTwoProps {
  links: { label: string; onClick: () => void }[];
  style?: string;
}

export default function NavigatorTwo({ links, style }: NavigatorTwoProps) {
  return (
    <div className={`flex items-center space-x-2 mt-4 overflow-x-scroll hide-scrollbar ${style}`}>
      {links.map((link, index) => (
        <div key={index} className="flex items-center space-x-2">
          <p
            className="text-xs border-b duration-300 whitespace-nowrap text-green-700 border-green-700 cursor-pointer hover:text-color-one hover:border-color-one"
            onClick={link.onClick}
          >
            {link.label}
          </p>
          {index < links.length - 1 && (
            <MdArrowForwardIos className="text-slate-500 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}
