"use client";

import React, { useState } from 'react';
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Menu, Edit2, Trash2 } from "lucide-react";
import { HealthRecordsSidebar } from './components/HealthRecordsSidebar';
import { FilePreview } from './components/FilePreview';
import { useToast } from '@/hooks/use-toast';
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ChatButton } from './components/ChatButton';
import { User } from '@supabase/supabase-js';

interface FileInfo {
  id: string;
  name: string;
  displayName: string;
  created_at: string;
}

interface HealthRecordsPageClientProps {
  initialData: {
    user: User | null;
    files: FileInfo[];
  }
}

export default function HealthRecordsPageClient({ initialData }: HealthRecordsPageClientProps) {
  const [files, setFiles] = useState<FileInfo[]>(initialData.files);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const { toast } = useToast();
  const supabase = createSupabaseBrowser();

  const handleUploadSuccess = (fileName: string, displayName: string, fileId: string) => {
    setFiles(prevFiles => [...prevFiles, { 
      id: fileId, 
      name: fileName, 
      displayName, 
      created_at: new Date().toISOString() 
    }]);
    toast({
      title: "Success",
      description: "File uploaded successfully",
      variant: "default",
    });
  };

  const handleDownload = async (fileName: string) => {
    if (!initialData.user?.id) return;
    
    const { data, error } = await supabase.storage
      .from('health-records')
      .download(`${initialData.user.id}/${fileName}`);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    } else if (data) {
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Success",
        description: "File downloaded successfully",
      });
    }
  };

  const getFileUrl = async (fileName: string) => {
    if (!initialData.user?.id) return null;

    const { data, error } = await supabase.storage
      .from('health-records')
      .createSignedUrl(`${initialData.user.id}/${fileName}`, 3600); 

    if (error) {
      toast({
        title: "Error",
        description: "Failed to generate file URL",
        variant: "destructive",
      });
      return null;
    }

    return data.signedUrl;
  };

  const handleRename = async (fileId: string, newName: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file || !initialData.user?.id) return;

    const fileExtension = file.name.split('.').pop();
    const newDisplayName = `${newName}.${fileExtension}`;

    const { error } = await supabase
      .from('file_metadata')
      .upsert({ 
        user_id: initialData.user.id, 
        file_name: file.name, 
        display_name: newDisplayName 
      }, { 
        onConflict: 'user_id,file_name' 
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to rename file",
        variant: "destructive",
      });
      console.error(error);
    } else {
      setFiles(files.map(f => f.id === fileId ? {...f, displayName: newDisplayName} : f));
      setEditingFile(null);
      toast({
        title: "Success",
        description: "File renamed successfully",
        variant: "default",
      });
    }
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    if (!initialData.user?.id) return;

    try {
      // Delete from file_metadata first - this will cascade to other tables
      const { error: metadataError } = await supabase
        .from('file_metadata')
        .delete()
        .match({ 
          user_id: initialData.user.id, 
          file_name: fileName
        });

      if (metadataError) {
        console.error('Metadata deletion error:', metadataError);
        toast({
          title: "Error",
          description: "Failed to delete file metadata",
          variant: "destructive",
        });
        return;
      }

      // Then delete from storage
      const { error: storageError } = await supabase.storage
        .from('health-records')
        .remove([`${initialData.user.id}/${fileName}`]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
        toast({
          title: "Error",
          description: "Failed to delete file from storage",
          variant: "destructive",
        });
        return;
      }

      // Update UI
      setFiles(files.filter(f => f.id !== fileId));

      toast({
        title: "Success",
        description: "File deleted successfully",
        variant: "default",
      });

    } catch (error) {
      console.error('Delete operation failed:', error);
      toast({
        title: "Error",
        description: "Failed to delete file completely",
        variant: "destructive",
      });
    }
  };

  if (!initialData.user) return null;

  return (
    <div className="flex relative">
      <HealthRecordsSidebar 
        user={initialData.user} 
        onUploadSuccess={handleUploadSuccess} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Health Records</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <Card key={file.id}>
              <CardHeader>
                {editingFile === file.id ? (
                  <div className="flex">
                    <Input 
                      value={newFileName.split('.')[0]}
                      onChange={(e) => setNewFileName(e.target.value + '.' + file.displayName.split('.').pop())}
                      className="mr-2"
                    />
                    <Button onClick={() => handleRename(file.id, newFileName.split('.')[0])}>Save</Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium truncate">{file.displayName}</CardTitle>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setEditingFile(file.id);
                          setNewFileName(file.displayName);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your file.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(file.id, file.name)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex justify-between sm:flex-col gap-2">
                <FilePreview 
                  fileName={file.displayName}
                  fileId={file.id}
                  getFileUrl={() => getFileUrl(file.name)} 
                />
                <Button onClick={() => handleDownload(file.name)} size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <ChatButton />
    </div>
  );
}