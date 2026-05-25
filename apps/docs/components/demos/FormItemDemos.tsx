'use client';
import { useEffect, useState } from 'react';
import { FormItem, Input, Button } from '@/components/TalonComponents';
import { useForm } from '@tanstack/react-form';

export function FormItemDemo() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState('');
  useEffect(() => setMounted(true), []);

  const form = useForm({
    defaultValues: { name: '', region: 'us-east-1' },
    onSubmit: ({ value }) => {
      setSubmitted(JSON.stringify(value));
    },
  });

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <form.Field name="name" validators={{ onChange: ({ value }) => value.length < 1 ? 'Required' : undefined }}>
          {(field) => (
            <FormItem field={field} label="Sandbox name" required>
              {(f) => (
                <Input
                  value={f.state.value}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  placeholder="my-sandbox"
                />
              )}
            </FormItem>
          )}
        </form.Field>
        <div style={{ marginTop: 16 }}>
          <Button type="submit" size="sm">Create</Button>
        </div>
      </form>
      {submitted && (
        <p style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
          Submitted: {submitted}
        </p>
      )}
    </div>
  );
}
