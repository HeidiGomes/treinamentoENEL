import React, { useState } from 'react';
import { Activity, AlertTriangle, Check, X, ChevronDown } from 'lucide-react';
import type { SupplyPoint, EmergencyFormData } from '../types';
import EmergencyDetailsForm from './EmergencyDetailsForm';
import SapModal from './SapModal';

interface SupplyPointCardProps {
  supplyPoint: SupplyPoint;
}

export default function SupplyPointCard({ supplyPoint }: SupplyPointCardProps) {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showSapModal, setShowSapModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<EmergencyFormData>({
    clientReport: '',
    supplyFailureScope: '',
    vitalClientStatus: '',
    observations: '',
    status: 'Em Criação',
    openingDateTime: new Date().toISOString(),
    company: 'Enel Distribuição Ceará',
    equipment: '',
    batteryAutonomy: '',
    urgentReason: '',
    priority: '',
    urgentData: '',
    originChannel: 'CALL_CENTER',
    subChannel: '',
    ownerID: 'IGOR NEVES DE SANTANA',
    contactName: '',
    contactPhone: '',
  });

  const validateStep = () => {
    setError('');
    switch (currentStep) {
      case 1:
        if (!formData.clientReport) {
          setError('Por favor, selecione uma opção');
          return false;
        }
        break;
      case 2:
        if (!formData.supplyFailureScope) {
          setError('Por favor, selecione uma opção');
          return false;
        }
        break;
      case 3:
        if (!formData.vitalClientStatus) {
          setError('Por favor, selecione uma opção');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep === 3) {
      setCurrentStep(4);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setShowEmergencyModal(false);
    setCurrentStep(1);
    setError('');
  };

  const handleSapAccess = () => {
    window.open('https://heidigomes.github.io/Saptreinamento/', '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-gray-900 mb-4">
              Qual relato/reclamação do cliente?
            </h2>
            {[
              'Falta de Luz/Fase (Local ou Trecho)',
              'Intermitência/Oscilação de energia (variação de tensão)',
              'Situação de Risco (Acidentes/Incêndio/Fio partido/Árvore na rede/outros)',
              'Rede/Equipamento danificado ou outras situações de emergência',
              'Cancelamento a pedido (instalação normalizada)',
              'Informações sobre desligamento programado atual ou futuro',
              'Consumidor Especial',
              'Reclamações Comerciais (Fora do horário)',
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="clientReport"
                  value={option}
                  checked={formData.clientReport === option}
                  onChange={(e) => setFormData({ ...formData, clientReport: e.target.value })}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-gray-900 mb-4">
              A falha de fornecimento é trecho ou local?
            </h2>
            {[
              'Sim, apenas na instalação informada',
              'Não, afeta os vizinhos também',
              'Falta de energia em Cliente Vital/Sobrevida',
              'Não é possível identificar',
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="supplyFailureScope"
                  value={option}
                  checked={formData.supplyFailureScope === option}
                  onChange={(e) => setFormData({ ...formData, supplyFailureScope: e.target.value })}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-gray-900 mb-4">
              Qual situação do cadastro do cliente vital?
            </h2>
            {[
              'Cliente Vital Cadastrado',
              'Cliente Vital Não Cadastrado',
            ].map((option) => (
              <label key={option} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="vitalClientStatus"
                  value={option}
                  checked={formData.vitalClientStatus === option}
                  onChange={(e) => setFormData({ ...formData, vitalClientStatus: e.target.value })}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </div>
        );
      case 4:
        return <EmergencyDetailsForm formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header Section */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-md">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Ponto de Fornecimento {supplyPoint.id}
                </h3>
                <p className="text-sm text-gray-600">{supplyPoint.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-md border border-blue-100"
                onClick={() => {}}
              >
                Seguir
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-md border border-blue-100"
                onClick={() => {}}
              >
                Adesão Autoleitura
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-md border border-blue-100"
                onClick={() => {}}
              >
                Criar Contato
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-md border border-blue-100"
                onClick={() => {}}
              >
                INF - Aviso Emergencial
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-md border border-blue-100"
                onClick={() => {}}
              >
                Desligamento Programado
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-md border border-blue-100"
                onClick={handleSapAccess}
                aria-label="Acessar interface do SAP"
              >
                Acessar SAP
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                onClick={() => setShowEmergencyModal(true)}
              >
                Criar Emergência
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="border-r border-gray-200 pr-4">
              <div className="text-sm text-gray-600">Status do Ponto de Fornecimento</div>
              <div className="mt-1 flex items-center">
                <span className="inline-flex items-center text-sm font-medium text-green-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Com Fornecimento
                </span>
              </div>
            </div>
            <div className="border-r border-gray-200 pr-4">
              <div className="text-sm text-gray-600">Contrato Ativo</div>
              <div className="mt-1 flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm font-medium">Ativo</span>
              </div>
            </div>
            <div className="border-r border-gray-200 pr-4">
              <div className="text-sm text-gray-600">Cliente Prioritário</div>
              <div className="mt-1 flex items-center">
                <X className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium">Sem marcação</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Emergência Ativa</div>
              <div className="mt-1 flex items-center">
                <X className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-sm font-medium">Não</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentStep === 4 ? 'Edição de caso' : 'Criação de Emergência'}
              </h3>
            </div>
            <div className="p-6">
              {renderStep()}
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
              <button 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
                onClick={() => {
                  if (currentStep === 1) {
                    setShowEmergencyModal(false);
                  } else {
                    handleBack();
                  }
                }}
              >
                {currentStep === 1 ? 'Cancelar' : 'Voltar'}
              </button>
              {currentStep === 4 ? (
                <div className="flex space-x-2">
                  <button 
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
                    onClick={() => setShowEmergencyModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-md border border-blue-100"
                    onClick={handleSubmit}
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <button 
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                  onClick={handleNext}
                >
                  Próximo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}