'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    bucket: string;          // e.g. 'accessories' or 'newsletter'
    currentUrl?: string;     // existing image URL to display
    onUploaded: (url: string) => void;
    className?: string;
}

export function ImageUpload({ bucket, currentUrl, onUploaded, className = '' }: ImageUploadProps) {
    const [preview, setPreview] = useState<string>(currentUrl || '');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be under 5MB.');
            return;
        }

        setError('');
        setUploading(true);

        // Create a unique filename
        const ext = file.name.split('.').pop();
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { data, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filename, file, { upsert: true, contentType: file.type });

        if (uploadError) {
            setError('Upload failed: ' + uploadError.message);
            setUploading(false);
            return;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filename);

        setPreview(publicUrl);
        onUploaded(publicUrl);
        setUploading(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleClear = () => {
        setPreview('');
        onUploaded('');
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />

            {preview ? (
                <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    <img src={preview} alt="Preview" className="w-full object-cover max-h-52" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="px-4 py-2 bg-blueflame text-white text-sm font-bold rounded-lg flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4" /> Replace
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-4 py-2 bg-rose-500/80 text-white text-sm font-bold rounded-lg flex items-center gap-2"
                        >
                            <X className="w-4 h-4" /> Remove
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
                    onClick={() => !uploading && inputRef.current?.click()}
                    className="border-2 border-dashed border-white/10 hover:border-blueflame/50 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all bg-black/20 hover:bg-blueflame/5 group"
                >
                    {uploading ? (
                        <Loader2 className="w-8 h-8 text-blueflame animate-spin" />
                    ) : (
                        <ImageIcon className="w-8 h-8 text-gray-600 group-hover:text-blueflame transition-colors" />
                    )}
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-300">
                            {uploading ? 'Uploading...' : 'Click or drag & drop an image'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 5MB</p>
                    </div>
                </div>
            )}

            {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        </div>
    );
}
