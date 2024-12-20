import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../types';

interface Props {
  images: Image[];
  onDelete: (id: number) => void;
}

const ImageList: React.FC<Props> = ({ images, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={image.url}
            alt={`Image ${image.id}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <Link
                to={`/annotate/${image.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Annotate
              </Link>
              <button
                onClick={() => onDelete(image.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageList;