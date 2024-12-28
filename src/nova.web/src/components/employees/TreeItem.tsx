import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TreeItem } from '../../types/employee';

interface Props {
  item: TreeItem;
  depth: number;
  onCollapse?: (id: string) => void;
}

const TreeItemComponent: React.FC<Props> = ({ item, depth, onCollapse }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginLeft: `${depth * 24}px`,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center p-2 my-1 bg-white rounded-lg border ${
        isDragging ? 'border-blue-500 shadow-lg' : 'border-gray-200'
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center flex-1 cursor-grab"
      >
        {item.children.length > 0 && (
          <button
            onClick={() => onCollapse?.(item.id)}
            className="mr-2 text-gray-500 hover:text-gray-700"
          >
            {item.collapsed ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
        )}
        
        <div className="flex items-center flex-1">
          <img
            src={item.data.imageUrl || `https://ui-avatars.com/api/?name=${item.data.firstName}+${item.data.lastName}`}
            alt={`${item.data.firstName} ${item.data.lastName}`}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <div className="font-medium">
              {item.data.firstName} {item.data.lastName}
            </div>
            <div className="text-sm text-gray-500">
              {item.data.position}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 ml-4">
          {item.data.department}
        </div>
      </div>
    </div>
  );
};

export default TreeItemComponent;