import { useState, useRef, useCallback } from 'react';
import { UploadIcon, DownloadIcon, TrashIcon } from '../Icons';
import { formatFileSize, getFileType } from '../../utils/formatters';
import type { Report } from '../../types';
import styles from './Reports.module.css';

export default function ReportsSection() {
  const [reports, setReports] = useState<Report[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newReports: Report[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: getFileType(file.name),
      date: new Date().toLocaleDateString('pt-BR'),
      url: URL.createObjectURL(file),
    }));
    setReports((prev) => [...newReports, ...prev]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDelete = useCallback((id: number) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <section>
      <div className="section-header animate-in">
        <h2 className="section-title">Relatórios</h2>
        <p className="section-subtitle">Gerencie seus documentos e análises</p>
      </div>

      <div
        className={`${styles.uploadZone} ${dragOver ? styles.dragover : ''} animate-in animate-delay-1`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className={styles.uploadIcon}>
          <UploadIcon />
        </div>
        <p className={styles.uploadText}>Arraste arquivos aqui ou clique para fazer upload</p>
        <p className={styles.uploadHint}>PDF, DOC, XLS, imagens e outros formatos</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className={styles.hiddenInput}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {reports.length === 0 ? (
        <div className={`${styles.emptyState} animate-in animate-delay-2`}>
          <p>Nenhum relatório adicionado ainda.</p>
          <p className={styles.emptyHint}>Faça upload dos seus documentos para começar.</p>
        </div>
      ) : (
        <div className={styles.reportsList}>
          {reports.map((report, i) => (
            <div
              key={report.id}
              className={`card ${styles.reportItem} animate-in animate-delay-${Math.min(i + 1, 4)}`}
            >
              <div className={styles.reportInfo}>
                <div className={`${styles.fileIcon} ${styles[report.type]}`}>
                  {report.type === 'img' ? 'IMG' : report.type.toUpperCase()}
                </div>
                <div className={styles.reportDetails}>
                  <div className={styles.reportName}>{report.name}</div>
                  <div className={styles.reportMeta}>
                    {formatFileSize(report.size)} • {report.date}
                  </div>
                </div>
              </div>
              <div className={styles.reportActions}>
                <a
                  href={report.url}
                  download={report.name}
                  className={styles.actionBtn}
                  title="Download"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DownloadIcon />
                </a>
                <button
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  title="Excluir"
                  onClick={() => handleDelete(report.id)}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
