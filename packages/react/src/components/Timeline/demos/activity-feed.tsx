import { Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineTitle, TimelineTime, TimelineDesc } from '@talon-sandbox/react';

// 活动流时间线，降序排列
export default function Demo() {
  const items = [
    { kind: 'ok' as const,   title: 'sandbox 启动',   time: '2h 14m ago', desc: 'sb_42a1b3 · ghcr.io/talon/base:v3 · eu-west-1' },
    { kind: 'info' as const, title: 'image 拉取完成',  time: '2h 18m ago', desc: '2.4 GiB · 4 layers · 56s' },
    { kind: 'warn' as const, title: 'CPU 持续 > 90%', time: '2h 30m ago', desc: '12 分钟内，触发自动扩容' },
    { kind: 'acc' as const,  title: 'shell PTY 启动', time: '2h 45m ago', desc: 'asciinema 录像已开启' },
    { kind: 'err' as const,  title: '健康检查失败',    time: '3h 02m ago', desc: 'probe timeout 5s · 重试 3 次' },
    { kind: 'default' as const, title: 'sandbox 调度', time: '3h 10m ago', desc: 'placement: worker-12, region: eu-west-1' },
  ];
  return (
    <div style={{ maxWidth: 480 }}>
      <Timeline>
        {items.map((item, i) => (
          <TimelineItem key={i} kind={item.kind}>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>
                {item.title}
                <TimelineTime>{item.time}</TimelineTime>
              </TimelineTitle>
              <TimelineDesc>{item.desc}</TimelineDesc>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
