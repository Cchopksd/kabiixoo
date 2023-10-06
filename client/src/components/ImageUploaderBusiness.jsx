import React, {useState, useRef, useEffect} from "react"
import "./ImageUploader.css"

const ImageUploaderBusiness = ({ onDataSendBusiness }) => {

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        onDataSendBusiness(images)
    },[images])

    const selectFiles = () => {
        fileInputRef.current.click();
    }

    const onFileSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++){
            if (files[i].type.split('/')[0] !== "image") continue;
            if (!images.some((e)=> e.name == files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        file: event.target.files[0]
                    },
                ])
            }
        }
    }

    const deleteImage = (index) => {
        setImages((prevImages) => 
            prevImages.filter((_, i) => i != index)
        );
    }

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    }

    const onDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++){
            if (files[i].type.split('/')[0] !== "image") continue;
            if (!images.some((e)=> e.name == files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        file: event.target.files[0]
                    },
                ])
            }
        }
    }

    return (
        <div className="confirm-img-upl-card">
            <div className={images.length == 3 ? "confirm-drag-area-disable" : "confirm-drag-area"} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className="confirm-select">ปล่อยรูปตรงนี้</span>
                ) : (
                    <>
                        <div className="confirm-inside-drag-area">
                            <label className="confirm-drag-text">ลากและปล่อยตรงนี้ หรือ</label>
                            <span className="confirm-select" role="button" onClick={selectFiles}>
                                เลือกรูป
                            </span>
                            <div className="confirm-file-desc">
                                ไฟล์ที่รองรับ : .JPEG, .PNG
                            </div>
                        </div>
                    </>
                )}
                <input name="file" type="file" className="confirm-file" multiple ref={fileInputRef} onChange={onFileSelect}></input>
            </div>
            <div className="confirm-img-upl-container">
                {images.map((images,index) => (
                    <div className="confirm-upl-image" key={index}>
                        <span className="confirm-upl-delete" onClick={() => deleteImage(index)}>&times;</span>
                        <img src={images.url} alt={images.name} />
                        {console.log(images.url)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageUploaderBusiness;