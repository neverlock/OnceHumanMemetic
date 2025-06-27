import React, { useState, useRef } from 'react';
import { Plus, Minus, GripVertical } from 'lucide-react';

const SkillSharingApp = () => {
  const [name, setName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedLevels, setSelectedLevels] = useState({});
  const [hashCode, setHashCode] = useState('');
  const [loadInput, setLoadInput] = useState('');
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const [currentLevelForSelection, setCurrentLevelForSelection] = useState(null);

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
        name: 'Sword Basic', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Basic sword for beginners',
        skills: ['Attack +10', 'Durability: 50', 'Weight: Light'],
        scenarios: ['Combat Training', 'Dungeon Exploration', 'PvP Battle']
      },
      { 
        id: 'img1_2', 
        name: 'Shield Wood', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Wooden shield for basic protection',
        skills: ['Defense +8', 'Block Rate: 30%', 'Weight: Medium'],
        scenarios: ['Defense Training', 'Team Formation', 'Castle Siege']
      },
      { 
        id: 'img1_3', 
        name: 'Potion Health', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Restores basic health points',
        skills: ['HP Recovery: 50', 'Usage: Instant', 'Cooldown: 5s'],
        scenarios: ['Emergency Healing', 'Boss Fight', 'Survival Mode']
      },
      { 
        id: 'img1_4', 
        name: 'Bow Simple', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Simple bow for ranged attacks',
        skills: ['Range Attack +12', 'Accuracy: 70%', 'Range: Medium'],
        scenarios: ['Hunting', 'Tower Defense', 'Stealth Mission']
      }
    ],
    '20-25-30-35': [
      { 
        id: 'img2_1', 
        name: 'Sword Iron', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Iron forged sword with enhanced damage',
        skills: ['Attack +25', 'Critical: 15%', 'Durability: 120'],
        scenarios: ['Advanced Combat', 'Raid Leader', 'Tournament Fight']
      },
      { 
        id: 'img2_2', 
        name: 'Shield Iron', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Iron shield with improved defense',
        skills: ['Defense +20', 'Block Rate: 50%', 'Counter Attack: 10%'],
        scenarios: ['Tank Role', 'Guild War', 'Boss Protection']
      },
      { 
        id: 'img2_3', 
        name: 'Armor Leather', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Leather armor for mobility and protection',
        skills: ['Defense +15', 'Agility +5', 'Stealth: +10%'],
        scenarios: ['Rogue Build', 'Speed Run', 'Assassin Mission']
      },
      { 
        id: 'img2_4', 
        name: 'Staff Magic', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Magical staff that amplifies spells',
        skills: ['Magic Power +30', 'MP Cost -20%', 'Cast Speed +15%'],
        scenarios: ['Mage Build', 'Magic Tournament', 'Spell Research']
      }
    ],
    '40-45-50': [
      { 
        id: 'img3_1', 
        name: 'Sword Master', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Legendary sword of master warriors',
        skills: ['Attack +50', 'Critical: 35%', 'Life Steal: 10%'],
        scenarios: ['Legend Quest', 'Ultimate Boss', 'Championship']
      },
      { 
        id: 'img3_2', 
        name: 'Shield Dragon', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Dragon-scale shield with fire resistance',
        skills: ['Defense +40', 'Fire Resist: 80%', 'Reflect Damage: 25%'],
        scenarios: ['Dragon Hunt', 'Fire Dungeon', 'Epic Raid']
      },
      { 
        id: 'img3_3', 
        name: 'Armor Mythril', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Mythril armor with magical properties',
        skills: ['Defense +35', 'Magic Resist: 60%', 'HP Regen: +5/s'],
        scenarios: ['Mythic Battle', 'End Game', 'Legendary Mode']
      },
      { 
        id: 'img3_4', 
        name: 'Ring Power', 
        thumbnailUrl: '/api/placeholder/60/60',
        fullUrl: '/api/placeholder/120/120',
        description: 'Ancient ring of ultimate power',
        skills: ['All Stats +20', 'EXP Gain: +50%', 'Rare Drop: +25%'],
        scenarios: ['Master Class', 'Perfect Game', 'Ultimate Challenge']
      }
    ]
  };

  // สร้าง level options ทีละ 5 level
  const getLevelOptions = () => {
    const options = [];
    for (let i = 5; i <= 50; i += 5) {
      options.push(i);
    }
    return options;
  };

  const handleAddLevel = () => {
    if (selectedLevel) {
      const level = parseInt(selectedLevel);
      setCurrentLevelForSelection(level);
      setShowSecondDropdown(true);
    }
  };

  const handleSkillSelect = (skillId) => {
    const level = currentLevelForSelection;
    const skillSet = levelToSkillSet[level];
    const selectedSkill = imageData[skillSet]?.find(skill => skill.id === skillId);
    
    if (selectedSkill) {
      // เพิ่ม skill ใหม่เข้าไปใน level
      const currentSkills = selectedLevels[level] || [];
      // ตรวจสอบว่า skill นี้ยังไม่ได้ถูกเลือกใน level นี้
      if (!currentSkills.find(skill => skill.id === skillId)) {
        setSelectedLevels({
          ...selectedLevels,
          [level]: [...currentSkills, selectedSkill]
        });
      }
    }
    
    setShowSecondDropdown(false);
    setSelectedLevel('');
    setCurrentLevelForSelection(null);
  };

  const handleRemoveSkill = (level, skillId) => {
    const currentSkills = selectedLevels[level] || [];
    const updatedSkills = currentSkills.filter(skill => skill.id !== skillId);
    
    if (updatedSkills.length === 0) {
      // ถ้าไม่มี skill เหลือใน level นี้ ให้ลบ level ออก
      const newSelectedLevels = { ...selectedLevels };
      delete newSelectedLevels[level];
      setSelectedLevels(newSelectedLevels);
    } else {
      setSelectedLevels({
        ...selectedLevels,
        [level]: updatedSkills
      });
    }
  };

  const handleSave = () => {
    const saveData = {
      name,
      levels: selectedLevels
    };
    const encoded = btoa(JSON.stringify(saveData));
    setHashCode(encoded);
  };

  const handleLoad = () => {
    try {
      const decoded = JSON.parse(atob(loadInput));
      setName(decoded.name || '');
      setSelectedLevels(decoded.levels || {});
      setLoadInput('');
    } catch (error) {
      alert('Invalid hash code');
    }
  };

  // เรียงลำดับ level ที่ถูกเลือก
  const sortedLevels = Object.keys(selectedLevels).map(Number).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Up Skill Sharing
        </h1>
        
        {/* Name Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Level Selection and Add Button */}
        <div className="mb-6 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-lg font-medium mb-2">Select Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
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
            disabled={!selectedLevel}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>

        {/* Skill Selection Dropdown */}
        {showSecondDropdown && currentLevelForSelection && (
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Select Skill for Level {currentLevelForSelection}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border-2 border-gray-300 rounded-lg bg-gray-50">
              {imageData[levelToSkillSet[currentLevelForSelection]]?.map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => handleSkillSelect(skill.id)}
                  className="cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-white"
                >
                  <div className="w-full h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded border flex items-center justify-center mb-2">
                    <span className="text-xs font-medium text-gray-600">🛡️</span>
                  </div>
                  <p className="text-xs text-center text-gray-700 font-medium truncate">{skill.name}</p>
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
              const levelSkills = selectedLevels[level] || [];
              return (
                <div key={level} className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-blue-600">LV {level}</h4>
                    <span className="text-sm text-gray-500">{levelSkills.length} skill(s) selected</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {levelSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="relative bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold text-gray-800">{skill.name}</h5>
                          <button
                            onClick={() => handleRemoveSkill(level, skill.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                          >
                            <Minus size={16} />
                          </button>
                        </div>
                        
                        <div className="flex gap-4">
                          {/* Skill Icon */}
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded border flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">🛡️</span>
                          </div>
                          
                          {/* Skill Details */}
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
                            <div className="space-y-1">
                              <h6 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Skills:</h6>
                              <div className="flex flex-wrap gap-1">
                                {skill.skills?.map((skillItem, skillIndex) => (
                                  <div key={skillIndex} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                    {skillItem}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-1 mt-2">
                              <h6 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Scenarios:</h6>
                              <div className="flex flex-wrap gap-1">
                                {skill.scenarios?.map((scenario, scenarioIndex) => (
                                  <div key={scenarioIndex} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                                    {scenario}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Save and Load Section */}
        <div className="border-t pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Save Section */}
            <div>
              <button
                onClick={handleSave}
                className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium mb-4"
              >
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
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                Load
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSharingApp;
