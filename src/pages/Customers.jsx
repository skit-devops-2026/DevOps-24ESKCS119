import React, { useState } from 'react';
import { Users, UserPlus, Search, Phone, Mail, IndianRupee, Trash2 } from 'lucide-react';

export default function Customers({ customers = [], setCustomers }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert("कृपया सभी फ़ील्ड भरें!");
      return;
    }

    if (customers.some(c => c.phone === phone.trim())) {
      alert("यह मोबाइल नंबर पहले से रजिस्टर्ड है!");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      purchases: 0
    };

    setCustomers([...customers, newCustomer]);
    setName(''); setPhone(''); setEmail('');
  };

  const handleDeleteCustomer = (idToDelete) => {
    if (window.confirm("क्या आप इस ग्राहक को हटाना चाहते हैं?")) {
      setCustomers(customers.filter(c => c.id !== idToDelete));
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );
  return (
    <div className="p-4 md:p-6 bg-[#f8fafc] min-h-screen text-slate-800 font-sans">
      
      {/* Light UI Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="text-blue-600" /> Customer Diagnostics Terminal
          </h1>
          <p className="text-xs text-slate-500 mt-1">Add, track and manage your shop's lifetime buyers.</p>
        </div>

        {/* Live Filter Box */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Registration Panel Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 h-fit shadow-sm">
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-blue-600">
            <UserPlus size={16} /> Register New Customer
          </h2>
          
          <form onSubmit={handleAddCustomer} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Full Name</label>
              <input 
                required
                placeholder="e.g. Rahul Sharma" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Mobile Number</label>
              <input 
                required
                type="tel"
                placeholder="e.g. 9876543210" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="e.g. name@domain.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition shadow-sm"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs p-3 rounded-xl transition duration-200 shadow-sm"
            >
              Add To System Database
            </button>
          </form>
        </div>
        {/* Accounts Table List View */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-bold mb-4 text-slate-800">Registered Accounts ({filteredCustomers.length})</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                  <th className="pb-3 font-bold">Client Identity</th>
                  <th className="pb-3 font-bold">Contact Info</th>
                  <th className="pb-3 font-bold">Total Revenue</th>
                  <th className="pb-3 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/80 transition duration-150">
                    <td className="py-3.5 font-bold text-slate-900">{customer.name}</td>
                    <td className="py-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-700 font-mono">
                        <Phone size={12} className="text-slate-400" /> {customer.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Mail size={12} /> {customer.email}
                      </div>
                    </td>
                    <td className="py-3.5 font-extrabold text-emerald-600">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-0.5">
                          <IndianRupee size={12} /> {Number(customer.purchases || 0).toLocaleString('en-IN')}
                        </div>
                        {/* ⚡ Live Manual Revenue Setter Input Field */}
                        <div className="flex items-center gap-1">
                          <input 
                            type="number" 
                            placeholder="New ₹"
                            id={`customer-rev-input-${customer.id}`}
                            className="w-16 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[10px] text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const val = parseFloat(document.getElementById(`customer-rev-input-${customer.id}`).value);
                              if (isNaN(val) || val < 0) return alert("सही अमाउंट डालें!");
                              setCustomers(customers.map(c => c.id === customer.id ? { ...c, purchases: val } : c));
                              document.getElementById(`customer-rev-input-${customer.id}`).value = '';
                              alert("ग्राहक रेवेन्यू अपडेट हो गया है!");
                            }}
                            className="bg-blue-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded hover:bg-blue-700 transition"
                          >
                            Set
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-center">
                      <button 
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Client"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-slate-400 text-xs">
                      No matching clients registered in system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
