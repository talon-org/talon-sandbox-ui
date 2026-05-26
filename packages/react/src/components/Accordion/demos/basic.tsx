import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionSubtitle,
} from '@talon-sandbox/react';

// Accordion 多展开模式演示
export default function Demo() {
  return (
    <div style={{ maxWidth: 480 }}>
      <Accordion type="multiple" defaultValue={['a']}>
        <AccordionItem value="a">
          <AccordionTrigger>
            <span className="tln-acc-title">基本信息</span>
            <AccordionSubtitle>NAME · IMAGE</AccordionSubtitle>
          </AccordionTrigger>
          <AccordionContent>
            <p>设置容器名称、基础镜像和描述信息。</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>
            <span className="tln-acc-title">资源配置</span>
            <AccordionSubtitle>CPU · MEM</AccordionSubtitle>
          </AccordionTrigger>
          <AccordionContent>
            <p>配置 CPU 核心数和内存上限。</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="c" disabled>
          <AccordionTrigger>
            <span className="tln-acc-title">高级设置（禁用）</span>
          </AccordionTrigger>
          <AccordionContent>
            <p>高级网络与安全策略。</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
