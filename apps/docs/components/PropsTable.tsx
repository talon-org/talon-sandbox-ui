/**
 * PropsTable — RSC wrapper over AutoTypeTable.
 * Reads TypeScript types at build time via the TS Compiler API.
 * No 'use client' — runs as a React Server Component.
 */
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import { generator } from '@/lib/type-generator';
import path from 'path';

interface PropsTableProps {
  /**
   * Path to the .types.ts file, relative to packages/react/src/.
   * e.g. "components/Button/Button.types.ts"
   */
  path: string;
  /** Exported TypeScript interface or type name. */
  name: string;
}

export function PropsTable({ path: relPath, name }: PropsTableProps) {
  // Resolve to absolute path from monorepo root
  // CWD = apps/docs → ../../packages/react/src/<relPath>
  const absolutePath = path.resolve(
    process.cwd(),
    '../../packages/react/src',
    relPath,
  );

  return (
    <div className="not-prose my-6">
      <AutoTypeTable
        generator={generator}
        path={absolutePath}
        name={name}
      />
    </div>
  );
}
