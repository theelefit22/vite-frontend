import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronLeft, Download, Flame, Lightbulb, ThumbsUp, ChevronDown, Sunrise, Utensils, Apple, Moon } from 'lucide-react';
import BottomNavNew from '@/components/BottomNavNew';

const mealPlanData = {
  title: "General LW (7D) Plan #1",
  duration: "7 Days",
  totalCalories: "2638 kcal",
  goalCalories: "700 kcal",
  meals: [
    {
      id: "breakfast",
      name: "Breakfast",
      icon: Sunrise,
      items: [
        {
          name: "Oatmeal",
          amount: "245 g",
          calories: "955 kcal",
        },
        {
          name: "Banana",
          amount: "120 g",
          calories: "105 kcal",
        },
        {
          name: "Almonds",
          amount: "30 g",
          calories: "150 kcal",
        }
      ]
    },
    {
      id: "lunch",
      name: "Lunch",
      icon: Utensils,
      items: [
        {
          name: "Grilled Chicken Salad",
          amount: "320 g",
          calories: "420 kcal",
        },
        {
          name: "Brown Rice",
          amount: "150 g",
          calories: "180 kcal",
        }
      ]
    },
    {
      id: "snacks",
      name: "Snacks",
      icon: Apple,
      items: [
        {
          name: "Greek Yogurt",
          amount: "200 g",
          calories: "120 kcal",
        },
        {
          name: "Mixed Berries",
          amount: "100 g",
          calories: "52 kcal",
        }
      ]
    },
    {
      id: "dinner",
      name: "Dinner",
      icon: Moon,
      items: [
        {
          name: "Salmon Fillet",
          amount: "180 g",
          calories: "367 kcal",
        },
        {
          name: "Steamed Vegetables",
          amount: "200 g",
          calories: "80 kcal",
        },
        {
          name: "Sweet Potato",
          amount: "150 g",
          calories: "130 kcal",
        }
      ]
    }
  ],
  workouts: [
    {
      id: "morning-cardio",
      name: "Morning Cardio",
      duration: "30 mins",
      intensity: "Medium",
      calories: "250 kcal"
    },
    {
      id: "strength-training",
      name: "Strength Training",
      duration: "45 mins",
      intensity: "High",
      calories: "320 kcal"
    }
  ]
};

