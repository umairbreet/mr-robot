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
export declare const addContentCard: (card: ContentCard) => Promise<any>;
export declare const getAllContentCards: () => Promise<ContentCard[]>;
