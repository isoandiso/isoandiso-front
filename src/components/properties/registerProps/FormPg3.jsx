import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useFormContext } from 'react-hook-form';

function FormPg3({ currentPage, files, setFiles }) {
    const { register, setValue, watch } = useFormContext();


    const onDrop = useCallback(acceptedFiles => {
        const newFiles = acceptedFiles.map(file => ({
            id: crypto.randomUUID(),
            preview: URL.createObjectURL(file),
            file,
        }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }, []);

    useEffect(() => {
        setValue('images', files.map(file => file.file)); // Set files in react-hook-form
    }, [files, setValue]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'image/jpg': []
        },
        multiple: true
    });

    // Clean up the object URLs to avoid memory leaks
    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const removeFile = (id) => () => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
    };

    return (
        <div className={`${currentPage != 3 ? "hidden" : ""} w-full`}>
            <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-xl font-medium leading-6 text-gray-900 my-3">
                    Subir fotos (Por lo menos 5 fotos)
                </label>
                <div className={`border-2 border-dashed border-green-400 text-center px-5 py-20 rounded-md ${isDragActive ? 'bg-green-200 opacity-65' : ''}`} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <IoCloudUploadOutline className='mx-auto text-[30px]' />
                    {
                        isDragActive ?
                            <p>Suelta los archivos aquí...</p> :
                            <p>Arrastre y suelte algunos archivos aquí o haga clic para seleccionar archivos</p>
                    }
                </div>
            </div>
            <div className="mt-4">
                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {files.map((file) => (
                            <div key={file.id} className="relative border border-gray-300 p-2 rounded-md">
                                <button
                                    className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full"
                                    onClick={removeFile(file.id)}
                                >
                                    <IoMdClose />
                                </button>
                                <img
                                    src={file.preview}
                                    alt="Preview"
                                    className="w-28 h-32 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FormPg3;

