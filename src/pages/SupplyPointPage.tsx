import React from 'react';
import SupplyPointCard from '../components/SupplyPointCard';

const mockSupplyPoint = {
  id: '10382789',
  address: 'JOSE LIRA SOARES 576',
  status: 'active' as const,
  isPriority: false,
  hasEmergency: false,
  lastReading: 1234.56,
  lastReadingDate: '2024-03-15',
};

export default function SupplyPointPage() {
  return (
    <>
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Início
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  Pontos de Fornecimento
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm font-medium text-gray-500">
                  {mockSupplyPoint.id}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <SupplyPointCard supplyPoint={mockSupplyPoint} />
    </>
  );
}