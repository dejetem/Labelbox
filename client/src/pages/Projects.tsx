import React, { useState, useEffect } from 'react';
import { projects } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import Layout from '../components/Layout';
import { Project } from '../types';

const Projects: React.FC = () => {
    const [projectsList, setProjectsList] = useState<Project[]>([]);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchProjects = async () => {
        try {
            const response = await projects.list();
            setProjectsList(response.data);
        } catch {
            setError('Failed to fetch projects');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await projects.create(newProject);
            setNewProject({ name: '', description: '' });
            setShowForm(false);
            fetchProjects();
        } catch {
            setError('Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (id: number) => {
        try {
            setIsLoading(true);
            await projects.delete(id);
            fetchProjects();
        } catch {
            setError('Failed to delete project');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {showForm ? 'Cancel' : 'New Project'}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
                )}

                {showForm && (
                    <form onSubmit={handleCreateProject} className="space-y-4 bg-white p-6 rounded-lg shadow">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Project Name</label>
                            <input
                                type="text"
                                value={newProject.name}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                rows={3}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'please wait' : 'Create Project' }
                        </button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsList.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onDelete={handleDeleteProject}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Projects;