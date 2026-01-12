import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
const API_URL = `${API_BASE}/api`;

export interface ContentCard {
    id?: number;
    title: string;
    description?: string;
    image_url?: string;
    hackLevel?: number;
    status?: 'active' | 'breached' | 'secure' | 'critical';
    dataSize?: string;
    created_at?: string;
}

export const fetchContentCards = async (): Promise<ContentCard[]> => {
    const response = await axios.get(`${API_URL}/cards`);
    return response.data;
};

export const createContentCard = async (card: ContentCard): Promise<ContentCard> => {
    try {
        console.log('Creating card via API:', card);
        const response = await axios.post(`${API_URL}/cards`, card);
        console.log('Card created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating card via API:', error);
        
        // Log detailed error
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers
            });
        }
        
        throw error;
    }
};