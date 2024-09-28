import { useNavigate, Link } from "react-router-dom";
import PermitApplicationProgress from "./PermitApplicationProgress";
import ApplicantDetailsForm from "./ApplicantDetailsForm";
import RequestDetailsForm from "./RequestDetailsForm";
import AttachmentsForm from "./AttacmentsForm";
function NewPermit() {
    return (
        <div className="h-full w-full p-4 lg:px-80 flex flex-col items-start justify-start">
            <div className="mb-5 flex items-start">
                <Link to="/" className="text-blue-500">Home</Link> / <span className="font-bold">New Permit</span>
            </div>
            <PermitApplicationProgress />

            <ApplicantDetailsForm />
            <RequestDetailsForm />
            <AttachmentsForm />
            <div className="flex justify-end mt-5">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Next</button>
                </div>
        </div>
    )
}

export default NewPermit;