export default function Schedule() {
  const navigate = useNavigate();
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({
    breakfast: true,
    lunch: true,
    snacks: true,
    dinner: true
  });

  const [activeTab, setActiveTab] = useState<'meal-plans' | 'workout' | 'plan-suggestions'>('meal-plans');
  const [expandedWorkout, setExpandedWorkout] = useState(true);

  const toggleMeal = (mealId: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }));
  };

  const toggleWorkout = () => {
    setExpandedWorkout(prev => !prev);
  };
  
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Mobile view - fully responsive design
    return (
      <div className="bg-[#161616] overflow-hidden w-full min-h-screen relative flex flex-col">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#161616] to-black opacity-90" />
        
        {/* Top Status Bar */}
        <div className="relative z-20 pt-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#999999] text-sm">9:41</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#999999]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#999999]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#999999]"></div>
            </div>
          </div>
        </div>
        
        {/* Weekly Schedule Header - Responsive */}
        <div className="relative z-10 px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors">
              <ChevronLeft className="w-4 h-4 text-[#999999]" />
            </button>
            <h2 className="text-white text-base font-semibold">Weekly Schedule</h2>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ccd853] hover:bg-[#b8c44a] transition-colors">
              <Download className="w-4 h-4 text-[#1e1e1e]" />
            </button>
          </div>
          
          {/* Day Navigation - Scrollable for small screens */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex justify-between min-w-max" style={{minWidth: '300px'}}>
              {[
                { day: 'TUE', date: '02', active: false },
                { day: 'WED', date: '03', active: true },
                { day: 'THU', date: '04', active: false },
                { day: 'FRI', date: '05', active: false },
                { day: 'SAT', date: '06', active: false },
                { day: 'SUN', date: '07', active: false },
                { day: 'MON', date: '08', active: false },
              ].map((item) => (
                <div key={item.day} className="flex flex-col items-center px-2 flex-shrink-0">
                  <span className={`text-xs ${item.active ? 'text-[#ccd853]' : 'text-[#999999]'} font-medium mb-1`}>{item.day}</span>
                  <div className="relative">
                    <span className={`text-sm ${item.active ? 'text-white font-bold' : 'text-[#999999]'} font-medium`}>{item.date}</span>
                    {item.active && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ccd853] rounded-full"></div>
                    )}
                  </div>
                  {item.active && (
                    <div className="w-6 h-0.5 bg-[#ccd853] rounded-full mt-1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Meal Plan Details Section - Responsive */}
        <div className="flex-1 px-4 pb-20 overflow-hidden flex flex-col">
          <div className="bg-[#42946d26] rounded-xl p-4 mb-4 border border-[#212121] flex-shrink-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-white text-base font-semibold mb-1">General LW (7D) Plan #1</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-[#999999] text-sm">Duration: </span>
                  <span className="text-[#ccd853] text-sm font-semibold">7 Days</span>
                  <div className="flex items-center space-x-1 bg-[#e25401]/20 px-2 py-1 rounded-full">
                    <Flame className="w-3 h-3 text-[#e25401]" />
                    <span className="text-[#e25401] text-xs font-medium">2638 kcal</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tab Navigation - Responsive */}
            <div className="flex space-x-6 border-b border-[#212121] pb-2">
              <button className="flex items-center space-x-2 pb-2 border-b-2 border-[#ccd853]">
                <Utensils className="w-4 h-4 text-[#ccd853]" />
                <span className="text-[#ccd853] text-sm font-semibold">Meal Plans</span>
              </button>
              <button className="flex items-center space-x-2 pb-2 text-[#999999] hover:text-white transition-colors">
                <Flame className="w-4 h-4" />
                <span className="text-sm">Workout</span>
              </button>
              <button className="flex items-center space-x-2 pb-2 text-[#999999] hover:text-white transition-colors">
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm">Ideas</span>
              </button>
              <button className="flex items-center space-x-2 pb-2 text-[#999999] hover:text-white transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">Likes</span>
              </button>
            </div>
          </div>
          
          {/* Goal Section */}
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-white text-base font-bold">Goal</h3>
            <div className="flex items-center space-x-2 bg-[#e25401]/20 px-3 py-1 rounded-full">
              <Flame className="w-4 h-4 text-[#e25401]" />
              <span className="text-[#e25401] text-sm font-medium">700 kcal</span>
            </div>
          </div>
          
          {/* Meal Items - Responsive Cards */}
          {[
            { id: "breakfast", name: "Breakfast", icon: Sunrise },
            { id: "lunch", name: "Lunch", icon: Utensils },
            { id: "snacks", name: "Snacks", icon: Apple },
            { id: "dinner", name: "Dinner", icon: Moon },
          ].map((meal) => {
            const MealIcon = meal.icon;
            return (
              <button
                key={meal.id}
                className="w-full bg-[#111111] rounded-xl p-4 border border-[#ccd853]/20 hover:bg-[#1a1a1a] transition-colors flex items-center justify-between"
                onClick={() => toggleMeal(meal.id)}
                aria-expanded={expandedMeals[meal.id]}
                aria-label={`${meal.name} meal section`}
              >
                <div className="flex items-center space-x-3">
                  <ChevronDown className={`w-5 h-5 text-[#999999] transition-transform ${expandedMeals[meal.id] ? '' : '-rotate-90'}`} />
                  <span className="text-white text-base font-medium">{meal.name}</span>
                </div>
                <MealIcon className="w-5 h-5 text-[#999999]" />
              </button>
            );
          })}
        </div>
        
        {/* Bottom Navigation - Match other pages */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNavNew />
        </div>
      </div>
    );
  }
  
  // Desktop view - keep existing design
  return (
    <div className="relative min-h-screen w-full bg-black bg-opacity-80">
      {/* Glow Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[100%] opacity-90 blur-[250px] bg-primary/20" />
      </div>

      <div className="relative z-10 flex flex-col gap-[31px] min-h-screen pb-24">
        <header className="h-[86px] w-full self-center mt-px flex gap-[763px] bg-[#111111] border-b [border-bottom-style:solid] border-[#212121]">
          <button
            onClick={() => navigate(-1)}
            className="flex mt-[29.0px] w-9 h-9 relative ml-[64.0px] items-center gap-2.5 p-1.5 bg-[#ccd853] rounded-[18px] rotate-[180.00deg]"
            aria-label="Go back"
          >
            <div className="relative w-6 h-6 aspect-[1]">
              <ArrowLeft className="absolute w-[78.14%] h-[65.65%] top-[17.17%] left-[10.94%] rotate-[-180.00deg]" />
            </div>
          </button>
          <div className="flex w-[337px] h-[43px] items-center justify-center gap-2.5 px-4 py-2 relative mt-[21.0px] mr-[64.0px] bg-[#111111] rounded-[30px] border border-solid border-[#212121]">
            <div className="relative w-[289px] h-7">
              <div className="absolute w-[181px] h-7 top-0 left-0">
                <div className="absolute w-[181px] h-7 top-0 left-0 [font-family:'Inter-Bold',Helvetica] font-bold text-white text-xl tracking-[0] leading-[28px]">
                  Weekly Schedule
                </div>
              </div>
              <div className="absolute w-[90px] h-7 top-0 left-[199px]">
                <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
                  <div className="relative w-7 h-7 bg-[#ccd853] rounded-[200px]">
                    <Calendar className="absolute w-[64.29%] h-[64.29%] top-[17.86%] left-[17.86%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Weekly Schedule Header - Desktop */}
        <div className="flex flex-col items-center gap-6 px-16 py-6 bg-[#0c0c0c] border-b border-[#212121]">
          <div className="flex items-center justify-between w-full max-w-[1487px]">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors">
              <ChevronLeft className="w-5 h-5 text-[#999999]" />
            </button>
            <h2 className="text-white text-xl font-bold">Weekly Schedule</h2>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ccd853] hover:bg-[#b8c44a] transition-colors">
              <Download className="w-5 h-5 text-[#1e1e1e]" />
            </button>
          </div>
          
          {/* Day Navigation */}
          <div className="flex justify-center w-full max-w-[1487px]">
            <div className="flex justify-between" style={{width: '600px'}}>
              {[
                { day: 'TUE', date: '02', active: false },
                { day: 'WED', date: '03', active: true },
                { day: 'THU', date: '04', active: false },
                { day: 'FRI', date: '05', active: false },
                { day: 'SAT', date: '06', active: false },
                { day: 'SUN', date: '07', active: false },
                { day: 'MON', date: '08', active: false },
              ].map((item) => (
                <div key={item.day} className="flex flex-col items-center">
                  <span className={`text-sm ${item.active ? 'text-[#ccd853]' : 'text-[#999999]'} font-medium mb-2`}>{item.day}</span>
                  <div className="relative">
                    <span className={`text-base ${item.active ? 'text-white font-bold' : 'text-[#999999]'} font-medium`}>{item.date}</span>
                    {item.active && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ccd853] rounded-full"></div>
                    )}
                  </div>
                  {item.active && (
                    <div className="w-8 h-1 bg-[#ccd853] rounded-full mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <main className="flex flex-col items-center justify-center gap-8 px-16 py-12 relative self-stretch w-full flex-[0_0_auto] bg-[#111111]">
          <div className="flex flex-col w-[1487px] items-start gap-6 relative flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-3.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex w-[1487px] items-start justify-between relative flex-[0_0_auto]">
                    <div className="inline-flex items-start gap-[15px] relative flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-1.5 relative flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-2xl tracking-[0.48px] leading-[33.6px]">
                          {mealPlanData.title}
                        </div>
                        <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                          <p className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#9ca3af] text-base tracking-[0.32px] leading-[22.4px]">
                            Duration:{" "}
                            <span className="text-[#ccd853] font-bold">{mealPlanData.duration}</span>
                          </p>
                          <div className="inline-flex items-center justify-center gap-1 relative flex-[0_0_auto]">
                            <Flame className="relative w-5 h-5" />
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#e25401] text-base tracking-[0.32px] leading-[22.4px]">
                              {mealPlanData.totalCalories}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="flex h-[43px] items-center justify-center gap-1 px-4 py-2 relative rounded-[30px] border border-solid border-[#ccd853]">
                      <span className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-[#ccd853] text-sm tracking-[0] leading-[normal]">
                        Download
                      </span>
                      <Download className="relative w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex w-[1487px] items-start gap-6 relative flex-[0_0_auto]">
                    <div className="flex flex-col items-start gap-6 relative flex-1 grow">
                      <nav
                        className="flex w-[1487px] h-[51px] relative items-center justify-center gap-[107px] bg-[#111111]"
                        role="tablist"
                      >
                        {[
                          { id: "meal-plans", name: "Meal Plans", icon: Utensils, active: activeTab === 'meal-plans' },
                          { id: "workout", name: "Workout", icon: Flame, active: activeTab === 'workout' },
                          { id: "plan-suggestions", name: "Plan Suggestions", icon: null, active: activeTab === 'plan-suggestions' },
                        ].map((tab) => {
                          const IconComponent = tab.icon;
                          return (
                            <div
                              key={tab.id}
                              className={`relative w-[119px] h-[51px] ${tab.active ? "border-b-4 [border-bottom-style:solid] border-[#ccd853]" : ""}`}
                            >
                              <button
                                onClick={() => setActiveTab(tab.id as any)}
                                className="flex h-[51px] items-center justify-center gap-1.5 px-2.5 py-[5px] relative w-full"
                                role="tab"
                                aria-selected={tab.active}
                              >
                                {IconComponent && <IconComponent className="relative w-[18px] h-[18px]" />}
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal]">
                                  {tab.name}
                                </div>
                              </button>
                            </div>
                          );
                        })}
                      </nav>

                      <div className="flex w-[1487px] items-center justify-between relative flex-[0_0_auto]">
                        <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
                          <h2 className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-2xl tracking-[0.48px] leading-[33.6px]">
                            Goal
                          </h2>
                          <div className="inline-flex items-center justify-center gap-1 relative flex-[0_0_auto]">
                            <Flame className="relative w-5 h-5" />
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#e25401] text-xl tracking-[0.4px] leading-[28px]">
                              {mealPlanData.goalCalories}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-[1487px] flex-col items-start gap-4 relative flex-[0_0_auto]">
                        {mealPlanData.meals.map((meal) => {
                          const MealIcon = meal.icon;
                          return (
                            <div key={meal.id} className="flex flex-col items-start gap-3.5 p-6 relative self-stretch w-full rounded-2xl border border-solid border-[#212121] bg-[#111111]">
                              <button
                                onClick={() => toggleMeal(meal.id)}
                                className="flex w-[1439px] items-center justify-between relative flex-[0_0_auto]"
                                aria-expanded={expandedMeals[meal.id]}
                              >
                                <div className="inline-flex items-center gap-3.5 relative flex-[0_0_auto]">
                                  <ChevronDown className={`relative w-6 h-6 transition-transform ${expandedMeals[meal.id] ? '' : '-rotate-90'}`} />
                                  <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-xl tracking-[0.4px] leading-[28px]">
                                    {meal.name}
                                  </div>
                                </div>
                                <MealIcon className="relative w-6 h-6" />
                              </button>

                            {expandedMeals[meal.id] && (
                              <div className="flex flex-col items-start gap-3.5 relative self-stretch w-full flex-[0_0_auto]">
                                <div className="flex flex-col items-start gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
                                  {meal.items.map((item, index) => (
                                    <div key={index} className="flex w-[1439px] items-center justify-between relative flex-[0_0_auto]">
                                      <div className="inline-flex items-start gap-2.5 relative flex-[0_0_auto]">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-base tracking-[0.32px] leading-[22.4px]">
                                          {item.name}
                                        </div>
                                      </div>
                                      <div className="inline-flex items-center gap-[15px] relative flex-[0_0_auto]">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#9ca3af] text-base tracking-[0.32px] leading-[22.4px]">
                                          {item.amount}
                                        </div>
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#e25401] text-base tracking-[0.32px] leading-[22.4px]">
                                          {item.calories}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Bottom Navigation - Desktop */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNavNew />
        </div>
      </div>
    </div>
  );
}