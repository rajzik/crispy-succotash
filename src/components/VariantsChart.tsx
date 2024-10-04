'use client';

import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import { Chart } from '@antv/g2';

import type { api } from '~/trpc/server';

type Variants = Awaited<ReturnType<typeof api.covid.variants>>;

function renderBarChart(container: HTMLElement, data: Variants = []) {
  const chart = new Chart({
    autoFit: true,
    height: 400,
    padding: 50,
    container,
  });
  chart.coordinate({ type: 'theta', outerRadius: 0.8, innerRadius: 0.5 });

  // Declare visualization
  chart
    .interval()
    .data(data)
    .transform({ type: 'stackY' })
    .encode('y', 'percent')
    .encode('color', 'variant')
    .legend('color', {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    })
    .tooltip((data: Exclude<Variants, undefined>[number]) => ({
      name: data.variant,
      value: `${data.percent * 100}%`,
    }));

  // Render visualization
  void chart.render();

  return chart;
}

export const VariantsChart: FC<{
  variants: Variants;
}> = ({ variants }) => {
  const containerReference = useRef<HTMLDivElement>(null);
  const chart = useRef<Chart>();
  useEffect(() => {
    if (!chart.current && containerReference.current) {
      chart.current = renderBarChart(containerReference.current, variants);
    }
  }, [variants]);

  return (
    <div
      className="h-[400px]"
      ref={containerReference}
    />
  );
};
