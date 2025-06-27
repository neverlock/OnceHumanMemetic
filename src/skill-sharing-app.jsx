import React, { useState, useRef } from 'react';
import { Plus, Minus, GripVertical, Check, Settings, X, Save, Upload } from 'lucide-react';

const SkillSharingApp = () => {
  const [nameInput, setNameInput] = useState('');
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [hashCode, setHashCode] = useState('');
  const [loadInput, setLoadInput] = useState('');

  // Data for each tab
  const [tabsData, setTabsData] = useState({});

  // แมป level ไปยัง skill set
  const levelToSkillSet = {
    5: '5-10-15', 10: '5-10-15', 15: '5-10-15',
    20: '20-25-30-35', 25: '20-25-30-35', 30: '20-25-30-35', 35: '20-25-30-35',
    40: '40-45-50', 45: '40-45-50', 50: '40-45-50'
  };

  // Sample image data for each skill set
  const imageData = {
    '5-10-15': [
      { 
        id: 'img1_1', 
        name: 'Furnace: Precision Refining', 
        thumbnailUrl: './images/5-15/1.webp',
        fullUrl: './images/5-15/1.webp',
        description: 'Resource Consumption -30%, and Smelting Time -30% when smelting Copper, Bronze, Steel, Aluminum, and Tungsten Ingots using a Furnace or Electric Furnace',
        skills: ['Smelter', 'Gathering', 'Facility Boost: Furnace'],
        scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']
      },
      { 
        id: 'img1_2', 
        name: 'Load Handling', 
        thumbnailUrl: './images/5-15/2.webp',
        fullUrl: './images/5-15/2.webp',
        description: 'When in your Backpack, it reduces the weight of Logs, Gravels and Ores you carry by 40%-80% Effect cannot stack',
        skills: ['Prospector', 'Gathering', 'New Formula: Load Handling'],
        scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']
      },
      { 
        id: 'img1_3', 
        name: 'Pickaxe: Moonlight Mining', 
        thumbnailUrl: './images/5-15/3.webp',
        fullUrl: './images/5-15/3.webp',
        description: 'When using the Pickaxe for Mining, increase the yield of Copper, Tin, Iron, Aluminum, and Tungsten Ore by 25%. Effect doubles at night (21:00 - 06:00)',
        skills: ['Prospector', 'Gathering', 'Improved Formula: Pickaxe'],
        scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']
      },
      { 
        id: 'img1_4', 
        name: 'Pickaxe: Forest Foe', 
        thumbnailUrl: './images/5-15/4.webp',
        fullUrl: './images/5-15/4.webp',
        description: 'Pickaxe Durability is doubled. +30% yield when logging with the Pickaxe, and gain 150% of the resources when you completely destroy a tree',
        skills: ['Prospector', 'Gathering', 'Improved Formula: Pickaxe'],
        scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']
      }
    ],
    '20-25-30-35': [
      { 
        id: 'img2_1', 
        name: 'Sword Iron', 
        thumbnailUrl: './images/20-35/sword-iron.webp',
        fullUrl: './images/20-35/sword-iron.webp',
        description: 'Iron forged sword with enhanced damage',
        skills: ['Attack +25', 'Critical: 15%', 'Durability: 120'],
        scenarios: ['Advanced Combat', 'Raid Leader', 'Tournament Fight']
      },
      { 
        id: 'img2_2', 
        name: 'Shield Iron', 
        thumbnailUrl: './images/20-35/shield-iron.webp',
        fullUrl: './images/20-35/shield-iron.webp',
        description: 'Iron shield with improved defense',
        skills: ['Defense +20', 'Block Rate: 50%', 'Counter Attack: 10%'],
        scenarios: ['Tank Role', 'Guild War', 'Boss Protection']
      },
      { 
        id: 'img2_3', 
        name: 'Armor Leather', 
        thumbnailUrl: './images/20-35/armor-leather.webp',
        fullUrl: './images/20-35/armor-leather.webp',
        description: 'Leather armor for mobility and protection',
        skills: ['Defense +15', 'Agility +5', 'Stealth: +10%'],
        scenarios: ['Rogue Build', 'Speed Run', 'Assassin Mission']
      },
      { 
        id: 'img2_4', 
        name: 'Staff Magic', 
        thumbnailUrl: './images/20-35/staff-magic.webp',
        fullUrl: './images/20-35/staff-magic.webp',
        description: 'Magical staff that amplifies spells',
        skills: ['Magic Power +30', 'MP Cost -20%', 'Cast Speed +15%'],
        scenarios: ['Mage Build', 'Magic Tournament', 'Spell Research']
      }
    ],
    '40-45-50': [
      { 
        id: 'img3_1', 
        name: 'Sword Master', 
        thumbnailUrl: './images/40-50/sword-master.webp',
        fullUrl: './images/40-50/sword-master.webp',
        description: 'Legendary sword of master warriors',
        skills: ['Attack +50', 'Critical: 35%', 'Life Steal: 10%'],
        scenarios: ['Legend Quest', 'Ultimate Boss', 'Championship']
      },
      { 
        id: 'img3_2', 
        name: 'Shield Dragon', 
        thumbnailUrl: './images/40-50/shield-dragon.webp',
        fullUrl: './images/40-50/shield-dragon.webp',
        description: 'Dragon-scale shield with fire resistance',
        skills: ['Defense +40', 'Fire Resist: 80%', 'Reflect Damage: 25%'],
        scenarios: ['Dragon Hunt', 'Fire Dungeon', 'Epic Raid']
      },
      { 
        id: 'img3_3', 
        name: 'Armor Mythril', 
        thumbnailUrl: './images/40-50/armor-mythril.webp',
        fullUrl: './images/40-50/armor-mythril.webp',
        description: 'Mythril armor with magical properties',
        skills: ['Defense +35', 'Magic Resist: 60%', 'HP Regen: +5/s'],
        scenarios: ['Mythic Battle', 'End Game', 'Legendary Mode']
      },
      { 
        id: 'img3_4', 
        name: 'Ring Power', 
        thumbnailUrl: './images/40-50/ring-power.webp',
        fullUrl: './images/40-50/ring-power.webp',
        description: 'Ancient ring of ultimate power',
        skills: ['All Stats +20', 'EXP Gain: +50%', 'Rare Drop: +25%'],
        scenarios: ['Master Class', 'Perfect Game', 'Ultimate Challenge']
      }
    ]
  };

  // Get current tab data
  const getCurrentTabData = () => {
    if (!activeTab) return {
      selectedLevel: '',
      selectedLevels: {},
      selectedSkillsForActive: {},
      showSecondDropdown: false,
      currentLevelForSelection: null
    };
    
    return tabsData[activeTab] || {
      selectedLevel: '',
      selectedLevels: {},
      selectedSkillsForActive: {},
      showSecondDropdown: false,
      currentLevelForSelection: null
    };
  };

  // Update current tab data
  const updateCurrentTabData = (updates) => {
    if (!activeTab) return;
    
    setTabsData(prev => ({
      ...prev,
      [activeTab]: {
        ...getCurrentTabData(),
        ...updates
      }
    }));
  };

  // สร้าง level options ทีละ 5 level
  const getLevelOptions = () => {
    const options = [];
    for (let i = 5; i <= 50; i += 5) {
      options.push(i);
    }
    return options;
  };

  const handleAddName = () => {
    if (nameInput.trim()) {
      const newTabId = Date.now().toString();
      const newTab = {
        id: newTabId,
        name: nameInput.trim()
      };
      
      setTabs(prev => [...prev, newTab]);
      setActiveTab(newTabId);
      setTabsData(prev => ({
        ...prev,
        [newTabId]: {
          selectedLevel: '',
          selectedLevels: {},
          selectedSkillsForActive: {},
          showSecondDropdown: false,
          currentLevelForSelection: null
        }
      }));
      setNameInput('');
    }
  };

  const handleRemoveTab = (tabId, e) => {
    e.stopPropagation();
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(updatedTabs);
    
    // Remove tab data
    setTabsData(prev => {
      const newData = { ...prev };
      delete newData[tabId];
      return newData;
    });
    
    // Set new active tab
    if (activeTab === tabId) {
      setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].id : null);
    }
  };

  const handleAddLevel = () => {
    const currentData = getCurrentTabData();
    if (currentData.selectedLevel) {
      const level = parseInt(currentData.selectedLevel);
      updateCurrentTabData({
        currentLevelForSelection: level,
        showSecondDropdown: true
      });
    }
  };

  const handleSkillSelect = (skillId) => {
    const currentData = getCurrentTabData();
    const level = currentData.currentLevelForSelection;
    const skillSet = levelToSkillSet[level];
    const selectedSkill = imageData[skillSet]?.find(skill => skill.id === skillId);
    
    if (selectedSkill) {
      const currentSkills = currentData.selectedLevels[level] || [];
      if (!currentSkills.find(skill => skill.id === skillId)) {
        updateCurrentTabData({
          selectedLevels: {
            ...currentData.selectedLevels,
            [level]: [...currentSkills, selectedSkill]
          },
          showSecondDropdown: false,
          selectedLevel: '',
          currentLevelForSelection: null
        });
      }
    }
  };

  const handleRemoveSkill = (level, skillId) => {
    const currentData = getCurrentTabData();
    const currentSkills = currentData.selectedLevels[level] || [];
    const updatedSkills = currentSkills.filter(skill => skill.id !== skillId);
    
    let newActiveSkills = { ...currentData.selectedSkillsForActive };
    if (newActiveSkills[level] === skillId) {
      delete newActiveSkills[level];
    }
    
    let newSelectedLevels = { ...currentData.selectedLevels };
    if (updatedSkills.length === 0) {
      delete newSelectedLevels[level];
    } else {
      newSelectedLevels[level] = updatedSkills;
    }
    
    updateCurrentTabData({
      selectedLevels: newSelectedLevels,
      selectedSkillsForActive: newActiveSkills
    });
  };

  const handleSkillActivate = (level, skillId) => {
    const currentData = getCurrentTabData();
    updateCurrentTabData({
      selectedSkillsForActive: {
        ...currentData.selectedSkillsForActive,
        [level]: skillId
      }
    });
  };

  const handleSave = () => {
    const saveData = {
      tabs: tabs,
      tabsData: tabsData
    };
    const encoded = btoa(JSON.stringify(saveData));
    setHashCode(encoded);
  };

  const handleLoad = () => {
    try {
      const decoded = JSON.parse(atob(loadInput));
      setTabs(decoded.tabs || []);
      setTabsData(decoded.tabsData || {});
      setActiveTab(decoded.tabs && decoded.tabs.length > 0 ? decoded.tabs[0].id : null);
      setLoadInput('');
      setShowSettings(false);
    } catch (error) {
      alert('Invalid hash code');
    }
  };

  const currentData = getCurrentTabData();
  const sortedLevels = Object.keys(currentData.selectedLevels).map(Number).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header with Settings */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Up Skill Sharing
          </h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Settings size={20} />
            Settings
          </button>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Save Section */}
                <div>
                  <button
                    onClick={handleSave}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium mb-4"
                  >
                    <Save size={20} />
                    Save Configuration
                  </button>
                  {hashCode && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Hash Code (Copy this):</label>
                      <textarea
                        value={hashCode}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                        rows="3"
                        onClick={(e) => e.target.select()}
                      />
                    </div>
                  )}
                </div>

                {/* Load Section */}
                <div>
                  <label className="block text-sm font-medium mb-2">Load Configuration:</label>
                  <textarea
                    value={loadInput}
                    onChange={(e) => setLoadInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-4"
                    rows="3"
                    placeholder="Paste hash code here"
                  />
                  <button
                    onClick={handleLoad}
                    disabled={!loadInput.trim()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                  >
                    <Upload size={20} />
                    Load
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Name Input */}
        <div className="mb-6 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="Enter your name"
              onKeyPress={(e) => e.key === 'Enter' && handleAddName()}
            />
          </div>
          <button
            onClick={handleAddName}
            disabled={!nameInput.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>

        {/* Tabs */}
        {tabs.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.name}</span>
                  <button
                    onClick={(e) => handleRemoveTab(tab.id, e)}
                    className={`rounded-full p-1 transition-colors ${
                      activeTab === tab.id
                        ? 'hover:bg-blue-600 text-white'
                        : 'hover:bg-gray-300 text-gray-500'
                    }`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content - Only show if there's an active tab */}
        {activeTab && (
          <>
            {/* Level Selection and Add Button */}
            <div className="mb-6 flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-lg font-medium mb-2">Select Level</label>
                <select
                  value={currentData.selectedLevel}
                  onChange={(e) => updateCurrentTabData({ selectedLevel: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  {getLevelOptions().map(level => (
                    <option key={level} value={level}>
                      Level {level}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddLevel}
                disabled={!currentData.selectedLevel}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus size={20} />
                Add
              </button>
            </div>

            {/* Skill Selection Dropdown */}
            {currentData.showSecondDropdown && currentData.currentLevelForSelection && (
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                  Select Skill for Level {currentData.currentLevelForSelection}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-2 border-gray-300 rounded-lg bg-gray-50">
                  {imageData[levelToSkillSet[currentData.currentLevelForSelection]]?.map((skill) => (
                    <div
                      key={skill.id}
                      onClick={() => handleSkillSelect(skill.id)}
                      className="cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-white"
                    >
                      <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded border flex items-center justify-center mb-3 relative overflow-hidden">
                        <img 
                          src={skill.thumbnailUrl} 
                          alt={skill.name}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <span className="text-2xl hidden absolute inset-0 items-center justify-center bg-gray-100">🛡️</span>
                      </div>
                      <p className="text-sm text-center text-gray-700 font-medium">{skill.name}</p>
                      <p className="text-xs text-center text-gray-500 mt-1">Click to select</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Skills Display by Level */}
            {sortedLevels.length > 0 && (
              <div className="mb-6 space-y-6">
                <h3 className="text-lg font-medium">Selected Skills</h3>
                {sortedLevels.map((level) => {
                  const levelSkills = currentData.selectedLevels[level] || [];
                  return (
                    <div key={level} className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-blue-600">LV {level}</h4>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">{levelSkills.length} skill(s) selected</span>
                          {currentData.selectedSkillsForActive[level] && (
                            <span className="text-sm text-red-600 font-medium">
                              Active: {levelSkills.find(s => s.id === currentData.selectedSkillsForActive[level])?.name}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* แสดง skills แบบเต็มความกว้าง */}
                      <div className="space-y-4">
                        {levelSkills.map((skill) => {
                          const isActive = currentData.selectedSkillsForActive[level] === skill.id;
                          return (
                            <div
                              key={skill.id}
                              onClick={() => handleSkillActivate(level, skill.id)}
                              className={`relative rounded-lg p-4 border-2 cursor-pointer transition-all duration-200 ${
                                isActive 
                                  ? 'border-red-500 bg-red-50 ring-2 ring-red-200' 
                                  : 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                              }`}
                            >
                              {/* Active indicator */}
                              {isActive && (
                                <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                                  <Check size={16} />
                                </div>
                              )}
                              
                              <div className="flex items-start justify-between mb-3">
                                <h5 className="font-semibold text-gray-800 text-lg">{skill.name}</h5>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveSkill(level, skill.id);
                                  }}
                                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-100 transition-colors"
                                >
                                  <Minus size={16} />
                                </button>
                              </div>
                              
                              <div className="flex gap-6">
                                {/* Skill Icon */}
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded border flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                                  <img 
                                    src={skill.fullUrl} 
                                    alt={skill.name}
                                    className="w-full h-full object-cover rounded"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                  />
                                  <span className="text-2xl hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">🛡️</span>
                                </div>
                                
                                {/* Skill Details */}
                                <div className="flex-1">
                                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{skill.description}</p>
                                  
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <h6 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Skills:</h6>
                                      <div className="flex flex-wrap gap-1">
                                        {skill.skills?.map((skillItem, skillIndex) => (
                                          <div key={skillIndex} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                                            {skillItem}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <h6 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Scenarios:</h6>
                                      <div className="flex flex-wrap gap-1">
                                        {skill.scenarios?.map((scenario, scenarioIndex) => (
                                          <div key={scenarioIndex} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                                            {scenario}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Click hint */}
                              <div className="mt-3 text-xs text-center text-gray-500">
                                {isActive ? 'Active Skill (Click to deactivate)' : 'Click to activate this skill'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Show message if no tabs */}
        {tabs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Add a name to start creating your skill configuration</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSharingApp;