import { Stat, StatLabel, StatValue, StatDelta, Sparkline, Card, CardContent, Flex, Grid } from '@talon-sandbox/react';

// 卡片内嵌 sparkline 的仪表盘示例
export default function Demo() {
  const series = [
    { l: 'RUNNING', v: '1,248', dk: 'up' as const, dv: '+12.4%', c: 'var(--ok)', data: [3,5,4,7,9,8,12,15,13,18,22,20,24,28,26,30] },
    { l: 'CPU UTIL', v: '64%', dk: 'up' as const, dv: '+3pp', c: 'var(--acc-strong)', data: [50,48,55,60,58,62,64,66,64,68,64,67,62,64] },
    { l: 'FAILED · 24H', v: '12', dk: 'down' as const, dv: '+4', c: 'var(--err)', data: [4,3,2,5,3,8,6,9,12] },
  ];
  return (
    <Grid cols={3} gap={14}>
      {series.map((s, i) => (
        <Card key={i}>
          <CardContent>
            <Flex justify="between" align="center">
              <Stat>
                <StatLabel>{s.l}</StatLabel>
                <StatValue>{s.v}</StatValue>
                <StatDelta kind={s.dk}>{s.dv}</StatDelta>
              </Stat>
              <Sparkline data={s.data} height={42} color={s.c} style={{ width: 110 }} />
            </Flex>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}
