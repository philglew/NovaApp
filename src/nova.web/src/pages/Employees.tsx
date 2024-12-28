import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TreeItem from '../components/employees/TreeItem';
import { Employee, TreeItem as TreeItemType } from '../types/employee';
import Modal from '../components/common/Modal';
import AddEmployeeForm from '../components/employees/AddEmployeeForm';

// Mock data - replace with API call
const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    position: 'CEO',
    department: 'Executive',
    managerId: null,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    position: 'CTO',
    department: 'Engineering',
    managerId: '1',
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    position: 'Engineering Manager',
    department: 'Engineering',
    managerId: '2',
  },
];

const buildTree = (
  employees: Employee[],
  managerId: string | null = null
): TreeItemType[] => {
  return employees
    .filter(emp => emp.managerId === managerId)
    .map(emp => ({
      id: emp.id,
      children: buildTree(employees, emp.id),
      data: emp,
      collapsed: false,
    }));
};

const flattenTree = (items: TreeItemType[]): TreeItemType[] => {
  return items.reduce<TreeItemType[]>((flat, item) => {
    if (item.collapsed) {
      return [...flat, item];
    }
    return [...flat, item, ...flattenTree(item.children)];
  }, []);
};

const Employees: React.FC = () => {
  const [items, setItems] = useState<TreeItemType[]>(buildTree(mockEmployees));
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Get unique departments from existing employees
  const departments = Array.from(new Set(mockEmployees.map(emp => emp.department)));

  // Get all employees that can be managers
  const potentialManagers = mockEmployees;

  const flattenedItems = flattenTree(items);
  const filteredItems = searchQuery
    ? flattenedItems.filter(item => 
        `${item.data.firstName} ${item.data.lastName} ${item.data.position}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : flattenedItems;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeItem = flattenedItems.find(item => item.id === active.id);
    const overItem = flattenedItems.find(item => item.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    // Collect all employees from the tree structure
    const getAllEmployees = (items: TreeItemType[]): Employee[] => {
      return items.reduce<Employee[]>((acc, item) => {
        return [...acc, item.data, ...getAllEmployees(item.children)];
      }, []);
    };

    // Update the managerId in your data structure
    const allEmployees = getAllEmployees(items);
    const updatedEmployees = allEmployees.map(emp => {
      if (emp.id === activeItem.data.id) {
        return { ...emp, managerId: overItem.data.id };
      }
      return emp;
    });

    setItems(buildTree(updatedEmployees));
  };

  const handleCollapse = (itemId: string) => {
    const updateCollapsed = (items: TreeItemType[]): TreeItemType[] => {
      return items.map(item => {
        if (item.id === itemId) {
          return { ...item, collapsed: !item.collapsed };
        }
        return {
          ...item,
          children: updateCollapsed(item.children),
        };
      });
    };

    setItems(updateCollapsed(items));
  };

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    // In a real app, this would be an API call
    const newEmployee: Employee = {
      ...employeeData,
      id: `emp-${Date.now()}`, // Generate a unique ID (use proper UUID in production)
    };

    mockEmployees.push(newEmployee);
    setItems(buildTree(mockEmployees));
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Employee Hierarchy</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Employee
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredItems.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredItems.map((item) => (
              <TreeItem
                key={item.id}
                item={item}
                depth={0}
                onCollapse={handleCollapse}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Employee"
      >
        <AddEmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={() => setIsAddModalOpen(false)}
          managers={potentialManagers}
          departments={departments}
        />
      </Modal>
    </div>
  );
};

export default Employees;