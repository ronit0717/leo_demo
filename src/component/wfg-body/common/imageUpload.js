import React, { useState } from "react";

const ImgUpload = ({ src = null, disabled }) => {
    const [imageSrc, setImageSrc] = useState(src)
    const [path, setPath] = useState(null)
    const [file, setFile] = useState(null)
    // const [signature, setSignature] = useState(null)
  
    if (imageSrc)
      return <a href={imageSrc} target="_blank" className="form-control form-control-sm" style={disabled ? {} : { pointerEvents: "none", cursor: "default" }}>Open Image</a>
    else {
      const initiateUpload = async (e) => {
        setFile(e.target.files[0])
        if (path)
          return
  
        // TODO: Create Image get id and store in path state
        let image_id = Math.random().toString(36).substr(2, 9)
        setPath(image_id)
      }
  
      const performUpload = async () => {
        await fetch(`https://tradub-serverless.vercel.app/api/upload-signature?file=${path}`, { method: "POST" })
          .then(response => response.json())
          .then(signature => {
            const { url, fields } = signature;
            const formData = new FormData();
            formData.append("Content-Type", file.type)
            Object.entries({ ...fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            fetch(url, {
              method: 'POST',
              body: formData,
            }).then(upload => {
              if (upload.ok) {
                alert('Uploaded successfully!');
                setImageSrc("https://tradub.s3.amazonaws.com/public/" + path)
              } else {
                alert('Upload failed.');
              }
            })
          }
          )
      }
  
      return <div className="input-group my-1">
        <div className="custom-file">
          <input onChange={initiateUpload} type="file" accept="image/*" className="custom-file-input form-control-sm" />
          <label className="custom-file-label">{file ? file.name : "Choose Image"}</label>
        </div>
        <div className="input-group-append" style={{ cursor: "pointer" }}>
          <span onClick={performUpload} className="input-group-text py-0">Upload</span>
        </div>
      </div>
    }
  }
  
export default ImgUpload
