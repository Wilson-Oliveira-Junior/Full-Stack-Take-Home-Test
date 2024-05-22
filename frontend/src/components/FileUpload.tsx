import React from "react";

interface FileUploadProps {
  onUpload: (file: File) => void;
}


const FileUpload = ({ onUpload }: FileUploadProps) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="FileUpload">
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default FileUpload;
