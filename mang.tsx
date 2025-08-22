import React, { useState, useEffect } from 'react';
import { 
  Users, Package, ShoppingCart, DollarSign, BarChart3, 
  Settings, Plus, Search, Edit3, Trash2, Eye, Calendar,
  Mail, Phone, MapPin, Building, Filter, Download,
  Bell, User, LogOut, Menu, X, Home, TrendingUp
} from 'lucide-react';

const ManagementSystem = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser] = useState({ name: 'John Admin', role: 'Administrator' });

  // Sample data
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@company.com', phone: '+1-555-0101', department: 'Engineering', position: 'Senior Developer', salary: 85000, hireDate: '2022-03-15', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@company.com', phone: '+1-555-0102', department: 'Marketing', position: 'Marketing Manager', salary: 75000, hireDate: '2021-08-20', status: 'Active' },
    { id: 3, name: 'Carol Davis', email: 'carol@company.com', phone: '+1-555-0103', department: 'Finance', position: 'Financial Analyst', salary: 65000, hireDate: '2023-01-10', status: 'Active' }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Pro 15"', sku: 'LP15-001', category: 'Electronics', price: 1299.99, stock: 45, supplier: 'TechCorp', description: 'High-performance laptop' },
    { id: 2, name: 'Wireless Mouse', sku: 'WM-002', category: 'Accessories', price: 29.99, stock: 150, supplier: 'TechCorp', description: 'Ergonomic wireless mouse' },
    { id: 3, name: 'USB-C Hub', sku: 'UH-003', category: 'Accessories', price: 49.99, stock: 75, supplier: 'ConnectTech', description: '7-in-1 USB-C hub' }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: 'ACME Corporation', email: 'contact@acme.com', phone: '+1-555-1001', address: '123 Business St, NY', type: 'Enterprise', totalOrders: 25, totalSpent: 45000, status: 'Active' },
    { id: 2, name: 'StartupXYZ', email: 'hello@startupxyz.com', phone: '+1-555-1002', address: '456 Innovation Ave, CA', type: 'SMB', totalOrders: 12, totalSpent: 15000, status: 'Active' },
    { id: 3, name: 'Local Store Inc', email: 'orders@localstore.com', phone: '+1-555-1003', address: '789 Main St, TX', type: 'Retail', totalOrders: 8, totalSpent: 8500, status: 'Active' }
  ]);

  const [orders, setOrders] = useState([
    { id: 1001, customer: 'ACME Corporation', date: '2024-08-20', total: 2599.98, status: 'Completed', items: 2 },
    { id: 1002, customer: 'StartupXYZ', date: '2024-08-19', total: 1549.95, status: 'Processing', items: 3 },
    { id: 1003, customer: 'Local Store Inc', date: '2024-08-18', total: 899.97, status: 'Shipped', items: 1 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Dashboard stats
  const dashboardStats = {
    totalEmployees: employees.length,
    totalProducts: products.length,
    totalCustomers: customers.length,
    totalOrders: orders.length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
    lowStockItems: products.filter(p => p.stock < 50).length
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Building },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Modal handlers
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setModalType('');
  };

  // CRUD operations
  const handleDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (type) {
        case 'employee':
          setEmployees(employees.filter(emp => emp.id !== id));
          break;
        case 'product':
          setProducts(products.filter(prod => prod.id !== id));
          break;
        case 'customer':
          setCustomers(customers.filter(cust => cust.id !== id));
          break;
        case 'order':
          setOrders(orders.filter(order => order.id !== id));
          break;
      }
    }
  };

  // Render Dashboard
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalEmployees}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${dashboardStats.revenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalOrders}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.lowStockItems}</p>
            </div>
            <Package className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Low Stock Alert</h2>
          <div className="space-y-3">
            {products.filter(p => p.stock < 50).map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded border-l-4 border-red-400">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">{product.stock} left</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render Data Table
  const renderTable = (data, columns, type) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(`view-${type}`, item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal(`edit-${type}`, item)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(type, item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Employees
  const renderEmployees = () => {
    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'department', label: 'Department' },
      { key: 'position', label: 'Position' },
      { 
        key: 'salary', 
        label: 'Salary',
        render: (value) => `$${value.toLocaleString()}`
      },
      { 
        key: 'status', 
        label: 'Status',
        render: (value) => (
          <span className={`px-2 py-1 text-xs rounded ${
            value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <button
            onClick={() => openModal('add-employee')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
          </select>
        </div>

        {renderTable(employees, columns, 'employee')}
      </div>
    );
  };

  // Render Products
  const renderProducts = () => {
    const columns = [
      { key: 'name', label: 'Product Name' },
      { key: 'sku', label: 'SKU' },
      { key: 'category', label: 'Category' },
      { 
        key: 'price', 
        label: 'Price',
        render: (value) => `$${value}`
      },
      { 
        key: 'stock', 
        label: 'Stock',
        render: (value) => (
          <span className={`px-2 py-1 text-xs rounded ${
            value < 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {value}
          </span>
        )
      },
      { key: 'supplier', label: 'Supplier' }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <button
            onClick={() => openModal('add-product')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {renderTable(products, columns, 'product')}
      </div>
    );
  };

  // Render content based on active module
  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return renderDashboard();
      case 'employees':
        return renderEmployees();
      case 'products':
        return renderProducts();
      case 'customers':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </button>
            </div>
            {renderTable(customers, [
              { key: 'name', label: 'Company Name' },
              { key: 'email', label: 'Email' },
              { key: 'type', label: 'Type' },
              { key: 'totalOrders', label: 'Total Orders' },
              { key: 'totalSpent', label: 'Total Spent', render: (value) => `$${value.toLocaleString()}` }
            ], 'customer')}
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </button>
            </div>
            {renderTable(orders, [
              { key: 'id', label: 'Order ID' },
              { key: 'customer', label: 'Customer' },
              { key: 'date', label: 'Date' },
              { key: 'total', label: 'Total', render: (value) => `$${value}` },
              { key: 'status', label: 'Status', render: (value) => (
                <span className={`px-2 py-1 text-xs rounded ${
                  value === 'Completed' ? 'bg-green-100 text-green-800' :
                  value === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {value}
                </span>
              )}
            ], 'order')}
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <TrendingUp className="w-16 h-16 text-gray-400" />
                  <p className="ml-4 text-gray-600">Chart visualization would go here</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Employee Performance</h2>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <BarChart3 className="w-16 h-16 text-gray-400" />
                  <p className="ml-4 text-gray-600">Performance metrics would go here</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">System Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue="Your Company" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>UTC-5 (EST)</option>
                    <option>UTC-8 (PST)</option>
                  </select>
                </div>
              </div>
              <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Settings
              </button>
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h2 className="text-xl font-bold text-gray-900">BusinessPro</h2>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeModule === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {sidebarOpen && <span className="ml-3">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-600">{currentUser.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {navItems.find(item => item.id === activeModule)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {modalType.includes('add') ? 'Add New' : 
                 modalType.includes('edit') ? 'Edit' : 'View'} {' '}
                {modalType.split('-')[1]?.charAt(0).toUpperCase() + modalType.split('-')[1]?.slice(1)}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Modal content would be implemented here for:</p>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                <li>Form fields for adding/editing</li>
                <li>Validation logic</li>
                <li>Save/Update functionality</li>
                <li>View detailed information</li>
              </ul>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementSystem;
