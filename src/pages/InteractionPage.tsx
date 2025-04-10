import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function InteractionPage() {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Identificação</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Procurar
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Procurar por negócio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nº BP
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome/Rag. Social
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sobrenome/Razão
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título/Código
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Região
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rua
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  className="w-24 p-2 border border-gray-300 rounded-md"
                  placeholder="Localizar"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CEP
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado/I
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  className="w-24 p-2 border border-gray-300 rounded-md"
                  placeholder="BR"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
              Prev.
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
              Atual
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
              Criar Pessoa Física
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
              Novo
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900 mb-4">Lista de resultados</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <select className="w-full p-2 border border-gray-300 rounded-md mb-2">
                  <option>Dados mestre corporativo</option>
                </select>
                <div className="border border-gray-300 rounded-md h-48"></div>
              </div>
              <div>
                <select className="w-full p-2 border border-gray-300 rounded-md mb-2">
                  <option>Dados mestre Médicos</option>
                </select>
                <div className="border border-gray-300 rounded-md h-48"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}