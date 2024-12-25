"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { DocumentPreview } from "./DocumentPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";

interface RecordDetailsProps {
  record: {
    id: string;
    user_id: string;
    file_name: string;
    display_name: string;
    created_at: string;
    object_id: string | null;
    analysis?: {
      text_content: string;
      confidence_level: string;
      test_locations: any;
      languages: string[];
      ocr_quality: number;
    };
    fileUrl: string | null;
  }
}

const mockIndicators = [
  {
    name: "Anti Thyroperoxidase Antibody - TPO",
    value: "12.75 IU/ml",
    status: "Abnormal",
    normalRange: "Negative: <5.61 IU/ml, Positive: >5.61 IU/ml",
    interpretation: "The Anti-TPO level is elevated, indicating a positive result. This suggests the presence of antibodies that are typically associated with autoimmune thyroid disorders such as Hashimoto's thyroiditis."
  },
  {
    name: "T3 (Triiodothyronine) - Total",
    value: "<0.195 ng/ml",
    status: "Abnormal",
    normalRange: "0.8-2.10 ng/ml",
    interpretation: "The T3 level is significantly below the normal range, indicating hypothyroidism."
  },
  {
    name: "T4 (Tyroxine) Total",
    value: "1.18 μg/dl",
    status: "Abnormal",
    normalRange: "4.2-12.0 μg/dl",
    interpretation: "The T4 level is also below the normal range, further supporting the diagnosis of hypothyroidism."
  },
  {
    name: "TSH (Thyroid Stimulating Hormone)",
    value: "301.00 μIU/mL",
    status: "Abnormal",
    normalRange: "0.7-6.4 μIU/mL",
    interpretation: "The TSH level is extremely elevated, which is consistent with primary hypothyroidism."
  },
]

const clinicalSignificance = `The combination of high TSH and low T3 and T4 levels typically indicates primary hypothyroidism, where the thyroid gland is underactive and not producing enough hormones. The presence of high Anti-TPO antibodies suggests an autoimmune etiology, likely Hashimoto's thyroiditis, which is the most common cause of hypothyroidism.`

export function RecordDetails({ record }: RecordDetailsProps) {
  return (
    <div className="mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/health/records" 
            className="hover:opacity-80 p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold truncate max-w-[300px] sm:max-w-[500px]">
              {record.file_name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Uploaded on {new Date(record.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* {record.analysis && (
            <Badge 
              variant={
                record.analysis.confidence_level === 'High' ? 'success' :
                record.analysis.confidence_level === 'Medium' ? 'default' : 'secondary'
              }
              className="h-6 px-3 text-sm"
            >
              {record.analysis.confidence_level} Confidence
            </Badge>
          )} */}
          <Link href="/chat">
            <RainbowButton>
              Chat with Document <ChevronRight className="ml-2" />
            </RainbowButton>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="indicators" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="indicators">Indicators & Analysis</TabsTrigger>
          <TabsTrigger value="details">Document & Transcript</TabsTrigger>
        </TabsList>

        <TabsContent value="indicators" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockIndicators.map((indicator, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{indicator.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Normal Range: {indicator.normalRange}
                      </p>
                    </div>
                    <Badge variant={indicator.status === "Abnormal" ? "destructive" : "secondary"}>
                      {indicator.value}
                    </Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Interpretation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {mockIndicators.map((indicator, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium text-lg">{indicator.name}</h3>
                  <div className="space-y-1">
                    <div className="flex gap-2">
                      <span className="font-medium text-sm text-muted-foreground">Observed Value:</span>
                      <span className="text-sm">{indicator.value}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-sm text-muted-foreground">Reference Range:</span>
                      <span className="text-sm">{indicator.normalRange}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-sm text-muted-foreground">Interpretation:</span>
                      <span className="text-sm">{indicator.interpretation}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <h3 className="font-medium text-lg mb-2">Clinical Significance</h3>
                <p className="text-sm">{clinicalSignificance}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
            {/* Left Column - Transcript */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  {record.analysis?.text_content ? (
                    <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-md">
                      {record.analysis.text_content}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">No transcript available</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview and Details */}
            <div className="space-y-6">
              <Card className="lg:h-fit lg:sticky lg:top-6">
                <CardHeader>
                  <CardTitle>Document Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentPreview
                    fileName={record.file_name}
                    fileUrl={record.fileUrl}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>File Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h3 className="font-medium text-muted-foreground">Type</h3>
                      <p className="mt-1">{record.file_name.split('.').pop()?.toUpperCase()}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-muted-foreground">Display Name</h3>
                      <p className="mt-1">{record.display_name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {record.analysis && (
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-muted-foreground mb-2">Languages Detected</h3>
                      <div className="flex gap-2 flex-wrap">
                        {record.analysis.languages.map((lang, i) => (
                          <Badge key={i} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-muted-foreground mb-2">OCR Quality</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-accent rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${record.analysis.ocr_quality * 10}%` }}
                          />
                        </div>
                        <span className="text-sm">{record.analysis.ocr_quality}/10</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 