import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileImageUploader from '@/components/ProfileImageUploader';

const UserDashboard = () => {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'schedules'>('profile');
  const [formData, setFormData] = useState({
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    // TODO: Implement save functionality
  };

  const handleCancel = () => {
    // Reset form to initial state
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
    <div className="bg-[#171717] min-w-screen min-h-screen overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="w-full h-[60px] absolute left-0 top-0 flex items-center justify-between px-6 bg-[#121214]">
        <div className="flex items-center gap-6">
          <button className="text-white">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1L11.5 6.5L17.5 7L13 11L14 17L9 14L4 17L5 11L0.5 7L6.5 6.5L9 1Z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-inter text-sm">AI Assistant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="4" width="12" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="3" y="8" width="9" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="3" y="12" width="6" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="13" y="2" width="2" height="2" rx="1" fill="currentColor" />
                <rect x="13" y="6" width="2" height="2" rx="1" fill="currentColor" />
                <rect x="13" y="10" width="2" height="2" rx="1" fill="currentColor" />
                <rect x="13" y="14" width="2" height="2" rx="1" fill="currentColor" />
              </svg>
              <span className="font-inter text-sm">Weekly Schedule</span>
            </div>
            <div className="flex items-center gap-2 bg-[#CCD853] px-3 py-1 rounded-lg">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="5" r="3" fill="#121214" />
                <path
                  d="M3 15C3 11.6863 5.68629 9 9 9C12.3137 9 15 11.6863 15 15"
                  stroke="#121214"
                  strokeWidth="2"
                />
              </svg>
              <span className="font-inter text-sm font-semibold text-[#121214]">Profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-[891px] absolute left-0 top-[60px] overflow-hidden">
        <div className="inline-flex justify-center items-center w-[1275px] h-[725px] absolute left-[322px] top-[115px]">
          <div className="rounded-2xl bg-[#0D0D0D] w-[1275px] h-[1181px] absolute left-0 top-0">
            {/* Profile Header Section */}
            <div className="flex pt-[18px] pr-[25px] pb-0 pl-[25px] flex-col items-center gap-5 w-[537px] absolute left-[369px] top-[35px] overflow-hidden">
              <div className="flex flex-col items-center gap-2 w-fit">
                <ProfileImageUploader
                  size="large"
                  onImageUploaded={url => console.log('Profile image updated:', url)}
                  className="mb-4"
                />
                <div className="flex flex-col items-center gap-[7px] w-fit">
                  <p className="text-[#FFF] font-inter text-base font-medium w-full text-center">
                    {currentUser?.displayName || 'User'}
                  </p>
                  <p className="text-[#828282] font-inter text-sm font-medium w-full text-center">
                    {currentUser?.email || 'user@example.com'}
                  </p>
                </div>
              </div>

              {/* Metrics Cards */}
              <div className="flex justify-center items-center gap-6 w-full">
                <div className="flex py-3.5 px-4 flex-col justify-center items-center gap-2.5 rounded-lg border border-[#212121] bg-[#0D0D0D] w-full h-full overflow-hidden">
                  <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-[#FFF] font-inter text-lg font-medium w-full text-center">
                      {formData.height || '172'} cm
                    </p>
                    <p className="text-[#ACACAC] font-inter text-xs w-full text-center">Height</p>
                  </div>
                </div>
                <div className="flex py-3.5 px-4 flex-col justify-center items-center gap-2.5 rounded-lg border border-[#212121] bg-[#0D0D0D] w-full h-full overflow-hidden">
                  <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-[#FFF] font-inter text-lg font-medium w-full text-center">
                      {formData.weight || '73'} kg
                    </p>
                    <p className="text-[#ACACAC] font-inter text-xs w-full text-center">Weight</p>
                  </div>
                </div>
                <div className="flex py-3.5 px-4 flex-col justify-center items-center gap-2.5 rounded-lg border border-[#212121] bg-[#0D0D0D] w-full h-full overflow-hidden">
                  <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-[#FFF] font-inter text-lg font-medium w-full text-center">
                      {formData.age || '27'} y
                    </p>
                    <p className="text-[#ACACAC] font-inter text-xs w-full text-center">Age</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center w-[768px] absolute left-[254px] top-[318px]">
              <div
                className={`flex pt-3 pr-0 pb-[11px] pl-0 justify-center items-center border-b-4 ${activeTab === 'profile' ? 'border-b-[#CCD853]' : 'border-b-[rgba(204,216,83,0.00)]'} w-full h-[51px] overflow-hidden cursor-pointer`}
                onClick={() => setActiveTab('profile')}
              >
                <div className="flex py-[5px] px-2.5 items-start gap-1.5 w-fit">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[18px] h-[18px] overflow-hidden relative"
                  >
                    <path
                      d="M16.2377 15.4687C16.1883 15.5542 16.1173 15.6253 16.0317 15.6746C15.9462 15.724 15.8492 15.75 15.7504 15.75H2.2504C2.15171 15.7499 2.05478 15.7238 1.96935 15.6744C1.88392 15.625 1.81299 15.554 1.76369 15.4685C1.71439 15.383 1.68845 15.286 1.68848 15.1873C1.6885 15.0886 1.71449 14.9917 1.76384 14.9062C2.8347 13.0549 4.48493 11.7274 6.41079 11.0981C5.45817 10.531 4.71805 9.66686 4.30408 8.63841C3.89011 7.60996 3.82518 6.47405 4.11926 5.40513C4.41335 4.33621 5.05019 3.39338 5.93198 2.72142C6.81377 2.04947 7.89176 1.68555 9.0004 1.68555C10.109 1.68555 11.187 2.04947 12.0688 2.72142C12.9506 3.39338 13.5875 4.33621 13.8815 5.40513C14.1756 6.47405 14.1107 7.60996 13.6967 8.63841C13.2828 9.66686 12.5426 10.531 11.59 11.0981C13.5159 11.7274 15.1661 13.0549 16.237 14.9062C16.2864 14.9917 16.3126 15.0886 16.3127 15.1874C16.3128 15.2861 16.2869 15.3831 16.2377 15.4687Z"
                      fill={activeTab === 'profile' ? '#CCD853' : '#999999'}
                    />
                  </svg>
                  <p
                    className={`font-inter text-xs font-semibold w-fit ${activeTab === 'profile' ? 'text-[#CCD853]' : 'text-[#999]'}`}
                  >
                    Profile Info
                  </p>
                </div>
              </div>
              <div
                className={`flex pt-3 pr-[121px] pb-[11px] pl-[120px] justify-center items-center border-b-4 ${activeTab === 'schedules' ? 'border-b-[#CCD853]' : 'border-b-[rgba(204,216,83,0.00)]'} w-full h-[51px] overflow-hidden cursor-pointer`}
                onClick={() => setActiveTab('schedules')}
              >
                <div className="flex py-[5px] px-2.5 items-start gap-1.5 w-fit">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[18px] h-[18px] overflow-hidden relative"
                  >
                    <path
                      d="M15.023 5.78953L11.0855 1.85203C11.0332 1.79981 10.9711 1.7584 10.9029 1.73017C10.8346 1.70194 10.7614 1.68744 10.6875 1.6875H3.9375C3.63913 1.6875 3.35298 1.80603 3.142 2.017C2.93103 2.22798 2.8125 2.51413 2.8125 2.8125V15.1875C2.8125 15.4859 2.93103 15.772 3.142 15.983C3.35298 16.194 3.63913 16.3125 3.9375 16.3125H14.0625C14.3609 16.3125 14.647 16.194 14.858 15.983C15.069 15.772 15.1875 15.4859 15.1875 15.1875V6.1875C15.1876 6.11361 15.1731 6.04043 15.1448 5.97215C15.1166 5.90386 15.0752 5.84181 15.023 5.78953ZM11.0855 11.648L9.39797 13.3355C9.34573 13.3878 9.28369 13.4293 9.2154 13.4576C9.14712 13.4859 9.07392 13.5004 9 13.5004C8.92608 13.5004 8.85288 13.4859 8.7846 13.4576C8.71631 13.4293 8.65427 13.3878 8.60203 13.3355L6.91453 11.648C6.80898 11.5424 6.74969 11.3993 6.74969 11.25C6.74969 11.1007 6.80898 10.9576 6.91453 10.852C7.02008 10.7465 7.16323 10.6872 7.3125 10.6872C7.46177 10.6872 7.60492 10.7465 7.71047 10.852L8.4375 11.5798V8.4375C8.4375 8.28832 8.49676 8.14524 8.60225 8.03975C8.70774 7.93426 8.85082 7.875 9 7.875C9.14918 7.875 9.29226 7.93426 9.39775 8.03975C9.50324 8.14524 9.5625 8.28832 9.5625 8.4375V11.5798L10.2895 10.852C10.3951 10.7465 10.5382 10.6872 10.6875 10.6872C10.8368 10.6872 10.9799 10.7465 11.0855 10.852C11.191 10.9576 11.2503 11.1007 11.2503 11.25C11.2503 11.3993 11.191 11.5424 11.0855 11.648ZM10.6875 6.1875V3.09375L13.7812 6.1875H10.6875Z"
                      fill={activeTab === 'schedules' ? '#CCD853' : '#999999'}
                    />
                  </svg>
                  <p
                    className={`font-inter text-xs font-semibold w-fit ${activeTab === 'schedules' ? 'text-[#CCD853]' : 'text-[#999]'}`}
                  >
                    Saved Schedules
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            {activeTab === 'profile' && (
              <div className="flex flex-col items-end gap-[58px] w-[738px] absolute left-[269px] top-[412px]">
                <div className="flex flex-col items-start gap-[15px] w-full">
                  {/* Personal Info Section */}
                  <div className="flex flex-col items-start gap-[50px] w-full">
                    <div className="flex flex-col items-start gap-[9px] w-full">
                      <p className="text-[#FFF] font-inter text-base font-semibold w-full">
                        Personal info
                      </p>
                    </div>
                    <div className="flex items-start gap-3 flex-wrap w-full">
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">First Name</p>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] px-3 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">Last Name</p>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] px-3 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">Email</p>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] px-3 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">Phone</p>
                        <div className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] overflow-hidden relative">
                          <select
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full h-full bg-transparent text-white px-3 pr-8 appearance-none focus:outline-none"
                          >
                            <option value="">Select country</option>
                            <option value="+1">🇺🇸 +1 (US)</option>
                            <option value="+44">🇬🇧 +44 (UK)</option>
                            <option value="+91">🇮🇳 +91 (India)</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="#999"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">Age</p>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] px-3 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none"
                          placeholder="Enter your age"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">Gender</p>
                        <div className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] overflow-hidden relative">
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full h-full bg-transparent text-white px-3 pr-8 appearance-none focus:outline-none"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="#999"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Health Information Section */}
                  <div className="flex flex-col items-start gap-[50px] w-full">
                    <div className="flex flex-col items-start gap-[9px] w-full">
                      <p className="text-[#FFF] font-inter text-base font-semibold w-full">
                        Health Information
                      </p>
                    </div>
                    <div className="flex items-start gap-3 flex-wrap w-full">
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">Height</p>
                        <div className="relative">
                          <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] px-3 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none"
                            placeholder="Enter height"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            cm
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">Weight</p>
                        <div className="relative">
                          <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] px-3 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none"
                            placeholder="Enter weight"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            kg
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">Activity Level</p>
                        <div className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] overflow-hidden relative">
                          <select
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleInputChange}
                            className="w-full h-full bg-transparent text-white px-3 pr-8 appearance-none focus:outline-none"
                          >
                            <option value="">Select activity level</option>
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Light Exercise</option>
                            <option value="moderate">Moderate Exercise</option>
                            <option value="active">Active</option>
                            <option value="very-active">Very Active</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="#999"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-[238px]">
                        <p className="text-[#FFF] font-inter text-sm w-full">Target Weight</p>
                        <div className="relative">
                          <input
                            type="number"
                            name="targetWeight"
                            value={formData.targetWeight}
                            onChange={handleInputChange}
                            className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[39px] px-3 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none"
                            placeholder="Enter target weight"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            kg
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-full">
                        <p className="text-[#FFF] font-inter text-sm w-full">Allergies</p>
                        <textarea
                          name="allergies"
                          value={formData.allergies}
                          onChange={handleInputChange}
                          className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[80px] px-3 py-2 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none resize-none"
                          placeholder="List any food allergies or sensitivities"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-full">
                        <p className="text-[#FFF] font-inter text-sm w-full">Health Goals</p>
                        <textarea
                          name="healthGoals"
                          value={formData.healthGoals}
                          onChange={handleInputChange}
                          className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[80px] px-3 py-2 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none resize-none"
                          placeholder="Describe your health and fitness goals"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-[9px] w-full">
                        <p className="text-[#FFF] font-inter text-sm w-full">
                          Dietary Restrictions
                        </p>
                        <textarea
                          name="dietaryRestrictions"
                          value={formData.dietaryRestrictions}
                          onChange={handleInputChange}
                          className="rounded-lg border border-[#454545] bg-[#212121] w-full h-[80px] px-3 py-2 text-white placeholder-gray-500 focus:border-[#CCD853] focus:outline-none resize-none"
                          placeholder="List any dietary restrictions or preferences"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 self-end">
                  <button
                    onClick={handleCancel}
                    className="text-white font-inter text-sm font-semibold hover:text-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-[#CCD853] text-[#121214] font-inter text-sm font-semibold px-6 py-2 rounded-lg hover:bg-[#b8c24a] transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Saved Schedules Content */}
            {activeTab === 'schedules' && (
              <div className="flex flex-col items-center justify-center w-full h-full">
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
                  <p className="text-white text-lg font-medium">No saved schedules yet</p>
                  <p className="text-gray-500 mt-2">Your saved schedules will appear here</p>
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
