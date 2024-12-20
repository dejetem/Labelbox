/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { images, annotations } from '../services/api';
import Layout from '../components/Layout';
import AnnotationCanvas from '../components/AnnotationCanvas';
import { Image, Annotation } from '../types';

const AnnotationView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<Image | null>(null);
  const [imageAnnotations, setImageAnnotations] = useState<Annotation[]>([]);
  const [error, setError] = useState('');

  const fetchImage = async () => {
    try {
      const response = await images.list(Number(id));
      setImage(response.data[0]);
    } catch (err) {
      setError('Failed to fetch image');
    }
  };

  const fetchAnnotations = async () => {
    if (!id) return;
    try {
      const response = await annotations.list(Number(id));
      setImageAnnotations(response.data);
    } catch (err) {
      setError('Failed to fetch annotations');
    }
  };

  useEffect(() => {
    fetchImage();
    fetchAnnotations();
  }, [id]);

  const handleSaveAnnotations = async (annotationData: any) => {
    if (!image) return;
    try {
      await annotations.create({
        image: image.id,
        data: annotationData
      });
      fetchAnnotations();
    } catch (err) {
      setError('Failed to save annotation');
    }
  };

  if (!image) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Image Annotation</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <AnnotationCanvas
            imageUrl={image.url}
            annotations={imageAnnotations.map(a => a.data)}
            onSave={handleSaveAnnotations}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AnnotationView;
