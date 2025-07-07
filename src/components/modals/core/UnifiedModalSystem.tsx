
import React from 'react';
import { useModals } from '@/hooks/useModals';
import { UnifiedModal } from '../UnifiedModal';
import { AdvancedSearchModal } from '../AdvancedSearchModal';
import { AlertManagementModal } from '../AlertManagementModal';
import { ApprovalModal } from '../../ApprovalModal';
import { ProcedureSummaryModal } from '../../ProcedureSummaryModal';

export function UnifiedModalSystem() {
  const { modals, closeModal } = useModals();

  return (
    <>
      {/* Modal de recherche avancée */}
      <AdvancedSearchModal
        isOpen={modals.advancedSearch.isOpen}
        onClose={() => closeModal('advancedSearch')}
        onSearch={(criteria) => {
          console.log('Critères de recherche:', criteria);
          closeModal('advancedSearch');
        }}
      />

      {/* Modal de gestion d'alertes */}
      <AlertManagementModal
        isOpen={modals.alertManagement.isOpen}
        onClose={() => closeModal('alertManagement')}
        alert={modals.alertManagement.alert}
        onSave={(alertData) => {
          console.log('Alerte sauvegardée:', alertData);
          closeModal('alertManagement');
        }}
      />

      {/* Modal d'approbation */}
      <ApprovalModal
        isOpen={modals.approval?.isOpen || false}
        onClose={() => closeModal('approval')}
        onApprove={(comment) => {
          console.log('Approuvé avec commentaire:', comment);
          closeModal('approval');
        }}
        onReject={(reason) => {
          console.log('Rejeté avec raison:', reason);
          closeModal('approval');
        }}
        data={modals.approval?.data}
        type={modals.approval?.type || 'legal-text'}
      />

      {/* Modal de résumé de procédure */}
      <ProcedureSummaryModal
        isOpen={modals.procedureSummary?.isOpen || false}
        onClose={() => closeModal('procedureSummary')}
        onAddAnother={() => {
          closeModal('procedureSummary');
          // Logique pour ajouter une autre procédure
        }}
        procedureData={modals.procedureSummary?.data}
      />

      {/* Modal générique unifiée pour les cas simples */}
      <UnifiedModal
        isOpen={modals.generic?.isOpen || false}
        onClose={() => closeModal('generic')}
        title={modals.generic?.title || 'Modal'}
        size={modals.generic?.size || 'medium'}
        primaryAction={modals.generic?.primaryAction}
        secondaryAction={modals.generic?.secondaryAction}
        alert={modals.generic?.alert}
        loading={modals.generic?.loading}
      >
        {modals.generic?.content}
      </UnifiedModal>
    </>
  );
}
