import { Banner, BannerContent, BannerTitle, BannerDescription } from '@talon-sandbox/react';

// Banner 三档尺寸
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <Banner size="sm" variant="info">
        <BannerContent>
          <BannerDescription>紧凑模式 · 用于 toolbar 下方或卡片内。</BannerDescription>
        </BannerContent>
      </Banner>
      <Banner variant="info">
        <BannerContent>
          <BannerDescription>标准 · 用于路由顶部。</BannerDescription>
        </BannerContent>
      </Banner>
      <Banner size="lg" variant="info">
        <BannerContent>
          <BannerTitle>宽松 · 用于登录、空状态页</BannerTitle>
          <BannerDescription>扩展尺寸支持更大的视觉权重。</BannerDescription>
        </BannerContent>
      </Banner>
    </div>
  );
}
