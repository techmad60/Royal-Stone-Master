export default function FormButton({ ButtonText = "", className = "" }) {
  return (
    <button
      type="submit"
      className={`flex font-medium bg-color-one w-full justify-center self-start text-sm duration-300 text-center hover:bg-green-700 shadow-md px-3 rounded-md text-white lg:w-[535px] ${className}`}
    >
      {ButtonText}
    </button>
  );
}
