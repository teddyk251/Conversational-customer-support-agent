import { IoIosChatbubbles } from "react-icons/io";
import SupportBot from "./SupportBot";

interface SupportWrapperProps {
    is_open: boolean;
    toggle: () => void;
}

const SupportWrapper: React.FC<SupportWrapperProps> = ({ is_open, toggle }) => {
    return (
        <div className={`fixed bottom-4 right-4`}>
            {
                is_open ? (
                    <SupportBot
                        toggle={toggle}
                    />
                ) : <IoIosChatbubbles
                    className='text-black text-5xl  bg-slate-100 p-4 rounded-full shadow-xl w-20 h-20 z-50 cursor-pointer'
                    onClick={() => { toggle(); }}
                />
            }
        </div>
    );
}

export default SupportWrapper