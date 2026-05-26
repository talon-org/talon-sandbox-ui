import { useState } from 'react';
import { Calendar } from '@talon-sandbox/react';

// 单日期选择
export default function Demo() {
  const [date, setDate] = useState(new Date());
  return <Calendar value={date} onSelect={setDate} />;
}
