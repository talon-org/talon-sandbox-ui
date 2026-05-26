import { Stepper, StepperStep, StepperStepLabel, StepperStepDesc, Button } from '@talon-sandbox/react';
import { useState } from 'react';

// 水平方向步骤，两档尺寸，带上下步按钮
export default function Demo() {
  const [step, setStep] = useState(2);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%' }}>
      {/* sm */}
      <Stepper size="sm" current={step}>
        <StepperStep><StepperStepLabel>基础信息</StepperStepLabel></StepperStep>
        <StepperStep><StepperStepLabel>资源配额</StepperStepLabel></StepperStep>
        <StepperStep><StepperStepLabel>网络与凭据</StepperStepLabel></StepperStep>
        <StepperStep><StepperStepLabel>审阅 &amp; 启动</StepperStepLabel></StepperStep>
      </Stepper>
      {/* md */}
      <Stepper current={step}>
        <StepperStep>
          <StepperStepLabel>基础信息</StepperStepLabel>
          <StepperStepDesc>NAME · IMAGE</StepperStepDesc>
        </StepperStep>
        <StepperStep>
          <StepperStepLabel>资源配额</StepperStepLabel>
          <StepperStepDesc>CPU · MEM · DISK</StepperStepDesc>
        </StepperStep>
        <StepperStep>
          <StepperStepLabel>网络与凭据</StepperStepLabel>
          <StepperStepDesc>EGRESS · SECRETS</StepperStepDesc>
        </StepperStep>
        <StepperStep>
          <StepperStepLabel>审阅 &amp; 启动</StepperStepLabel>
          <StepperStepDesc>REVIEW</StepperStepDesc>
        </StepperStep>
      </Stepper>
      {/* 步骤控制按钮 */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => setStep(s => Math.max(0, s - 1))}>← 上一步</Button>
        <Button variant="primary" onClick={() => setStep(s => Math.min(3, s + 1))}>下一步 →</Button>
      </div>
    </div>
  );
}
