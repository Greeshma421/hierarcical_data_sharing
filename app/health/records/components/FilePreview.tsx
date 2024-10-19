"use client"

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface FilePreviewProps {
  fileName: string;
  getFileUrl: () => Promise<string | null>;
  transcriptionResult?: string;
}

export function FilePreview({ fileName, getFileUrl, transcriptionResult }: FilePreviewProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  useEffect(() => {
    const fetchUrl = async () => {
      const url = await getFileUrl();
      setFileUrl(url);
    };
    fetchUrl();
  }, [getFileUrl]);

  const renderPreview = () => {
    if (!fileUrl) return <p className="text-center py-4">Loading preview...</p>;

    if (transcriptionResult) {
      return (
        <div className="rounded-lg overflow-hidden shadow-lg p-4">
          <h3 className="font-bold mb-2">Transcription Result:</h3>
          <p>{transcriptionResult}</p>
        </div>
      );
    }

    switch (fileExtension) {
      case 'pdf':
        return (
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe src={fileUrl} className="w-full h-[50vh] sm:h-[70vh]" />
          </div>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src={fileUrl} alt={fileName} className="max-w-full max-h-[50vh] sm:max-h-[70vh] object-contain mx-auto" />
          </div>
        );
      default:
        return <p className="text-center py-4">Preview not available for this file type.</p>;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl p-4 sm:p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg sm:text-xl font-semibold truncate max-w-[250px] sm:max-w-[400px]">{fileName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {renderPreview()}
        </div>
      </DialogContent>
    </Dialog>
  );
}