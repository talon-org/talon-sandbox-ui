import { Stepper, StepperStep, StepperStepLabel, StepperStepDesc } from '@talon-sandbox/react';

// 竖向步骤，用于详情面板内嵌进度
export default function Demo() {
  return (
    <div style={{ width: 280 }}>
      <Stepper vertical current={1}>
        <StepperStep>
          <StepperStepLabel>镜像已拉取</StepperStepLabel>
          <StepperStepDesc>2.4 GiB · 4m 12s</StepperStepDesc>
        </StepperStep>
        <StepperStep>
          <StepperStepLabel>正在调度</StepperStepLabel>
          <StepperStepDesc>us-east-1 · worker-12</StepperStepDesc>
        </StepperStep>
        <StepperStep>
          <StepperStepLabel>健康检查</StepperStepLabel>
          <StepperStepDesc>WAITING</StepperStepDesc>
        </StepperStep>
        <StepperStep>
          <StepperStepLabel>运行中</StepperStepLabel>
          <StepperStepDesc>PENDING</StepperStepDesc>
        </StepperStep>
      </Stepper>
    </div>
  );
}
