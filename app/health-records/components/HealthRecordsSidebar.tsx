import React, { useState, useRef } from 'react';
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, ChevronLeft } from "lucide-react";
import { User } from '@supabase/supabase-js';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from '@/hooks/use-toast';

interface HealthRecordsSidebarProps {
  user: User;
  onUploadSuccess: (fileName: string, displayName: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function HealthRecordsSidebar({ user, onUploadSuccess, isSidebarOpen, setIsSidebarOpen }: HealthRecordsSidebarProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const supabase = createSupabaseBrowser();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setSelectedFile(file);
        if (!fileName) {
          setFileName(file.name);
        }
      } else {
        toast({
          title: "Error",
          description: "Please select a PDF or image file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      toast({
        title: "Error",
        description: "Please select a file to upload and ensure you're logged in",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const fileExt = selectedFile.name.split('.').pop();
    const uniqueFileName = `${Date.now()}_${selectedFile.name}`;
    const displayName = fileName || selectedFile.name;

    try {
      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('health-records')
        .upload(`${user.id}/${uniqueFileName}`, selectedFile);

      if (uploadError) {
        console.error('Error uploading to Supabase:', uploadError);
        throw uploadError;
      }
      console.log('Uploaded to Supabase:', uploadData);

      // Insert metadata
      const { data: metadataData, error: metadataError } = await supabase
        .from('file_metadata')
        .insert({ 
          user_id: user.id, 
          file_name: uniqueFileName, 
          display_name: displayName 
        })
        .select()
        .single();

      if (metadataError) throw metadataError;

      // Notify successful upload
      onUploadSuccess(uniqueFileName, displayName);
      toast({
        title: "Success",
        description: "File uploaded successfully",
        variant: "default",
      });

      // Start transcription process in the background
      transcribeFile(metadataData.id, uniqueFileName, selectedFile);

    } catch (error) {
      console.error('Error during upload:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setFileName('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const transcribeFile = async (fileId: string, uniqueFileName: string, file: File) => {
    try {
      const fileContent = await file.arrayBuffer();
      const uint8Array = new Uint8Array(fileContent);
      const base64File = btoa(uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), ''));

      const endpoint = file.type === 'application/pdf' ? 'analyze-pdf' : 'analyze-image';

      const analysisResponse = await fetch(`http://localhost:8002/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: base64File,
          file_name: uniqueFileName,
          file_id: fileId,
          user_id: user.id
        }),
      });

      if (!analysisResponse.ok) {
        const errorText = await analysisResponse.text();
        throw new Error(`HTTP error! status: ${analysisResponse.status}, message: ${errorText}`);
      }

      const analysisResult = await analysisResponse.json();

      toast({
        title: "Transcription Complete",
        description: `File "${uniqueFileName}" has been successfully transcribed.`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error during transcription:', error);
      toast({
        title: "Transcription Error",
        description: `Failed to transcribe file "${uniqueFileName}". Please try again later.`,
        variant: "destructive",
      });
    }
  };

  return (
    <ScrollArea className={`${isSidebarOpen ? 'w-full sm:w-80' : 'w-0'} transition-all duration-300 ease-in-out overflow-y-auto flex-shrink-0`}>
      <Card className="border-r">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Upload Record</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="File name (optional)"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="mb-2"
            />
            <Input
              type="file"
              onChange={handleFileSelect}
              disabled={isUploading}
              ref={fileInputRef}
            />
            <Button 
              onClick={handleUpload} 
              disabled={isUploading || !selectedFile}
              className="w-full"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}