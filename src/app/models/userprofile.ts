export interface UserProfile {
    id: string;
    displayName: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    lastLogin?: string;
}

export interface UserState {
    ids: string[];
    entities: Record<string, UserProfile>;
    loading: boolean;
    error: string | null;
}