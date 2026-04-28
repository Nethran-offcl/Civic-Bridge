"use client";

import { useState, useRef } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useProfileStore } from "@/store/profileStore";
import type { Scheme } from "@/types/scheme";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PacketGeneratorButtonProps {
  scheme: Scheme;
}

export function PacketGeneratorButton({ scheme }: PacketGeneratorButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [translatedData, setTranslatedData] = useState<any>(null);
  const language = useProfileStore((state) => state.language);
  const containerRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      let currentData = {
        title: "Application Packet: " + scheme.name,
        applicant: "Applicant",
        coverNote: "Please find attached my application and supporting documents for the above-mentioned scheme.",
        documentsTitle: "Required Documents Checklist",
        documents: scheme.documents,
        stepsTitle: "Application Steps",
        steps: scheme.applicationProcess.map((s) => s.title),
        date: new Date().toLocaleDateString()
      };

      if (language !== "en") {
        const textsToTranslate = [
          currentData.title,
          currentData.coverNote,
          currentData.documentsTitle,
          ...currentData.documents,
          currentData.stepsTitle,
          ...currentData.steps
        ];

        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texts: textsToTranslate, targetLanguage: language })
        });

        if (response.ok) {
          const { texts } = await response.json();
          if (texts && texts.length === textsToTranslate.length) {
            currentData = {
              ...currentData,
              title: texts[0],
              coverNote: texts[1],
              documentsTitle: texts[2],
              documents: texts.slice(3, 3 + currentData.documents.length),
              stepsTitle: texts[3 + currentData.documents.length],
              steps: texts.slice(4 + currentData.documents.length)
            };
          }
        }
      }

      setTranslatedData(currentData);
      
      // Wait for React to render the hidden container
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (containerRef.current) {
        const canvas = await html2canvas(containerRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4"
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = pdfWidth / imgWidth;
        const totalPdfHeight = imgHeight * ratio;
        
        let heightLeft = totalPdfHeight;
        let position = 0;
        
        // Add the first page
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, totalPdfHeight);
        heightLeft -= pdfHeight;
        
        // Add subsequent pages if the content overflows
        while (heightLeft > 0) {
          // Calculate the correct negative position for the top of the image to slide it up exactly one page height
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, totalPdfHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save(`Application_Packet_${scheme.id}.pdf`);
      }
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGenerating(false);
      setTranslatedData(null);
    }
  };

  return (
    <>
      <Button onClick={generatePDF} disabled={isGenerating} className="gap-2">
        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {isGenerating ? "Generating..." : "Download App Packet"}
      </Button>

      {/* Hidden container for PDF generation */}
      {translatedData && (
        <div data-no-translate="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <div 
            ref={containerRef} 
            style={{ 
              width: "800px", 
              padding: "40px", 
              background: "white", 
              color: "black",
              fontFamily: "system-ui, -apple-system, sans-serif"
            }}
          >
            <div style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "20px", marginBottom: "30px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 10px 0", color: "#1e293b" }}>
                {translatedData.title}
              </h1>
              <p style={{ margin: "5px 0", color: "#475569" }}>
                <strong>Date:</strong> {translatedData.date}
              </p>
              <p style={{ margin: "5px 0", color: "#475569" }}>
                <strong>Applicant:</strong> {translatedData.applicant}
              </p>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#334155" }}>
                To the concerned authority,
              </p>
              <p style={{ fontSize: "16px", lineHeight: "1.5", marginTop: "10px", color: "#334155" }}>
                {translatedData.coverNote}
              </p>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", color: "#1e293b" }}>
                {translatedData.documentsTitle}
              </h2>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {translatedData.documents.map((doc: string, index: number) => (
                  <li key={index} style={{ marginBottom: "12px", display: "flex", alignItems: "flex-start", color: "#334155" }}>
                    <div style={{ width: "16px", height: "16px", border: "1px solid #94a3b8", marginRight: "12px", borderRadius: "3px", flexShrink: 0, marginTop: "4px" }}></div>
                    <span style={{ fontSize: "16px", lineHeight: "1.4" }}>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", color: "#1e293b" }}>
                {translatedData.stepsTitle}
              </h2>
              <ol style={{ paddingLeft: "16px", margin: 0, color: "#334155" }}>
                {translatedData.steps.map((step: string, index: number) => (
                  <li key={index} style={{ marginBottom: "12px", fontSize: "16px", lineHeight: "1.5" }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            <div style={{ marginTop: "60px", paddingTop: "20px", borderTop: "1px solid #e2e8f0", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
              Generated via CivicBridge • Privacy-First Scheme Discovery
            </div>
          </div>
        </div>
      )}
    </>
  );
}
