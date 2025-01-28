export interface ViewButtonProps {
    name:string;
    isActive:boolean;
    icon: React.ReactNode;
    onClick: () => void;
}

export const ViewToggle = ({ name, icon, isActive, onClick }: ViewButtonProps) => {
    
    return (
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button
          onClick={onClick}
          className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive?"bg-white dark:bg-gray-900 text-blue-500 dark:text-blue-400":"text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-900/50 transition-colors"} shadow-sm`}
        >
          {icon}
          <span className="text-sm font-medium">{name}</span>
        </button>
      </div>
    );
  };