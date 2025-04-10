import React from 'react';
import { Home, Zap, FileText, AlertTriangle, Users, BarChart2, Settings } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard' },
  { icon: Zap, label: 'Pontos de Fornecimento' },
  { icon: FileText, label: 'Faturamento' },
  { icon: AlertTriangle, label: 'Ocorrências' },
  { icon: Users, label: 'Clientes' },
  { icon: BarChart2, label: 'Relatórios' },
  { icon: Settings, label: 'Configurações' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white pt-16">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}