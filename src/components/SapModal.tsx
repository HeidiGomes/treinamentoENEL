import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SapModalProps {
  onClose: () => void;
}

export default function SapModal({ onClose }: SapModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[1200px] h-[800px] flex flex-col">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/sap-logo.png" alt="SAP Logo" className="h-8" />
            <h2 className="text-xl font-semibold text-gray-900">SAP - Interaction Center</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 p-6">
          {error ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-red-50 text-red-800 p-4 rounded-lg max-w-md text-center">
                <p className="font-medium">Erro ao carregar o SAP</p>
                <p className="text-sm mt-1">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src="about:blank" // Replace with actual SAP URL in production
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setError('Não foi possível carregar a interface do SAP. Por favor, tente novamente mais tarde.');
              }}
            />
          )}

          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}