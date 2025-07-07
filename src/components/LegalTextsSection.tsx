
import React from 'react';
import { LegalTextsTabs } from './LegalTextsTabs';

interface LegalTextsSectionProps {
  section?: string;
}

export function LegalTextsSection({ section = 'legal-catalog' }: LegalTextsSectionProps) {
  return <LegalTextsTabs section={section} />;
}
