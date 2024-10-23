import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';

interface Medicine {
  id: number;
  name: string;
  batchNumber: string; // Change from manufacturer to batchNumber
  expiryDate: string;
  price: number;
  quantity: number;
}

const MedicineManagement: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newMedicine, setNewMedicine] = useState<Medicine>({ id: 0, name: '', batchNumber: '', expiryDate: '', price: 0, quantity: 0 });
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  useEffect(() => {
    // Fetch medicines from API or local storage
    const mockMedicines: Medicine[] = [
      { id: 1, name: 'Paracetamol', batchNumber: 'BATCH001', expiryDate: '2024-12-31', price: 5.99, quantity: 100 },
      { id: 2, name: 'Amoxicillin', batchNumber: 'BATCH002', expiryDate: '2023-10-15', price: 12.50, quantity: 50 },
    ];
    setMedicines(mockMedicines);
  }, []);

  const handleAddMedicine = () => {
    const newId = medicines.length ? Math.max(...medicines.map(med => med.id)) + 1 : 1; // Generate new ID
    const medicine: Medicine = { ...newMedicine, id: newId };
    setMedicines([...medicines, medicine]);
    resetForm();
  };

  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setNewMedicine({ ...medicine }); // Populate the form with the selected medicine's data
    setIsEditing(true);
  };

  const handleUpdateMedicine = () => {
    if (editingMedicine) {
      setMedicines(medicines.map(med => (med.id === editingMedicine.id ? newMedicine : med)));
      resetForm();
    }
  };

  const handleDeleteMedicine = (id: number) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const resetForm = () => {
    setIsAddingMedicine(false);
    setIsEditing(false);
    setNewMedicine({ id: 0, name: '', batchNumber: '', expiryDate: '', price: 0, quantity: 0 });
    setEditingMedicine(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Medicine Management</h1>
      <div className="mb-4">
        <button
          onClick={() => setIsAddingMedicine(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2" /> Add Medicine
        </button>
      </div>
      {(isAddingMedicine || isEditing) && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">{isEditing ? 'Edit Medicine' : 'Add New Medicine'}</h2>
          <input
            type="text"
            placeholder="Name"
            className="mb-2 p-2 w-full"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Batch Number"
            className="mb-2 p-2 w-full"
            value={newMedicine.batchNumber}
            onChange={(e) => setNewMedicine({ ...newMedicine, batchNumber: e.target.value })}
          />
          <input
            type="date"
            placeholder="Expiry Date"
            className="mb-2 p-2 w-full"
            value={newMedicine.expiryDate}
            onChange={(e) => setNewMedicine({ ...newMedicine, expiryDate: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="mb-2 p-2 w-full"
            value={newMedicine.price}
            onChange={(e) => setNewMedicine({ ...newMedicine, price: parseFloat(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="mb-2 p-2 w-full"
            value={newMedicine.quantity}
            onChange={(e) => setNewMedicine({ ...newMedicine, quantity: parseInt(e.target.value) })}
          />
          <button
            onClick={isEditing ? handleUpdateMedicine : handleAddMedicine}
            className={`bg-${isEditing ? 'yellow' : 'green'}-500 hover:bg-${isEditing ? 'yellow' : 'green'}-700 text-white font-bold py-2 px-4 rounded`}
          >
            {isEditing ? 'Update Medicine' : 'Save Medicine'}
          </button>
          <button onClick={resetForm} className="ml-2 text-gray-600 hover:text-gray-800">Cancel</button>
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td className="px-6 py-4 whitespace-nowrap">{medicine.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{medicine.batchNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{medicine.expiryDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">${medicine.price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{medicine.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleEditMedicine(medicine)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteMedicine(medicine.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineManagement;
