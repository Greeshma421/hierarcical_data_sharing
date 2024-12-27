"use client"

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

interface FilePreviewProps {
  fileName: string;
  fileId: string;
  getFileUrl: () => Promise<string | null>;
  transcriptionResult?: string;
}

type TranscriptionStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Add type for the payload
type TranscriptionPayload = {
  new: {
    status: TranscriptionStatus;
    error_message?: string | null;
  };
};

export function FilePreview({ fileName, fileId, getFileUrl, transcriptionResult }: FilePreviewProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<TranscriptionStatus>('pending');
  const [error, setError] = useState<string | null>(null);
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  const { toast } = useToast();
  const supabase = createSupabaseBrowser();

  useEffect(() => {
    const fetchUrl = async () => {
      const url = await getFileUrl();
      setFileUrl(url);
    };
    fetchUrl();

    // Initial status check
    const checkInitialStatus = async () => {
      const { data, error } = await supabase
        .from('transcriptions')
        .select('status, error_message')
        .eq('file_id', fileId)
        .single();
      
        console.log(data);

      if (data) {
        setStatus(data.status as TranscriptionStatus);
        if (data.error_message) setError(data.error_message);
      }
    };
    checkInitialStatus();

    // Subscribe to status updates
    const subscription = supabase
      .channel(`transcriptions`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transcriptions',
          filter: `file_id=eq.${fileId}`,
        },
        (payload: any) => {
          const newStatus = payload.new.status;
          setStatus(newStatus);
          
          if (newStatus === 'completed') {
            toast({
              title: "Processing Complete",
              description: `File "${fileName}" has been successfully processed.`,
              variant: "default",
            });
          } else if (newStatus === 'failed') {
            const errorMessage = payload.new.error_message || null;
            setError(errorMessage);
            toast({
              title: "Processing Failed",
              description: errorMessage || "An error occurred during processing",
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fileId, getFileUrl, fileName, supabase, toast]);

  const getStatusBadge = () => {
    const statusConfig: Record<TranscriptionStatus, { label: string; variant: 'default' | 'secondary' | 'success' | 'destructive' }> = {
      pending: { label: 'Pending', variant: 'secondary' },
      processing: { label: 'Processing', variant: 'default' },
      completed: { label: 'Completed', variant: 'success' },
      failed: { label: 'Failed', variant: 'destructive' },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

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
        <div className="relative flex items-center justify-between w-full p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-3">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{fileName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/health/records/${fileId}`}>
              {getStatusBadge()}
            </Link>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl p-4 sm:p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl font-semibold truncate max-w-[250px] sm:max-w-[400px]">
              {fileName}
            </DialogTitle>
            {getStatusBadge()}
          </div>
          {error && (
            <p className="text-sm text-red-500 mt-2">{error}</p>
          )}
        </DialogHeader>
        <div className="mt-4">
          {renderPreview()}
        </div>
      </DialogContent>
    </Dialog>
  );
}