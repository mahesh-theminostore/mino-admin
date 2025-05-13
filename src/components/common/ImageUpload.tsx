import { PlusIcon } from '@/icons';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  url?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  isImageUploading?: boolean;
  handleFileChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  url = '',
  width = '150',
  height = '150',
  isImageUploading = false,
  handleFileChange,
}) => {
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
    <div className='relative cursor-pointer border-2' onClick={handleClick}>
      <div
        className={`absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-amber-50 opacity-70 ${isImageUploading ? 'block' : 'hidden'}`}
      >
        <div className='font-semibold'>Uploading...</div>
      </div>
      <input type='file' hidden ref={inputRef} onChange={handleChange} multiple={false} accept='.jpg,.png,.svg,.jpeg' />

      {imageUrl ? (
        <Image src={imageUrl} alt='image' height={height} width={width} />
      ) : (
        <div className='flex h-[150px] w-[150px] flex-col items-center justify-center border-1 border-b-slate-500'>
          <PlusIcon />
          <div>Upload Image</div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
