"use client";

import { useRef, useState } from "react";

interface CvDropzoneProps {
  onFileSelected: (file: File) => void;
  selectedFileName?: string;
  isUploading?: boolean;
  onRemoveFile?: () => void;
}

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

function isValidCvFile(file: File): string | null {
  const lower = file.name.toLowerCase();
  const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
  if (!hasValidExt) {
    return "Formato no compatible. Sube un archivo PDF o Word (.doc, .docx).";
  }
  if (file.size > MAX_BYTES) {
    return "El archivo supera el límite máximo de 5 MB.";
  }
  return null;
}

export function CvDropzone({
  onFileSelected,
  selectedFileName,
  isUploading = false,
  onRemoveFile,
}: CvDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const validationError = isValidCvFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onFileSelected(file);
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
      className={`border-2 border-dashed border-[#3730A3] rounded-2xl px-6 py-7 text-center transition-colors ${
        isDragging ? "bg-[#EEEDFC]" : "bg-white"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        aria-label="Seleccionar archivo de CV en PDF o Word"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <h2
        className="text-[18.72px] font-bold text-[#12122B]"
        style={{ fontFamily: "var(--font-talented-grotesk), sans-serif" }}
      >
        Arrastra tu CV aquí
      </h2>
      <p className="mt-1 text-[13px] text-[#4A4A68]">
        PDF o Word · máx. 5 MB
      </p>

      <button
        type="button"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="mt-4 inline-flex items-center justify-center min-h-[44px] px-5 rounded-xl border-[1.5px] border-[#3730A3] bg-white text-[#3730A3] font-bold text-[15px] hover:bg-[#EEEDFC] disabled:opacity-60 transition-colors cursor-pointer"
      >
        {isUploading ? "Subiendo…" : "Elegir archivo"}
      </button>

      {selectedFileName ? (
        <div className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-[#EEEDFC] px-3.5 py-1.5 text-[13px] font-medium text-[#2E2785]">
          <span className="truncate max-w-[220px]">
            Archivo cargado: <strong>{selectedFileName}</strong>
          </span>
          {onRemoveFile && !isUploading ? (
            <button
              type="button"
              onClick={onRemoveFile}
              className="text-[#4A4A68] hover:text-[#B42318] text-[12px] font-bold underline cursor-pointer ml-1"
              aria-label="Quitar archivo de CV"
            >
              Quitar
            </button>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="mt-3 text-[13px] font-medium text-[#B42318]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
