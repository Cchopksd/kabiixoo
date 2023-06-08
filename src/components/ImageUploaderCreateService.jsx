import React, {useState, useRef} from "react"
import "./ImageUploaderCreateService.css"

const ImageUploaderCreateService = () => {

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

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
                    },
                ])
            }
        }
    }

    return (
        <div className="img-upl-card">
            <div className={images.length == 4 ? "drag-area-disable" : "drag-area"} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className="select">ปล่อยรูปตรงนี้</span>
                ) : (
                    <>
                        <div className="inside-drag-area">
                            <label className="drag-text">ลากและปล่อยตรงนี้ หรือ</label>
                            <span className="select" role="button" onClick={selectFiles}>
                                เลือกรูป
                            </span>
                            <div className="file-desc">
                                ขนาดไฟล์ : สูงสุด 5 MB ไม่เกิน 3 ไฟล์ / ไฟล์ที่รองรับ : .JPEG, .PNG
                            </div>
                        </div>
                    </>
                )}
                <input name="file" type="file" className="file" multiple ref={fileInputRef} onChange={onFileSelect}></input>
            </div>
            <div className="img-upl-container">
                {images.map((images,index) => (
                    <div className="upl-image" key={index}>
                        <span className="upl-delete" onClick={() => deleteImage(index)}>&times;</span>
                        <img src={images.url} alt={images.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageUploaderCreateService;