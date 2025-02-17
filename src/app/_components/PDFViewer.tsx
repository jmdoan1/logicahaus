"use client";
import React, { useState } from "react";
import { Document, Page as PdfPage, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ pdf }: { pdf: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
  };

  return (
    <div
      style={{
        textAlign: "center",
        justifyItems: "center",
        width: "100%",
      }}
    >
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages ?? 0 }).map((_, i) => (
          <PdfPage key={i} pageNumber={i + 1} />
        ))}
      </Document>
    </div>
  );
}
