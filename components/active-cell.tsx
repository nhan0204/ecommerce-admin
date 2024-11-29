import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

interface ActiveCellProps { 
  isActive: boolean;
}

const ActiveCell: React.FC<ActiveCellProps> = ({ isActive }) => {
  const {theme} = useTheme();

  return isActive ? (
    <Check
      size={16}
      className={cn(
        "font-bold",
        theme === "dark" ? "text-white" : "text-gray-900"
      )}
    />
  ) : (
    <X
      size={16}
      className={cn(
        "font-bold",
        theme === "dark" ? "text-white" : "text-gray-900"
      )}
    />
  );
};

export default ActiveCell;