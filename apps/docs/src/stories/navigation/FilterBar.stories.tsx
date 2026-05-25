/**
 * FilterBar — pill filter groups, optional search input, and actions slot.
 * Stateless — caller owns the active filter value.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { useState } from 'react';
import { FilterBar, Button } from '@talon-sandbox/react';

export default {
  title: 'Navigation/FilterBar',
} satisfies StoryDefault;

export const Default: Story = () => {
  const [filter, setFilter] = useState('all');
  return (
    <div style={{ padding: 16 }}>
      <FilterBar
        value={filter}
        onChange={setFilter}
        groups={[{
          items: [
            { value: 'all', label: 'All', count: 42 },
            { value: 'running', label: 'Running', count: 24 },
            { value: 'stopped', label: 'Stopped', count: 15 },
            { value: 'error', label: 'Error', count: 3 },
          ],
        }]}
      />
    </div>
  );
};

export const WithSearch: Story = () => {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  return (
    <div style={{ padding: 16 }}>
      <FilterBar
        value={filter}
        onChange={setFilter}
        groups={[{
          items: [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ],
        }]}
        search={{ value: query, onChange: setQuery, placeholder: 'Search sandboxes…' }}
      />
    </div>
  );
};

export const WithGroupLabels: Story = () => {
  const [filter, setFilter] = useState('all');
  return (
    <div style={{ padding: 16 }}>
      <FilterBar
        value={filter}
        onChange={setFilter}
        groups={[
          {
            label: 'Status',
            items: [
              { value: 'all', label: 'All' },
              { value: 'running', label: 'Running' },
              { value: 'stopped', label: 'Stopped' },
            ],
          },
          {
            label: 'Region',
            items: [
              { value: 'us', label: 'US' },
              { value: 'eu', label: 'EU' },
              { value: 'ap', label: 'APAC' },
            ],
          },
        ]}
      />
    </div>
  );
};

export const WithActions: Story = () => {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  return (
    <div style={{ padding: 16 }}>
      <FilterBar
        value={filter}
        onChange={setFilter}
        groups={[{
          items: [
            { value: 'all', label: 'All', count: 42 },
            { value: 'running', label: 'Running', count: 24 },
          ],
        }]}
        search={{ value: query, onChange: setQuery }}
        actions={<Button variant="primary" size="sm">+ New sandbox</Button>}
      />
    </div>
  );
};
