import { ClipLoader } from "react-spinners";
import './Loading.css';

const Loading = () => {
    return (
        <div className="overlay">
            <ClipLoader size={100} color={"#5BBC5F"} loading={true} />
        </div> 
    )
}

export default Loading;