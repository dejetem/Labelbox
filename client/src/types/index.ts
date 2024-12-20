export interface User {
    id: number;
    email: string;
    username: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    created_by: number;
    created_at: string;
    updated_at: string;
}

export interface Image {
    id: number;
    project: number;
    cloudinary_id: string;
    url: string;
    uploaded_at: string;
}

export interface Annotation {
    id: number;
    image: number;
    data: string;
    created_by: number;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
}