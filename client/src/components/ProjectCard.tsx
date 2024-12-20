import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface Props {
  project: Project;
  onDelete: (id: number) => void;
}

const ProjectCard: React.FC<Props> = ({ project, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="text-sm text-gray-500 mb-4">
          Created: {new Date(project.created_at).toLocaleDateString()}
        </div>
        <div className="flex justify-between">
          <Link
            to={`/projects/${project.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            View Details
          </Link>
          <button
            onClick={() => onDelete(project.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;