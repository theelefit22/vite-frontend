import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/dashboard/ProfileHeader';
import TabNavigation from '@/components/dashboard/TabNavigation';
import { FormField, TextInput, SelectInput, TextArea } from '@/components/dashboard/FormComponents';

type TabType = 'profile' | 'schedules';

interface FormData {
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
  const [formData, setFormData] = useState<FormData>({
    firstName: currentUser?.displayName?.split(' ')[0] || '',
    lastName: currentUser?.displayName?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    targetWeight: '',
    allergies: '',
    healthGoals: '',
    dietaryRestrictions: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    // TODO: Implement save functionality
  };

  const handleCancel = () => {
    setFormData({
      firstName: currentUser?.displayName?.split(' ')[0] || '',
      lastName: currentUser?.displayName?.split(' ')[1] || '',
      email: currentUser?.email || '',
      phone: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      activityLevel: '',
      targetWeight: '',
      allergies: '',
      healthGoals: '',
      dietaryRestrictions: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header Section */}
        <div className="mb-8">
          <ProfileHeader formData={formData} />
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="space-y-12">
            {/* Personal Information Section */}
            <section>
              <h2 className="text-white font-inter text-xl font-semibold mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="First Name" required>
                  <TextInput
                    value={formData.firstName}
                    onChange={value => handleInputChange('firstName', value)}
                    placeholder="Enter your first name"
                  />
                </FormField>

                <FormField label="Last Name" required>
                  <TextInput
                    value={formData.lastName}
                    onChange={value => handleInputChange('lastName', value)}
                    placeholder="Enter your last name"
                  />
                </FormField>

                <FormField label="Email" required>
                  <TextInput
                    value={formData.email}
                    onChange={value => handleInputChange('email', value)}
                    placeholder="Enter your email"
                    type="email"
                  />
                </FormField>

                <FormField label="Phone">
                  <SelectInput
                    value={formData.phone}
                    onChange={value => handleInputChange('phone', value)}
                    placeholder="Select country code"
                    options={[
                      { value: '+1', label: '🇺🇸 +1 (US)' },
                      { value: '+44', label: '🇬🇧 +44 (UK)' },
                      { value: '+91', label: '🇮🇳 +91 (India)' },
                    ]}
                  />
                </FormField>

                <FormField label="Age">
                  <TextInput
                    value={formData.age}
                    onChange={value => handleInputChange('age', value)}
                    placeholder="Enter your age"
                    type="number"
                  />
                </FormField>

                <FormField label="Gender">
                  <SelectInput
                    value={formData.gender}
                    onChange={value => handleInputChange('gender', value)}
                    placeholder="Select gender"
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
                    ]}
                  />
                </FormField>
              </div>
            </section>

            {/* Health Information Section */}
            <section>
              <h2 className="text-white font-inter text-xl font-semibold mb-6">
                Health Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Height">
                  <TextInput
                    value={formData.height}
                    onChange={value => handleInputChange('height', value)}
                    placeholder="Enter height"
                    type="number"
                    suffix="cm"
                  />
                </FormField>

                <FormField label="Weight">
                  <TextInput
                    value={formData.weight}
                    onChange={value => handleInputChange('weight', value)}
                    placeholder="Enter weight"
                    type="number"
                    suffix="kg"
                  />
                </FormField>

                <FormField label="Activity Level">
                  <SelectInput
                    value={formData.activityLevel}
                    onChange={value => handleInputChange('activityLevel', value)}
                    placeholder="Select activity level"
                    options={[
                      { value: 'sedentary', label: 'Sedentary' },
                      { value: 'light', label: 'Light Exercise' },
                      { value: 'moderate', label: 'Moderate Exercise' },
                      { value: 'active', label: 'Active' },
                      { value: 'very-active', label: 'Very Active' },
                    ]}
                  />
                </FormField>

                <FormField label="Target Weight">
                  <TextInput
                    value={formData.targetWeight}
                    onChange={value => handleInputChange('targetWeight', value)}
                    placeholder="Enter target weight"
                    type="number"
                    suffix="kg"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                <FormField label="Allergies">
                  <TextArea
                    value={formData.allergies}
                    onChange={value => handleInputChange('allergies', value)}
                    placeholder="List any food allergies or sensitivities"
                    rows={3}
                  />
                </FormField>

                <FormField label="Health Goals">
                  <TextArea
                    value={formData.healthGoals}
                    onChange={value => handleInputChange('healthGoals', value)}
                    placeholder="Describe your health and fitness goals"
                    rows={3}
                  />
                </FormField>

                <FormField label="Dietary Restrictions">
                  <TextArea
                    value={formData.dietaryRestrictions}
                    onChange={value => handleInputChange('dietaryRestrictions', value)}
                    placeholder="List any dietary restrictions or preferences"
                    rows={3}
                  />
                </FormField>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-800">
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-white font-inter text-sm font-semibold hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#CCD853] text-gray-900 font-inter text-sm font-semibold rounded-lg hover:bg-[#b8c24a] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Saved Schedules Tab */}
        {activeTab === 'schedules' && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center text-gray-500">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mb-4"
              >
                <path
                  d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 2V6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 10H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-white text-lg font-medium mb-2">No saved schedules yet</h3>
              <p className="text-gray-500">Your saved schedules will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
