import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@talon-sandbox/react';

// 面包屑三档尺寸
function CrumbDemo({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <Breadcrumb size={size}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">talon</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">eu-west</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">sandboxes</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>sb_42a1b3</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CrumbDemo size="sm" />
      <CrumbDemo />
      <CrumbDemo size="lg" />
    </div>
  );
}
