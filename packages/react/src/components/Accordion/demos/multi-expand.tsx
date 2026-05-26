import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionSubtitle,
  Alert,
  Button,
  FormField,
  FormLabel,
  FormControl,
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
  Switch,
} from '@talon-sandbox/react';

// 折叠面板 - 多展开模式
export default function Demo() {
  return (
    <div style={{ maxWidth: 480 }}>
      <Accordion type="multiple" defaultValue={['cpu', 'net']}>
        <AccordionItem value="cpu">
          <AccordionTrigger>
            <span className="tln-acc-title">资源配额</span>
            <AccordionSubtitle>CPU · MEM · DISK</AccordionSubtitle>
          </AccordionTrigger>
          <AccordionContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <FormField horizontal>
                <FormLabel>CPU</FormLabel>
                <FormControl>
                  <Slider min={1} max={16} defaultValue={[4]}>
                    <SliderTrack><SliderRange /></SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </FormField>
              <FormField horizontal>
                <FormLabel>MEM</FormLabel>
                <FormControl>
                  <Slider min={0} max={128} step={4} defaultValue={[8]}>
                    <SliderTrack><SliderRange /></SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </FormField>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="net">
          <AccordionTrigger>
            <span className="tln-acc-title">网络</span>
            <AccordionSubtitle>2 条规则</AccordionSubtitle>
          </AccordionTrigger>
          <AccordionContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Switch defaultChecked />
                <span style={{ fontSize: 13 }}>允许 egress</span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Switch />
                <span style={{ fontSize: 13 }}>开放入站端口</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sec">
          <AccordionTrigger>
            <span className="tln-acc-title">凭据 · 安全</span>
            <AccordionSubtitle>AUTO-ROTATE</AccordionSubtitle>
          </AccordionTrigger>
          <AccordionContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Alert variant="warn">凭据 7 天后过期</Alert>
              <Button size="sm" leadIcon="refresh">立即轮换</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
