/**
 * FormSection / FormGrid — layout primitives for forms.
 * FormSection: titled section with optional icon and hint.
 * FormGrid: 1 or 2-column responsive grid for form fields.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { FormSection, FormGrid, Input, Select, Textarea, Button } from '@talon-sandbox/react';

export default {
  title: 'Forms/FormSection',
} satisfies StoryDefault;

const FieldWrap = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)' }}>{label}</label>
    {children}
  </div>
);

export const Basic: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <FormSection title="General">
      <FormGrid>
        <FieldWrap label="Name"><Input placeholder="my-sandbox" /></FieldWrap>
        <FieldWrap label="Region">
          <Select defaultValue="us-east-1">
            <option value="us-east-1">us-east-1</option>
            <option value="eu-west-1">eu-west-1</option>
          </Select>
        </FieldWrap>
      </FormGrid>
    </FormSection>
  </div>
);

export const WithIconAndHint: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <FormSection icon="⚙" title="Runtime config" hint="(optional)">
      <FormGrid>
        <FieldWrap label="CPU (vCPU)"><Input type="number" defaultValue="2" /></FieldWrap>
        <FieldWrap label="Memory (MiB)"><Input type="number" defaultValue="512" /></FieldWrap>
      </FormGrid>
    </FormSection>
  </div>
);

export const SingleColumn: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <FormSection title="Description">
      <FormGrid cols={1}>
        <FieldWrap label="Notes">
          <Textarea placeholder="Describe the purpose of this sandbox…" rows={4} />
        </FieldWrap>
      </FormGrid>
    </FormSection>
  </div>
);

export const FullForm: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <form style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <FormSection title="Identity">
        <FormGrid>
          <FieldWrap label="Name"><Input placeholder="my-sandbox" /></FieldWrap>
          <FieldWrap label="Region">
            <Select defaultValue="us-east-1">
              <option value="us-east-1">us-east-1</option>
              <option value="eu-west-1">eu-west-1</option>
            </Select>
          </FieldWrap>
        </FormGrid>
      </FormSection>

      <FormSection icon="📦" title="Image">
        <FormGrid cols={1}>
          <FieldWrap label="Base image">
            <Input mono placeholder="ubuntu:22.04" />
          </FieldWrap>
        </FormGrid>
      </FormSection>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="primary" type="submit">Create</Button>
        <Button variant="ghost" type="button">Cancel</Button>
      </div>
    </form>
  </div>
);
