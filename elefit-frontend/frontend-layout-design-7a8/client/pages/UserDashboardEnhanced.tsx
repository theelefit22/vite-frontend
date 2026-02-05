import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '@shared/firebase';
import ProfileImageUploader from '@/components/ProfileImageUploader';

type TabType = 'profile' | 'schedules';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  targetWeight: string;
  allergies: string;
  healthGoals: string;
  dietaryRestrictions: string;
}

const UserDashboard = () => {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    targetWeight: '',
    allergies: '',
    healthGoals: '',
    dietaryRestrictions: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });

  // Load user data from Firebase
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser?.uid) return;
      
      try {
        setLoading(true);
        const profileData = await getUserProfile(currentUser.uid);
        
        if (profileData) {
          // Parse name if it's a single string
          let firstName = '';
          let lastName = '';
          if (profileData.name) {
            const nameParts = profileData.name.split(' ');
            firstName = nameParts[0] || '';
            lastName = nameParts.slice(1).join(' ') || '';
          }
          
          setUserData({
            firstName: profileData.firstName || firstName || currentUser.displayName?.split(' ')[0] || '',
            lastName: profileData.lastName || lastName || currentUser.displayName?.split(' ')[1] || '',
            email: profileData.email || currentUser.email || '',
            phone: profileData.phone || '',
            age: profileData.age?.toString() || '',
            gender: profileData.gender || '',
            height: profileData.height?.toString() || '',
            weight: profileData.weight?.toString() || '',
            activityLevel: profileData.activityLevel || '',
            targetWeight: profileData.targetWeight?.toString() || '',
            allergies: profileData.allergies || '',
            healthGoals: profileData.healthGoals || '',
            dietaryRestrictions: profileData.dietaryRestrictions || ''
          });
        } else {
          // Set defaults from auth if no profile exists
          setUserData({
            firstName: currentUser.displayName?.split(' ')[0] || '',
            lastName: currentUser.displayName?.split(' ')[1] || '',
            email: currentUser.email || '',
            phone: '',
            age: '',
            gender: '',
            height: '',
            weight: '',
            activityLevel: '',
            targetWeight: '',
            allergies: '',
            healthGoals: '',
            dietaryRestrictions: ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setMessage({ text: 'Failed to load profile data', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [currentUser]);

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!currentUser?.uid) return;
    
    setSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Prepare data for saving
      const dataToSave = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        email: userData.email,
        phone: userData.phone,
        age: userData.age ? parseInt(userData.age) : null,
        gender: userData.gender,
        height: userData.height ? parseInt(userData.height) : null,
        weight: userData.weight ? parseInt(userData.weight) : null,
        activityLevel: userData.activityLevel,
        targetWeight: userData.targetWeight ? parseInt(userData.targetWeight) : null,
        allergies: userData.allergies,
        healthGoals: userData.healthGoals,
        dietaryRestrictions: userData.dietaryRestrictions
      };

      await updateUserProfile(currentUser.uid, dataToSave);
      
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ text: 'Failed to update profile. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reload data from Firebase
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="bg-[#171717] min-w-screen min-h-screen flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  // Enhanced form field components
  const renderTextField = (label: string, field: keyof UserData, placeholder: string, type: string = "text", suffix?: string) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={userData[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
          placeholder={placeholder}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );

  const renderSelectField = (label: string, field: keyof UserData, options: {value: string, label: string}[]) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <select
          value={userData[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none transition-all duration-200"
        >
          <option value="" className="bg-gray-800">Select {label.toLowerCase()}</option>
          {options.map(option => (
            <option key={option.value} value={option.value} className="bg-gray-800">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );

  const renderTextArea = (label: string, field: keyof UserData, placeholder: string, rows: number = 4) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <textarea
        value={userData[field] as string}
        onChange={(e) => handleInputChange(field, e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="bg-[#171717] min-w-screen min-h-screen">
      {/* Top Navigation Bar */}
      <div className="w-full h-[60px] bg-[#121214] flex items-center justify-between px-6 border-b border-gray-800">
        <div className="flex items-center gap-6">
          <button className="text-white hover:text-gray-300 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1L11.5 6.5L17.5 7L13 11L14 17L9 14L4 17L5 11L0.5 7L6.5 6.5L9 1Z" fill="currentColor"/>
              </svg>
              <span className="font-inter text-sm">AI Assistant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="12" height="1.5" rx="0.75" fill="currentColor"/>
                <rect x="3" y="8" width="9" height="1.5" rx="0.75" fill="currentColor"/>
                <rect x="3" y="12" width="6" height="1.5" rx="0.75" fill="currentColor"/>
                <rect x="13" y="2" width="2" height="2" rx="1" fill="currentColor"/>
                <rect x="13" y="6" width="2" height="2" rx="1" fill="currentColor"/>
                <rect x="13" y="10" width="2" height="2" rx="1" fill="currentColor"/>
                <rect x="13" y="14" width="2" height="2" rx="1" fill="currentColor"/>
              </svg>
              <span className="font-inter text-sm">Weekly Schedule</span>
            </div>
            <div className="flex items-center gap-2 bg-[#CCD853] px-3 py-1 rounded-lg">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="5" r="3" fill="#121214"/>
                <path d="M3 15C3 11.6863 5.68629 9 9 9C12.3137 9 15 11.6863 15 15" stroke="#121214" strokeWidth="2"/>
              </svg>
              <span className="font-inter text-sm font-semibold text-[#121214]">Profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-[#0D0D0D] rounded-2xl border border-gray-800">
          
          {/* Profile Header Section */}
          <div className="flex flex-col items-center py-8 border-b border-gray-800">
            <div className="flex flex-col items-center gap-4">
              <ProfileImageUploader 
                size="large"
                onImageUploaded={(url) => console.log('Profile image updated:', url)}
              />
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-gray-400 mt-1">
                  {userData.email}
                </p>
              </div>
            </div>
            
            {/* Metrics Cards */}
            <div className="flex justify-center gap-6 mt-8">
              <div className="bg-gray-900 border border-gray-700 rounded-lg px-6 py-4 text-center min-w-[120px]">
                <div className="text-xl font-semibold text-white">
                  {userData.height || '172'} cm
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Height
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-lg px-6 py-4 text-center min-w-[120px]">
                <div className="text-xl font-semibold text-white">
                  {userData.weight || '73'} kg
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Weight
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-lg px-6 py-4 text-center min-w-[120px]">
                <div className="text-xl font-semibold text-white">
                  {userData.age || '27'} y
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Age
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'profile' 
                  ? 'border-[#CCD853] text-[#CCD853]' 
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Profile Info
            </button>
            <button
              onClick={() => setActiveTab('schedules')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'schedules' 
                  ? 'border-[#CCD853] text-[#CCD853]' 
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Saved Schedules
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-12">
                
                {/* Personal Info Section */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderTextField('First Name', 'firstName', 'Enter your first name')}
                    {renderTextField('Last Name', 'lastName', 'Enter your last name')}
                    {renderTextField('Email', 'email', 'Enter your email', 'email')}
                    {renderSelectField('Phone', 'phone', [
                      { value: '+1', label: '🇺🇸 +1 (US)' },
                      { value: '+44', label: '🇬🇧 +44 (UK)' },
                      { value: '+91', label: '🇮🇳 +91 (India)' }
                    ])}
                    {renderTextField('Age', 'age', 'Enter your age', 'number')}
                    {renderSelectField('Gender', 'gender', [
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                      { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                    ])}
                  </div>
                </div>

                {/* Health Information Section */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Health Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {renderTextField('Height', 'height', 'Enter height', 'number', 'cm')}
                    {renderTextField('Weight', 'weight', 'Enter weight', 'number', 'kg')}
                    {renderSelectField('Activity Level', 'activityLevel', [
                      { value: 'sedentary', label: 'Sedentary' },
                      { value: 'light', label: 'Light Exercise' },
                      { value: 'moderate', label: 'Moderate Exercise' },
                      { value: 'active', label: 'Active' },
                      { value: 'very-active', label: 'Very Active' }
                    ])}
                    {renderTextField('Target Weight', 'targetWeight', 'Enter target weight', 'number', 'kg')}
                  </div>
                  
                  <div className="space-y-6">
                    {renderTextArea('Allergies', 'allergies', 'List any food allergies or sensitivities')}
                    {renderTextArea('Health Goals', 'healthGoals', 'Describe your health and fitness goals')}
                    {renderTextArea('Dietary Restrictions', 'dietaryRestrictions', 'List any dietary restrictions or preferences')}
                  </div>
                </div>

                {/* Messages */}
                {message.text && (
                  <div className={`px-6 py-3 rounded-lg text-center ${
                    message.type === 'success' 
                      ? 'bg-green-900/30 text-green-400 border border-green-800' 
                      : 'bg-red-900/30 text-red-400 border border-red-800'
                  }`}>
                    {message.text}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-800">
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="px-6 py-2.5 text-gray-300 font-medium rounded-lg border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#CCD853] text-[#121214] font-medium rounded-lg hover:bg-[#b8c24a] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving && (
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Saved Schedules Content */}
            {activeTab === 'schedules' && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-gray-500">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="text-white text-lg font-medium mb-2">No saved schedules yet</h3>
                  <p className="text-gray-500">Your saved schedules will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;