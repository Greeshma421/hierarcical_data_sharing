"use client";

import React, { useState, useEffect } from 'react';
import useUser from '../hook/useUser';
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Menu, Edit2, Trash2 } from "lucide-react";
import { HealthRecordsSidebar } from './components/HealthRecordsSidebar';
import { HealthRecordsSkeleton } from './components/HealthRecordsSkeleton';
import { FilePreview } from './components/FilePreview';
import { useToast } from '@/hooks/use-toast';
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ChatButton } from './components/ChatButton';

interface FileInfo {
  id: string;
  name: string;
  displayName: string;
  created_at: string;
}

export default function HealthRecordsPage() {
  const { data: user, error: userError } = useUser();
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const { toast } = useToast();
  const supabase = createSupabaseBrowser();

  useEffect(() => {
    if (user?.id) {
      fetchFiles();
    }
  }, [user]);

  const fetchFiles = async () => {
    if (!user?.id) return;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('health-records')
      .list(`${user.id}`);

    if (storageError) {
      toast({
        title: "Error",
        description: "Failed to fetch files from storage",
        variant: "destructive",
      });
      return;
    }

    const { data: metadataData, error: metadataError } = await supabase
      .from('file_metadata')
      .select('*')
      .eq('user_id', user.id);

    if (metadataError) {
      toast({
        title: "Error",
        description: "Failed to fetch file metadata",
        variant: "destructive",
      });
      return;
    }

    const combinedFiles = storageData.map(file => {
      const metadata = metadataData?.find(m => m.file_name === file.name);
      return {
        id: file.id,
        name: file.name,
        displayName: metadata?.display_name || file.name,
        created_at: file.created_at,
      };
    });

    setFiles(combinedFiles);
  };

  const handleDownload = async (fileName: string) => {
    
    const { data, error } = await supabase.storage
      .from('health-records')
      .download(`${user?.id}/${fileName}`);

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

  const handleUploadSuccess = (fileName: string, displayName: string) => {
    fetchFiles();
    toast({
      title: "Success",
      description: "File uploaded successfully",
      variant: "default",
    });
  };

  const getFileUrl = async (fileName: string) => {
    const { data, error } = await supabase.storage
      .from('health-records')
      .createSignedUrl(`${user?.id}/${fileName}`, 3600); // URL valid for 1 hour

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
    if (!file) return;

    // Keep the original file extension
    const fileExtension = file.name.split('.').pop();
    const newDisplayName = `${newName}.${fileExtension}`;

    const { error } = await supabase
      .from('file_metadata')
      .upsert({ 
        user_id: user?.id, 
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
    if (!user?.id) return;

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('health-records')
      .remove([`${user.id}/${fileName}`]);

    if (storageError) {
      toast({
        title: "Error",
        description: "Failed to delete file from storage",
        variant: "destructive",
      });
      return;
    }

    // Delete metadata
    const { error: metadataError } = await supabase
      .from('file_metadata')
      .delete()
      .match({ user_id: user.id, file_name: fileName });

    if (metadataError) {
      toast({
        title: "Error",
        description: "Failed to delete file metadata",
        variant: "destructive",
      });
      return;
    }

    // Update local state
    setFiles(files.filter(f => f.id !== fileId));

    toast({
      title: "Success",
      description: "File deleted successfully",
      variant: "default",
    });
  };

  if (userError) return <div>Error loading user data</div>;
  if (!user) return <HealthRecordsSkeleton />;

  return (
    <div className="flex relative">
      <HealthRecordsSidebar 
        user={user} 
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