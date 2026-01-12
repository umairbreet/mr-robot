import React, { useState } from 'react';
import { type ContentCard as APIContentCard } from '../../../../services/api';

interface CreateCardFormProps {
    onSubmit: (cardData: APIContentCard) => Promise<{ success: boolean; data?: APIContentCard; error?: string }>;
    onCancel: () => void;
}

const CreateCardForm: React.FC<CreateCardFormProps> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<APIContentCard>({
        title: '',
        description: '',
        image_url: '',
        hackLevel: 5,
        status: 'secure',
        dataSize: '0MB'
    });
    
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'hackLevel' ? parseInt(value) || 5 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const result = await onSubmit(formData);
        
        if (result.success) {
            setFormData({
                title: '',
                description: '',
                image_url: '',
                hackLevel: 5,
                status: 'secure',
                dataSize: '0MB'
            });
        } else {
            setError(result.error || 'Failed to create card');
        }
        
        setSubmitting(false);
    };

    // Extract numeric value and unit from dataSize
    const dataSizeValue = parseInt(formData.dataSize?.replace(/\D/g, '') || '0');
    const dataSizeUnit = formData.dataSize?.replace(/\d+/g, '') || 'MB';

    const handleDataSizeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = parseInt(e.target.value) || 0;
        setFormData(prev => ({
            ...prev,
            dataSize: `${numValue}${dataSizeUnit}`
        }));
    };

    const handleDataSizeUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            dataSize: `${dataSizeValue}${e.target.value}`
        }));
    };

    return (
        <div className="
            relative bg-black/40 backdrop-blur-[10px] border border-gray-700 
            rounded-lg p-6 mb-6 border-l-4 border-cyan-500
            before:content-[''] before:absolute before:inset-0 
            before:bg-gradient-to-br before:from-transparent before:via-cyan-500/5 before:to-transparent
            before:pointer-events-none
        ">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-lg font-bold font-mono text-cyan-500">
                        CREATE_NEW_SYSTEM
                    </span>
                </div>
                <button 
                    className="
                        bg-transparent border-none text-gray-500 text-2xl cursor-pointer
                        p-0 w-8 h-8 flex items-center justify-center rounded
                        transition-all duration-200 hover:bg-red-500/10 hover:text-red-500
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    onClick={onCancel}
                    disabled={submitting}
                >
                    ×
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Error Display */}
                {error && (
                    <div className="
                        bg-red-500/10 border border-red-500/30 rounded px-3 py-2
                        mb-5 flex items-center gap-2 animate-pulse
                    ">
                        <div className="text-red-500 text-base">⚠</div>
                        <span className="text-sm font-mono text-red-500">{error}</span>
                    </div>
                )}

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                    {/* Title Field - Full Width */}
                    <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-2">
                        <label className="
                            text-gray-500 font-mono text-xs uppercase tracking-wider
                            flex items-center gap-1.5
                        ">
                            <span className="text-base">#</span>
                            SYSTEM_TITLE *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="
                                bg-black/30 border border-gray-700 rounded px-3 py-2.5
                                text-gray-200 font-mono text-sm transition-all duration-300
                                focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                                disabled:opacity-50 disabled:cursor-not-allowed
                                placeholder-gray-600
                            "
                            placeholder="Enter system title"
                            disabled={submitting}
                        />
                    </div>

                    {/* Description Field - Full Width */}
                    <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-2">
                        <label className="
                            text-gray-500 font-mono text-xs uppercase tracking-wider
                            flex items-center gap-1.5
                        ">
                            <span className="text-base">📝</span>
                            SYSTEM_DESCRIPTION
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="
                                bg-black/30 border border-gray-700 rounded px-3 py-2.5
                                text-gray-200 font-mono text-sm transition-all duration-300
                                focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                                disabled:opacity-50 disabled:cursor-not-allowed
                                placeholder-gray-600 resize-y min-h-[80px]
                            "
                            placeholder="Enter system description"
                            rows={4}
                            disabled={submitting}
                        />
                    </div>

                    {/* Image URL Field - Full Width */}
                    <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-2">
                        <label className="
                            text-gray-500 font-mono text-xs uppercase tracking-wider
                            flex items-center gap-1.5
                        ">
                            <span className="text-base">🖼️</span>
                            IMAGE_URL
                        </label>
                        <input
                            type="url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            className="
                                bg-black/30 border border-gray-700 rounded px-3 py-2.5
                                text-gray-200 font-mono text-sm transition-all duration-300
                                focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                                disabled:opacity-50 disabled:cursor-not-allowed
                                placeholder-gray-600
                            "
                            placeholder="https://example.com/image.jpg"
                            disabled={submitting}
                        />
                    </div>

                    {/* Hack Level */}
                    <div className="flex flex-col gap-2">
                        <label className="
                            text-gray-500 font-mono text-xs uppercase tracking-wider
                            flex items-center gap-1.5
                        ">
                            <span className="text-base">🛡️</span>
                            SECURITY_LEVEL
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                name="hackLevel"
                                min="1"
                                max="10"
                                value={formData.hackLevel}
                                onChange={handleChange}
                                className="
                                    flex-1 h-1.5 bg-black/30 rounded-lg appearance-none cursor-pointer
                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                                    [&::-webkit-slider-thumb]:rounded-full
                                    [&::-webkit-slider-thumb]:bg-cyan-500
                                    [&::-webkit-slider-thumb]:border-2
                                    [&::-webkit-slider-thumb]:border-gray-900
                                    [&::-webkit-slider-thumb]:shadow-lg
                                    [&::-webkit-slider-thumb]:shadow-cyan-500/50
                                    disabled:[&::-webkit-slider-thumb]:bg-gray-500
                                    disabled:cursor-not-allowed
                                "
                                disabled={submitting}
                            />
                            <span className="
                                text-cyan-500 font-mono text-sm font-bold min-w-10 text-center
                                bg-black/30 px-2 py-1 rounded
                            ">
                                {formData.hackLevel}/10
                            </span>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <label className="
                            text-gray-500 font-mono text-xs uppercase tracking-wider
                            flex items-center gap-1.5
                        ">
                            <span className="text-base">📊</span>
                            STATUS
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="
                                bg-black/30 border border-gray-700 rounded px-3 py-2.5
                                text-gray-200 font-mono text-sm transition-all duration-300
                                focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                                disabled:opacity-50 disabled:cursor-not-allowed
                                cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236b7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:20px_20px] bg-[center_right_0.75rem]
                            "
                            disabled={submitting}
                        >
                            <option value="secure" className="bg-gray-900">🔒 SECURE</option>
                            <option value="active" className="bg-gray-900">⚡ ACTIVE</option>
                            <option value="breached" className="bg-gray-900">⚠ BREACHED</option>
                            <option value="critical" className="bg-gray-900">🚨 CRITICAL</option>
                        </select>
                    </div>

                    {/* Data Size */}
                    <div className="flex flex-col gap-2">
                        <label className="
                            text-gray-500 font-mono text-xs uppercase tracking-wider
                            flex items-center gap-1.5
                        ">
                            <span className="text-base">💾</span>
                            DATA_SIZE
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={dataSizeValue}
                                onChange={handleDataSizeValueChange}
                                className="
                                    flex-1 bg-black/30 border border-gray-700 rounded px-3 py-2.5
                                    text-gray-200 font-mono text-sm transition-all duration-300
                                    focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    [&::-webkit-inner-spin-button]:appearance-none
                                    [&::-webkit-outer-spin-button]:appearance-none
                                "
                                placeholder="0"
                                min="0"
                                disabled={submitting}
                            />
                            <select
                                value={dataSizeUnit}
                                onChange={handleDataSizeUnitChange}
                                className="
                                    w-24 bg-black/30 border border-gray-700 rounded px-3 py-2.5
                                    text-gray-200 font-mono text-sm transition-all duration-300
                                    focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236b7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:16px_16px] bg-[center_right_0.5rem]
                                "
                                disabled={submitting}
                            >
                                <option value="MB" className="bg-gray-900">MB</option>
                                <option value="GB" className="bg-gray-900">GB</option>
                                <option value="TB" className="bg-gray-900">TB</option>
                                <option value="PB" className="bg-gray-900">PB</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-gray-700">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="
                            px-6 py-2.5 border border-gray-500/30 rounded text-sm font-bold
                            font-mono cursor-pointer transition-all duration-300
                            bg-transparent text-gray-500 hover:bg-gray-500/10 hover:border-gray-500
                            disabled:opacity-50 disabled:cursor-not-allowed
                            flex-1 sm:flex-none
                        "
                        disabled={submitting}
                    >
                        CANCEL
                    </button>
                    <button
                        type="submit"
                        className="
                            px-6 py-2.5 border border-cyan-500/30 rounded text-sm font-bold
                            font-mono cursor-pointer transition-all duration-300
                            bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 text-cyan-500
                            hover:from-cyan-500/20 hover:to-cyan-500/10 hover:border-cyan-500
                            hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]
                            disabled:opacity-50 disabled:cursor-not-allowed
                            flex-1 sm:flex-none
                            flex items-center justify-center gap-2
                        "
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <div className="
                                    w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-500
                                    rounded-full animate-spin
                                "></div>
                                <span>DEPLOYING...</span>
                            </>
                        ) : (
                            'DEPLOY SYSTEM'
                        )}
                    </button>
                </div>
            </form>

            {/* Grid Background Effect */}
            <div className="
                absolute inset-0 pointer-events-none opacity-10
                bg-[linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px)]
                bg-[size:20px_20px]
            "></div>

            {/* Glow Effect */}
            <div className="
                absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10
                blur-xl opacity-20 pointer-events-none -z-10
            "></div>
        </div>
    );
};

export default CreateCardForm;