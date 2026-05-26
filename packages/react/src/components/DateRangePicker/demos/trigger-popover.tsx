import { useState } from 'react';
import { DateRangePicker } from '@talon-sandbox/react';

// 日期范围：trigger + popover + 预设
const today = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

const presets = [
  { label: '今天', range: [today(), today()] as [Date, Date] },
  { label: '最近 7 天', range: [new Date(Date.now() - 6 * 86400000), new Date()] as [Date, Date] },
  { label: '最近 30 天', range: [new Date(Date.now() - 29 * 86400000), new Date()] as [Date, Date] },
  { label: '本月', range: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()] as [Date, Date] },
];

export default function Demo() {
  const [range, setRange] = useState<[Date, Date]>([
    new Date(Date.now() - 6 * 86400000),
    new Date(),
  ]);

  return <DateRangePicker value={range} onValueChange={setRange} presets={presets} />;
}
