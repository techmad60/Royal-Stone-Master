interface CustomAlertProps {
  message?: string;
  style?: string;
}
export default function CustomAlert({ message, style }: CustomAlertProps) {
  return (
    <div className="fixed inset-0 flex bg-transparent z-50 justify-center mt-12">
      <div className={`flex items-center ${style}`}>{message}</div>
    </div>
  );
}
