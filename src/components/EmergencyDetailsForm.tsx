import React from 'react';
import type { EmergencyFormData } from '../types';

interface EmergencyDetailsFormProps {
  formData: EmergencyFormData;
  setFormData: (data: EmergencyFormData) => void;
}

export default function EmergencyDetailsForm({ formData, setFormData }: EmergencyDetailsFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Dados de Emergência</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivo
            </label>
            <select
              name="urgentReason"
              value={formData.urgentReason}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Nenhum --</option>
              <option value="FALTA_CLIENTE_VITAL">FALTA EM CLIENTE VITAL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Equipamento Utilizado
            </label>
            <select
              name="equipment"
              value={formData.equipment}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Nenhum --</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo de autonomia da bateria
            </label>
            <select
              name="batteryAutonomy"
              value={formData.batteryAutonomy}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Nenhum --</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Priorizar</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivo Urgente
            </label>
            <select
              name="urgentReason"
              value={formData.urgentReason}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Nenhum --</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioridade
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Nenhum --</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Informações sobre o caso</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Canal de Origem
            </label>
            <select
              name="originChannel"
              value={formData.originChannel}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="CALL_CENTER">CALL CENTER</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Canal
            </label>
            <select
              name="subChannel"
              value={formData.subChannel}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Nenhum --</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Identificação</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Contato
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone do Contato
            </label>
            <input
              type="text"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}