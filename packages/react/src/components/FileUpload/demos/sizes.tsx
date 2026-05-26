import { FileUpload, FileUploadTrigger, FileUploadTitle, FileUploadMeta } from '@talon-sandbox/react';

// 三档尺寸的文件上传区域
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
      <FileUpload size="sm" accept="text/*">
        <FileUploadTrigger>
          <FileUploadTitle>拖入 Dockerfile · <strong>浏览</strong></FileUploadTitle>
          <FileUploadMeta>≤ 64 KiB · text/*</FileUploadMeta>
        </FileUploadTrigger>
      </FileUpload>
      <FileUpload multiple>
        <FileUploadTrigger>
          <FileUploadTitle>拖入或选择文件 · <strong>浏览</strong></FileUploadTitle>
          <FileUploadMeta>支持多文件 · ≤ 16 MiB</FileUploadMeta>
        </FileUploadTrigger>
      </FileUpload>
      <FileUpload size="lg" accept=".tar,.tar.gz">
        <FileUploadTrigger>
          <FileUploadTitle>拖入 image tarball · <strong>浏览</strong></FileUploadTitle>
          <FileUploadMeta>OCI archive · ≤ 2 GiB</FileUploadMeta>
        </FileUploadTrigger>
      </FileUpload>
    </div>
  );
}
