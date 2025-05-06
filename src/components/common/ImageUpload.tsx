import { PlusIcon } from '@/icons';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  url?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  handleFileChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ url = '', width = '150', height = '150', handleFileChange }) => {
  const [imageUrl, setImageUrl] = useState(url);

  const inputRef = useRef<null | HTMLInputElement>(null);

  function handleClick() {
    inputRef?.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0];

    if (!file) return;

    setImageUrl(URL.createObjectURL(file));

    handleFileChange(file);
  }

  return (
    <div className='cursor-pointer border-2' onClick={handleClick}>
      <input type='file' hidden ref={inputRef} onChange={handleChange} multiple={false} />

      {imageUrl ? (
        <Image src={imageUrl} alt='image' height={height} width={width} />
      ) : (
        <Image src={PlusIcon} alt='upload-image' height={height} width={width} />
      )}
    </div>
  );
};

export default ImageUpload;
