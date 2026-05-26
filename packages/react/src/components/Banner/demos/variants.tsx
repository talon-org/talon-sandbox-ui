import { useState } from 'react';
import { Banner, BannerIcon, BannerContent, BannerTitle, BannerDescription, BannerActions, BannerDismiss, Button } from '@talon-sandbox/react';

// Banner 各种语义 variant
export default function Demo() {
  const [errShown, setErrShown] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <Banner variant="info">
        <BannerIcon />
        <BannerContent>
          <BannerTitle>新版本 v0.3 可用</BannerTitle>
          <BannerDescription><strong>v0.3</strong> 加入了 worker autoscaling 与 image cache。当前实例可平滑升级。</BannerDescription>
          <BannerActions>
            <Button size="sm" variant="ghost">查看更新</Button>
            <Button size="sm" variant="primary">升级</Button>
          </BannerActions>
        </BannerContent>
        <BannerDismiss onClick={() => {}} />
      </Banner>

      <Banner variant="warn">
        <BannerIcon />
        <BannerContent>
          <BannerTitle>配额接近上限</BannerTitle>
          <BannerDescription><strong>team-finance</strong> 本月已使用 <strong>84%</strong> 的 sandbox-hour 配额。</BannerDescription>
          <BannerActions><Button size="sm" variant="default">查看用量</Button></BannerActions>
        </BannerContent>
        <BannerDismiss onClick={() => {}} />
      </Banner>

      {errShown && (
        <Banner variant="err">
          <BannerIcon />
          <BannerContent>
            <BannerTitle>image registry 不可达</BannerTitle>
            <BannerDescription>ghcr.io 在过去 4m 出现 <strong>12</strong> 次连续拉取失败。</BannerDescription>
            <BannerActions>
              <Button size="sm" variant="ghost">查看日志</Button>
              <Button size="sm" variant="default">重试</Button>
            </BannerActions>
          </BannerContent>
          <BannerDismiss onClick={() => setErrShown(false)} />
        </Banner>
      )}

      <Banner variant="ok">
        <BannerIcon />
        <BannerContent>
          <BannerTitle>所有 worker 已通过健康检查</BannerTitle>
          <BannerDescription>32 个 worker 节点全部 RUNNING · 平均负载 0.42。</BannerDescription>
        </BannerContent>
      </Banner>

      <Banner variant="magenta">
        <BannerIcon />
        <BannerContent>
          <BannerTitle>凭据将在 7 天后过期</BannerTitle>
          <BannerDescription>tlk_pmsk_***f2a1 · 创建于 90 天前。</BannerDescription>
          <BannerActions><Button size="sm" variant="default">轮换</Button></BannerActions>
        </BannerContent>
      </Banner>
    </div>
  );
}
