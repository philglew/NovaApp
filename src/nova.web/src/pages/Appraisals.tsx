import React from 'react';

const Appraisals: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Appraisals</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          New Appraisal
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Sample Appraisal Cards */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Annual Review 2024</h3>
                <p className="text-sm text-gray-500">John Doe</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Pending
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <p>Due: March 15, 2024</p>
              <p>Manager: Jane Smith</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Mid-Year Review 2023</h3>
                <p className="text-sm text-gray-500">Bob Johnson</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Completed
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <p>Completed: July 1, 2023</p>
              <p>Manager: Jane Smith</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appraisals;