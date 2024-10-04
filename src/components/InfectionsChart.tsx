'use client';

import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import { Chart } from '@antv/g2';

import type { api } from '~/trpc/server';

type Infections = Awaited<ReturnType<typeof api.covid.infections>>;

function renderBarChart(container: HTMLElement, data: Infections = []) {
  const chart = new Chart({
    autoFit: true,
    height: 400,
    padding: 50,
    container,
  });

  // Declare visualization
  chart
    .interval() // Create an Interval tag
    .data(data) // Bind data
    .encode('x', 'date') // Encode x channel
    .encode('y', 'infected') // Encode y channel
    .encode('key', 'date'); // Specify key

  // Render visualization
  void chart.render();

  return chart;
}

export const InfectionsChart: FC<{
  infections: Infections;
}> = ({ infections }) => {
  const containerReference = useRef<HTMLDivElement>(null);
  const chart = useRef<Chart>();
  useEffect(() => {
    if (!chart.current && containerReference.current) {
      chart.current = renderBarChart(containerReference.current, infections);
    }
  }, [infections]);

  return (
    <div
      className="h-[400px]"
      ref={containerReference}
    ></div>
  );
};
