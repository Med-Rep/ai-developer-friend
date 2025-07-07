
import React from 'react';
import { ProceduresTabs } from './ProceduresTabs';

interface ProceduresSectionProps {
  section?: string;
}

export function ProceduresSection({ section = 'procedures-catalog' }: ProceduresSectionProps) {
  return <ProceduresTabs section={section} />;
}
