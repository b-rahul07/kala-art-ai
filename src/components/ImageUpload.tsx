import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
    preview?: string;
    onClear?: () => void;
    className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onImageSelect,
    preview,
    onClear,
    className
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                onImageSelect(file);
            }
        }
    }, [onImageSelect]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onImageSelect(files[0]);
        }
    };

    return (
        <div className={cn("relative", className)}>
            {preview ? (
                <div className="relative group">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-auto max-h-96 object-contain rounded-lg border-2 border-border"
                    />
                    {onClear && (
                        <button
                            onClick={onClear}
                            className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            ) : (
                <div
                    onDragEnter={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        "relative border-2 border-dashed rounded-lg p-12 transition-all duration-300",
                        isDragging
                            ? "border-primary bg-primary/5 scale-[1.02]"
                            : "border-border hover:border-primary/50 hover:bg-accent/5"
                    )}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <div className={cn(
                            "p-4 rounded-full transition-colors",
                            isDragging ? "bg-primary/10" : "bg-accent"
                        )}>
                            {isDragging ? (
                                <ImageIcon className="h-8 w-8 text-primary" />
                            ) : (
                                <Upload className="h-8 w-8 text-muted-foreground" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">
                                {isDragging ? "Drop your image here" : "Drag & drop an artwork image"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                or click to browse
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Supports: JPG, PNG, WebP
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
