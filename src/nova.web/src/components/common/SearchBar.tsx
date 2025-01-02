import React, { useState, useEffect, useRef } from 'react';
import employeeService from '../../services/api/employeeService';
import { Employee } from '../../types/employee';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Add search endpoint to employeeService
    useEffect(() => {
        const searchEmployees = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const data = await employeeService.searchEmployees(query);
                setResults(data);
            } catch (error) {
                console.error('Error searching employees:', error);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce the search to avoid too many API calls
        const timeoutId = setTimeout(searchEmployees, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectEmployee = (employee: Employee) => {
        setQuery('');
        setShowResults(false);
        // Navigate to employee details or handle selection
        navigate(`/employees/${employee.employeeId}`);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-xl">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(true);
                }}
                placeholder="Search employees..."
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Results dropdown */}
            {showResults && (query.length >= 2) && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-96 overflow-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">Loading...</div>
                    ) : results.length > 0 ? (
                        <ul className="py-2">
                            {results.map((employee) => (
                                <li
                                    key={employee.employeeId}
                                    onClick={() => handleSelectEmployee(employee)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <div className="font-medium">
                                        {employee.firstName} {employee.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {employee.position}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;