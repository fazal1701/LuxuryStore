import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
  });
  
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });
  
  const mockOrders = [
    {
      id: 'ORD-123456',
      date: '2023-06-15',
      status: 'Delivered',
      total: 1299.99,
      items: 2,
    },
    {
      id: 'ORD-123457',
      date: '2023-08-22',
      status: 'Processing',
      total: 699.50,
      items: 1,
    },
  ];
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd save the profile data to the backend
    alert('Profile updated successfully!');
  };
  
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd save the address data to the backend
    alert('Address updated successfully!');
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white border border-primary-100 p-6">
              {/* User info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-800 font-medium">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="font-medium">{profile.firstName || 'User'}</div>
                  <div className="text-sm text-primary-500">{user?.email}</div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left py-2 px-3 rounded ${
                    activeTab === 'profile' 
                      ? 'bg-primary-100 text-primary-900 font-medium' 
                      : 'text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left py-2 px-3 rounded ${
                    activeTab === 'orders' 
                      ? 'bg-primary-100 text-primary-900 font-medium' 
                      : 'text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left py-2 px-3 rounded ${
                    activeTab === 'addresses' 
                      ? 'bg-primary-100 text-primary-900 font-medium' 
                      : 'text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left py-2 px-3 rounded ${
                    activeTab === 'wishlist' 
                      ? 'bg-primary-100 text-primary-900 font-medium' 
                      : 'text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left py-2 px-3 rounded ${
                    activeTab === 'settings' 
                      ? 'bg-primary-100 text-primary-900 font-medium' 
                      : 'text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Settings
                </button>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-primary-100">
                <Button
                  onClick={signOut}
                  variant="outline"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="md:w-3/4">
            {/* Profile */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-primary-100 p-6">
                <h2 className="text-xl font-medium mb-6">Personal Information</h2>
                
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                    />
                    <Input
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    value={profile.email}
                    onChange={handleProfileChange}
                    disabled
                  />
                  
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Orders */}
            {activeTab === 'orders' && (
              <div className="bg-white border border-primary-100 p-6">
                <h2 className="text-xl font-medium mb-6">Order History</h2>
                
                {mockOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="text-sm text-primary-500 uppercase bg-primary-50">
                        <tr>
                          <th className="px-4 py-3 text-left">Order ID</th>
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Total</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-primary-100">
                        {mockOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-primary-50">
                            <td className="px-4 py-4">{order.id}</td>
                            <td className="px-4 py-4">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4">
                              <span 
                                className={`inline-block px-2 py-1 text-xs rounded ${
                                  order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-right">
                              <button className="text-sm font-medium text-gold-500 hover:text-gold-600">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-primary-500">You haven't placed any orders yet.</p>
                    <Button className="mt-4" as="a" href="/shop">
                      Start Shopping
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div className="bg-white border border-primary-100 p-6">
                <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
                
                <form onSubmit={handleAddressSubmit} className="space-y-6">
                  <Input
                    id="line1"
                    name="line1"
                    label="Address Line 1"
                    value={address.line1}
                    onChange={handleAddressChange}
                  />
                  
                  <Input
                    id="line2"
                    name="line2"
                    label="Address Line 2 (Optional)"
                    value={address.line2}
                    onChange={handleAddressChange}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="city"
                      name="city"
                      label="City"
                      value={address.city}
                      onChange={handleAddressChange}
                    />
                    <Input
                      id="state"
                      name="state"
                      label="State / Province"
                      value={address.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="postalCode"
                      name="postalCode"
                      label="Postal Code"
                      value={address.postalCode}
                      onChange={handleAddressChange}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-2" htmlFor="country">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={address.country}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 text-sm border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-950"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      Save Address
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="bg-white border border-primary-100 p-6">
                <h2 className="text-xl font-medium mb-6">My Wishlist</h2>
                
                <div className="text-center py-8">
                  <p className="text-primary-500">Your wishlist is empty.</p>
                  <Button className="mt-4" as="a" href="/shop">
                    Start Shopping
                  </Button>
                </div>
              </div>
            )}
            
            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-primary-100 p-6">
                <h2 className="text-xl font-medium mb-6">Account Settings</h2>
                
                <form className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Change Password</h3>
                    <p className="text-sm text-primary-500 mb-4">
                      Update your password to keep your account secure.
                    </p>
                    
                    <Input
                      id="current-password"
                      type="password"
                      label="Current Password"
                    />
                    
                    <Input
                      id="new-password"
                      type="password"
                      label="New Password"
                    />
                    
                    <Input
                      id="confirm-password"
                      type="password"
                      label="Confirm New Password"
                    />
                    
                    <div className="pt-2">
                      <Button type="submit">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </form>
                
                <div className="mt-12 pt-6 border-t border-primary-100">
                  <h3 className="font-medium text-red-600 mb-4">Danger Zone</h3>
                  <p className="text-sm text-primary-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="outline" className="text-red-600 hover:bg-red-50 border-red-200">
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;