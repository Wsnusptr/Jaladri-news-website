"use client";

import { useState, useEffect } from 'react';
import { PostType } from '@prisma/client';

interface ArticleFormProps {
    onSubmit: (data: any, file?: File) => Promise<void>;
    initialData?: any;
    buttonText?: string;
}

export function ArticleForm({ onSubmit, initialData, buttonText = "Simpan" }: ArticleFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        type: 'STANDARD' as PostType,
        category: '',
        isHotNews: false,
        isSlider: false,
        isRecommendation: false,
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                content: initialData.content || '',
                imageUrl: initialData.imageUrl || '',
                type: initialData.type || 'STANDARD',
                category: initialData.categories?.[0]?.name || '',
                isHotNews: initialData.isHotNews || false,
                isSlider: initialData.isSlider || false,
                isRecommendation: initialData.isRecommendation || false,
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData, file || undefined);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Artikel
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Konten Artikel
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih Kategori</option>
                    <option value="Berita">Berita</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Politik">Politik</option>
                    <option value="Ekonomi">Ekonomi</option>
                    <option value="Video">Video</option>
                </select>
            </div>

            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Artikel
                </label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="STANDARD">Standard</option>
                    <option value="VIDEO">Video</option>
                    <option value="NETWORK">Network</option>
                    <option value="LIFESTYLE">Lifestyle</option>
                    <option value="FEATURED_STRIP">Featured Strip</option>
                    <option value="JALADRI_NETWORK">Jaladri Network</option>
                </select>
            </div>

            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Gambar (opsional)
                </label>
                <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Gambar (opsional)
                </label>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isHotNews"
                        name="isHotNews"
                        checked={formData.isHotNews}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <label htmlFor="isHotNews" className="text-sm font-medium text-gray-700">
                        Hot News
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isSlider"
                        name="isSlider"
                        checked={formData.isSlider}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <label htmlFor="isSlider" className="text-sm font-medium text-gray-700">
                        Slider
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isRecommendation"
                        name="isRecommendation"
                        checked={formData.isRecommendation}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <label htmlFor="isRecommendation" className="text-sm font-medium text-gray-700">
                        Rekomendasi
                    </label>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                >
                    {isSubmitting ? 'Menyimpan...' : buttonText}
                </button>
            </div>
        </form>
    );
}