import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projects, images } from '../services/api';
import Layout from '../components/Layout';
import ImageList from '../components/ImageList';
import { Project, Image } from '../types';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [imagesList, setImagesList] = useState<Image[]>([]);
    const [error, setError] = useState('');

    const fetchProject = async () => {
        try {
            const response = await projects.get(Number(id));
            setProject(response.data);
        } catch {
            setError('Failed to fetch project details');
        }
    };

    const fetchImages = async () => {
        try {
            const response = await images.list(Number(id));
            setImagesList(response.data);
        } catch {
            setError('Failed to fetch images');
        }
    };

    useEffect(() => {
        if (id) {
            fetchProject();
            fetchImages();
        }
    }, [id]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && id) {
            try {
                await images.upload(Number(id), file);
                fetchImages();
            } catch {
                setError('Failed to upload image');
            }
        }
    };

    const handleDeleteImage = async (imageId: number) => {
        try {
            await images.delete(imageId);
            fetchImages();
        } catch {
            setError('Failed to delete image');
        }
    };

    if (!project) {
        return <Layout>Loading...</Layout>;
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{project.name}</h1>
                    <label className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                        Upload Image
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                <p className="text-gray-600">{project.description}</p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
                )}

                <ImageList images={imagesList} onDelete={handleDeleteImage} />
            </div>
        </Layout>
    );
};

export default ProjectDetail;