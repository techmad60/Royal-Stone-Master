import Processed from "../../ui/Processed"

interface Props {
    textMessage?: string;
    onClose: () => void;
}
export default function BankAdded({onClose, textMessage}:Props) {
    return (
        <div>
            <Processed message={textMessage|| "Default message"} onClose={onClose}/>
        </div>
    )
}