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
  { id: 'img1_1',name: 'Furnace: Precision Refining',thumbnailUrl: './images/5-15/1.webp',fullUrl: './images/5-15/1.webp',description: 'Resource Consumption -30%, and Smelting Time -30% when smelting Copper, Bronze, Steel, Aluminum, and Tungsten Ingots using a Furnace or Electric Furnace',skills: ['Smelter', 'Gathering', 'Facility Boost: Furnace'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']},
  { id: 'img1_2',name: 'Load Handling',thumbnailUrl: './images/5-15/2.webp',fullUrl: './images/5-15/2.webp',description: 'When in your Backpack, it reduces the weight of Logs, Gravels and Ores you carry by 40%-80% Effect cannot stack',skills: ['Prospector', 'Gathering', 'New Formula: Load Handling'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']},
  { id: 'img1_3',name: 'Pickaxe: Moonlight Mining',thumbnailUrl: './images/5-15/3.webp',fullUrl: './images/5-15/3.webp',description: 'When using the Pickaxe for Mining, increase the yield of Copper, Tin, Iron, Aluminum, and Tungsten Ore by 25%. Effect doubles at night (21:00 - 06:00)',skills: ['Prospector', 'Gathering', 'Improved Formula: Pickaxe'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']},
  { id: 'img1_4',name: 'Pickaxe: Forest Foe',thumbnailUrl: './images/5-15/4.webp',fullUrl: './images/5-15/4.webp',description: 'Pickaxe Durability is doubled. +30% yield when logging with the Pickaxe, and gain 150% of the resources when you completely destroy a tree',skills: ['Prospector', 'Gathering', 'Improved Formula: Pickaxe'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']},
  { id: 'img1_5',name: 'Disassembly Bench: Careful Disassembly', thumbnailUrl: './images/5-15/5.webp',fullUrl: './images/5-15/5.webp',description: 'Yield +30% when disassembling Parts, Fabrics, and Plastic',skills: ['Smelter', 'Gathering', 'Facility Boost: Disassembly Bench'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']},
  { id: 'img1_6',name: 'Super Refinery',thumbnailUrl: './images/5-15/6.webp',fullUrl: './images/5-15/6.webp',description: 'Transform Acid into Portable Mixed Fuel more efficiently',skills: ['Smelter', 'Gathering', 'New Facility: Super Refinery'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']},
  { id: 'img1_7',name: 'Gear Workbench: Customization',thumbnailUrl: './images/5-15/7.webp',fullUrl: './images/5-15/7.webp',description: 'Weapons and Armor crafted using the Gear Workbench have +30% Max Durability',skills: ['Master Craftsman', 'Crafting', 'Gear Workbench'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash','Way Of Winter']},
  { id: 'img1_8',  name: 'Explosive On-the-Go',thumbnailUrl: './images/5-15/8.webp',  fullUrl: './images/5-15/8.webp',  description: 'When in your backpack, reduce the weight of Grenades, Molotov Cocktails, High Explosives, Shrapnel Grenades, Thermite Grenades, Rocket Launcher Rockets, and Grenade Launcher Grenades by 30% - 60%. After using a throwable, increase Sprint Speed by 20% for 2s', skills: ['Demolition Expert', 'Crafting', 'New Formula: Explosive On-the-Go'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_9',  name: 'Electronics Grabber', thumbnailUrl: './images/5-15/9.webp',  fullUrl: './images/5-15/9.webp',  description: 'When in your backpack, there is a small to medium chance to receive additional electronic modules when opening a Storage Crate', skills: ['Machinist', 'Crafting', 'New Formula: Electronics Grabber'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_10', name: 'Disassembly Bench: Electronic Recycling', thumbnailUrl: './images/5-15/10.webp', fullUrl: './images/5-15/10.webp', description: 'Yield +50% for Metal Scrap and Electronic Parts', skills: ['Machinist', 'Crafting', 'Facility Boost: Disassembly Bench'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_11', name: 'Throwing Dagger: Bullseye', thumbnailUrl: './images/5-15/11.webp', fullUrl: './images/5-15/11.webp', description: 'Throwing Dagger +30% DMG. After killing an enemy with a Throwing Dagger, the next throw +100% DMG', skills: ['Demolition Expert', 'Crafting', 'Improved Formula: Throwing Dagger'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_12', name: 'Jump Booster', thumbnailUrl: './images/5-15/12.webp', fullUrl: './images/5-15/12.webp', description: 'Use to gain the double jump ability for 30 seconds. Can use up to 5 times', skills: ['Machinist', 'Crafting', 'New Formula: Jump Booster'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_13', name: 'Explosive Sack', thumbnailUrl: './images/5-15/13.webp', fullUrl: './images/5-15/13.webp', description: 'When in your backpack, there is a 30% - 60% chance to salvage Explosive Compound after using High-Explosive Grenades, Shrapnel Grenades, and Simple Explosives. There is a 30% - 60% chance to salvage Sulfur after using Molotov Cocktails and Thermite Grenades', skills: ['Demolition Expert', 'Crafting', 'New Formula: Explosive Sack'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_14', name: 'Backpack Expansion', thumbnailUrl: './images/5-15/14.webp', fullUrl: './images/5-15/14.webp', description: 'When in your backpack, increase Max Load by 40 - 80', skills: ['Master Craftsman', 'Crafting', 'New Formula: Backpack Expansion'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_15', name: 'Supplies Workbench: Ammo Factory', thumbnailUrl: './images/5-15/15.webp', fullUrl: './images/5-15/15.webp', description: 'Supplies Workbench Crafting Output +50% when crafting regular Ammunition', skills: ['Master Craftsman', 'Crafting', 'Facility Boost: Supplies Workbench'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_16', name: 'Chef\'s Knife', thumbnailUrl: './images/5-15/16.webp', fullUrl: './images/5-15/16.webp', description: 'When in your backpack, Meat yield +1 when Field Dressing animals, with a 30% - 60% chance to yield additional byproducts', skills: ['Star Chef', 'Management', 'New Formula: Chef\'s Knife'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_17', name: 'Portable Diving Gear', thumbnailUrl: './images/5-15/17.webp', fullUrl: './images/5-15/17.webp', description: 'When in your backpack, increase Oxygen by 40% - 100% and Swimming Speed by 20% - 40% when dving', skills: ['Hydro Engineer', 'Management', 'New Forumula: Portable Diving Gear'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_18', name: 'Roasted & Dried: Low and Slow', thumbnailUrl: './images/5-15/18.webp', fullUrl: './images/5-15/18.webp', description: 'Roasted and Dried Dishes now provide +15 Energy, and +10% Sanity', skills: ['Star Chef', 'Management', 'Improved Formula: Roasted'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_19', name: 'Stove: Long-Term Storage', thumbnailUrl: './images/5-15/19.webp', fullUrl: './images/5-15/19.webp', description: 'Doubles the shelf life of Dishes you cook yourself', skills: ['Star Chef', 'Management', 'Facility Boost: Stove'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_20', name: 'Portable Rainwater Collection System', thumbnailUrl: './images/5-15/20.webp', fullUrl: './images/5-15/20.webp', description: 'When in your backpack, slowly recover Hydration, and a 30% - 60% chance to receive 1 Dirty Water, Pure Water, or Acid every minute when it rains', skills: ['Hydro Engineer', 'Management', 'New Formula: Portable Rainwater Collection System'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_21', name: 'Gardening Gloves', thumbnailUrl: './images/5-15/21.webp', fullUrl: './images/5-15/21.webp', description: 'When in your backpack, there is a 6% - 12% chance to double the seeds when acquiring plant seeds', skills: ['Child of the Earth', 'Management', 'New Formula: Gardening Gloves'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_22', name: 'Harvesting Sickle', thumbnailUrl: './images/5-15/22.webp', fullUrl: './images/5-15/22.webp', description: 'When in your backpack, there is a 20% - 40% chance to double the yield when gathering in the wilderness', skills: ['Child of the Earth', 'Management', 'New Formula: Harvesting Sickle'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_23', name: 'Compost Bin', thumbnailUrl: './images/5-15/23.webp', fullUrl: './images/5-15/23.webp', description: 'When in your backpack, if there is Spoiled Food in your Backpack, 1 - 3 Spoiled Foods will be consumed every 10 - 5 minutes, and be turned into Mushrooms or random Fertilizer', skills: ['Child of the Earth', 'Management', 'New Formula: Compost Bin'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_24', name: 'Activated Carbon Filter', thumbnailUrl: './images/5-15/24.webp', fullUrl: './images/5-15/24.webp', description: 'When in your backpack, when gathering water with a flask, there is a 30% chance to receive Boiled or Pure Water', skills: ['Hydro Engineer', 'Management', 'New Formula: Activated Carbon Filter'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_25', name: 'Flamethrower Trap: Scorching Blast', thumbnailUrl: './images/5-15/25.webp', fullUrl: './images/5-15/25.webp', description: 'Flamethrower Trap DMG +30%. When the Flamethrower Trap kills an enemy, an explosion is triggered, dealing AoE Blast DMG to all nearby units (1s cooldown)', skills: ['Artillery Marshal', 'Building', 'Facility Boost: Flamethrower Trap'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_26', name: 'Robotics Facility: Skilled Mechanician', thumbnailUrl: './images/5-15/26.webp', fullUrl: './images/5-15/26.webp', description: 'Increase the Durability of Traps and Rifle Turret type facilities by 50%', skills: ['Artillery Marshal', 'Building', 'Facility Boost: Robotics Facility'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_27', name: 'Wood Structures: Tough Plant', thumbnailUrl: './images/5-15/27.webp', fullUrl: './images/5-15/27.webp', description: 'Structures built from wood gain the Tough Plant effect, and durability +150%', skills: ['Tinkerer', 'Building', 'Facility Boost: Wood Structures'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_28', name: 'Bed: A Place to Call Home', thumbnailUrl: './images/5-15/28.webp', fullUrl: './images/5-15/28.webp', description: 'Sleep for more then 10s to cure all disease and reduce Stamina depletion for the next 10 minutes', skills: ['Tinkerer', 'Building', 'Facility Boost: Bed'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_29', name: 'Special Storage Crate', thumbnailUrl: './images/5-15/29.webp', fullUrl: './images/5-15/29.webp', description: 'A large Storage Crate with 64 item slots', skills: ['Tinkerer', 'Building', 'New Facility: Custom Storage Crate'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_30', name: 'Basic Defense: Battle-Hardened', thumbnailUrl: './images/5-15/30.webp', fullUrl: './images/5-15/30.webp', description: 'Sandbags, Shelters, and High Fortifications gain the Battle-Hardened effect, Durability +100%. When your Territory exits combat, Durability recovers to 100%', skills: ['Artillery Marshal', 'Building', 'Facility Boost: Basic Defense'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_31', name: 'Furnace: Large Furnace', thumbnailUrl: './images/5-15/31.webp', fullUrl: './images/5-15/31.webp', description: 'For every 5°C increase in the environmental temperature, output increase by 1% with no uppper limit', skills: ['', '', 'Facility Boost: Furnace'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_32', name: 'Supplies Workbench: Forest Hunter', thumbnailUrl: './images/5-15/32.webp', fullUrl: './images/5-15/32.webp', description: 'Crossbow Bolt output +50% and crafting time -50%', skills: ['', '', 'Improved Formula: Supplies Workbench'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_33', name: 'Snowmobile', thumbnailUrl: './images/5-15/33.webp', fullUrl: './images/5-15/33.webp', description: 'Can be crafted at the Supplies Workbench. Movement Speed in snow +20%, Movement Speed in blizzards +10%,Cold Resist +10', skills: ['', '', 'Unlock New Formula: Snowmobile'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_34', name: 'Blade Fan', thumbnailUrl: './images/5-15/34.webp', fullUrl: './images/5-15/34.webp', description: 'Made of multiple Throwing Daggers. Upon hitting a target, it triggers different effects based on the Throwing Daggers used.', skills: ['', '', 'Unlock New Formula: Blade Fan'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_35', name: 'Spicy Pepper', thumbnailUrl: './images/5-15/35.webp', fullUrl: './images/5-15/35.webp', description: 'Dishes that include Spicy Pepper as an ingredient are 30% more effective. When consumed, they deal DMG equal to 10% PSI Intensity to nearby enemies , with a 30% chance to deal additional DMG equal to 90% PSI Intensity and inflict 1 stack of Burn', skills: ['', '', 'Improved Formula: Spicy Pepper Dishes'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_36', name: 'Nurture Injection', thumbnailUrl: './images/5-15/36.webp', fullUrl: './images/5-15/36.webp', description: 'Gattering will grant 1 Coherence Point Stack These stacks will be lost after receiving damage equal of your 70% Max HP', skills: ['Guarnteed if Playing as Mayfly in 1st Slot(LVL 5)', 'If playing as Rosetta: Can appear on 2nd or 3rd slot(LVL 10-15)', 'Mayfly Guarantee(LVL5)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_37', name: 'Judgement Injection', thumbnailUrl: './images/5-15/37.webp', fullUrl: './images/5-15/37.webp', description: 'Anything you kill will grant 1 Coherence Point These stacks will be lost after receiving damage equal of your 70% Max HP', skills: ['Guarnteed if Playing as Mayfly in 1st Slot(LVL 5)', 'If playing as Rosetta: Can appear on 2nd or 3rd slot(LVL 10-15)', 'Mayfly Guarantee(LVL5)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_38', name: 'Speed Injection', thumbnailUrl: './images/5-15/38.webp', fullUrl: './images/5-15/38.webp', description: 'Moving for 2s (or sitting in car) will grant 1 Coherence Point. These stack will be lost after receiving damage equal of your 70% Max HP', skills: ['Guarnteed if Playing as Mayfly in 1st Slot(LVL 5)', 'If playing as Rosetta: Can appear on 2nd or 3rd slot(LVL 10-15)', 'Mayfly Guarantee(LVL5)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_39', name: 'Elysium Injection', thumbnailUrl: './images/5-15/39.webp', fullUrl: './images/5-15/39.webp', description: 'Staying in territory: Every 3s will grant 1 Coherence Point. The coherence will last until you reciveing damage equal of your 70% Max HP', skills: ['Guarnteed if Playing as Mayfly in 1st Slot(LVL 5)', 'If playing as Rosetta: Can appear on 2nd or 3rd slot(LVL 10-15)', 'Mayfly Guarantee(LVL5)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_40', name: 'Gathering Drone', thumbnailUrl: './images/5-15/40.webp', fullUrl: './images/5-15/40.webp', description: 'After calling, gathers ores if nearby.If load limit is reached drone will stop gathering.Drone\'s HP is based off Player\'s Max HP , Drone\'s Attack of player\'s 50% PSI Intensity', skills: ['Guaranteed If Playing as Rossetta in 1st Slot(LVL5)', 'If playing as Mayfly: Can appear on 2nd or 3rd slot(LVL10-15)', 'Rosetta'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_41', name: 'Firepower Drone', thumbnailUrl: './images/5-15/41.webp', fullUrl: './images/5-15/41.webp', description: 'After calling, drone will shoot nearby enemies. Has mid range capabilities.(Combat Drone)', skills: ['Guaranteed If Playing as Rossetta in 1st Slot(LVL5)', 'If playing as Mayfly: Can appear on 2nd or 3rd slot(LVL10-15)', 'Rosetta'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_42', name: 'Explorer Drone', thumbnailUrl: './images/5-15/42.webp', fullUrl: './images/5-15/42.webp', description: 'After calling, Replaces V gliding with a drone, can be summoned anytime,glides horizontally with no vertical loss. Consumes a lot of stamia. Drone\'s HP is base off Player\'s Max HP , Drone\'s Attack of player\'s 50% PSI Intensity', skills: ['Guaranteed If Playing as Rossetta in 1st Slot(LVL5)', 'If playing as Mayfly: Can appear on 2nd or 3rd slot(LVL10-15)', 'Rosetta'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
  { id: 'img1_43', name: 'Thrritory Drone', thumbnailUrl: './images/5-15/43.webp', fullUrl: './images/5-15/43.webp', description: 'After calling, when the player is within their torritory, the drone unlocks long-range capabilities, while all allied turrets and traps within the tettitory gain 50% attack boost', skills: ['Guaranteed If Playing as Rossetta in 1st Slot(LVL5)', 'If playing as Mayfly: Can appear on 2nd or 3rd slot(LVL10-15)', 'Rosetta'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] }
      // *** ให้เพิ่มข้อมูล members ตัวที่ 7-43 ตามรูปแบบนี้ ***
      // แต่ละ member จะมีข้อมูลเฉพาะตัว ไม่สามารถใช้ loop ได้
    ],
    '20-25-30-35': [
{ id: 'img2_1',name: 'Chainsaw: Chainsaw Horror Show',thumbnailUrl: './images/20-35/1.webp',fullUrl: './images/20-35/1.webp',description: 'Chainsaw Durability cap +50%, Attack Speed +30%, and Melee DMG +100%',skills: ['Prospector', 'Gathering', 'Improved Formula: Chainsaw'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img2_2',name: 'Electric Drill: Treasure Hunter',thumbnailUrl: './images/20-35/2.webp',fullUrl: './images/20-35/2.webp',description: '+100% yield when mining for Gold, Silver, and Startrace Ore with an Electric Drill',skills: ['Prospector', 'Gathering', 'Improved Formula: Electric Drill'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img2_3',name: 'Electric Furnace: Efficiency Lover',thumbnailUrl: './images/20-35/3.webp',fullUrl: './images/20-35/3.webp',description: 'Electric Furnace Power Consumption -50%, and Crafting Time -60%',skills: ['Smelter', 'Gathering', 'Facility Boost: Electric Furnace'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img2_4',name: 'Oil Processing',thumbnailUrl: './images/20-35/4.webp',fullUrl: './images/20-35/4.webp',description: 'Turn Stardust Ore and Portable Mixed Fuel into Stardust Source using the Electric Furnace',skills: ['Smelter', 'Gathering', 'New Formula: Stardust Source'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img2_5',name: 'Precious Metal Refining',thumbnailUrl: './images/20-35/5.webp',fullUrl: './images/20-35/5.webp',description: 'Smelt gold and silver ores into ingots using the electric furnace. Gold ingot can be sold for 12k energy links, silver sold for 6k energy links',skills: ['Smelter', 'Gathering', 'New Formula: Gold Ingot, Silver Ingot'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img2_6',name: 'Solar Drill',thumbnailUrl: './images/20-35/6.webp',fullUrl: './images/20-35/6.webp',description: 'The Solar Drill charges itself on sunny days. +15% - 40% yields of Copper, Tin, Iron, Aluminum, and Tungsten Ore',skills: ['Prospector', 'Gathering', 'New Formula: Solar Drill'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img2_7', name: 'Claymore Mine: Warrior\'s Resolve', thumbnailUrl: './images/20-35/7.webp', fullUrl: './images/20-35/7.webp', description: 'Claymore Mine deals an additional 4000 + 400% Psi Intensity damage and increases Max HP by 400% Psi Intensity', skills: ['Demolition Expert', 'Crafting', 'Improved Formula: Claymore Mine'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_8', name: 'Adrenaline Shot: Phoenix', thumbnailUrl: './images/20-35/8.webp', fullUrl: './images/20-35/8.webp', description: 'Take less DMG for the first 10s after respawning, and slowly recover HP', skills: ['Master Craftsman', 'Crafting', 'Improved Formula: Adrenaline Shot'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_9', name: 'Explosive Throwables: Echo Blast', thumbnailUrl: './images/20-35/9.webp', fullUrl: './images/20-35/9.webp', description: 'Increase the DMG of High-Explosive Grenades, Shrapnel Grenades, Molotov Cocktails, and Thermite DMG by 30%. The first target killed will trigger 1 extra explosion, dealing damage equal to 400% Psi Intensity', skills: ['Demolition Expert', 'Crafting', 'Improved Formula: Explosive Throwables'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_10', name: 'Synthesis Bench: Recycle & Reuse', thumbnailUrl: './images/20-35/10.webp', fullUrl: './images/20-35/10.webp', description: 'When crafting Drones, Turrets, Stardust Shields, Spectrum Generators, and Projection Generators, increase their use count by 1', skills: ['Master Craftsman', 'Crafting', 'Facility Boost: Synthesis Bench'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_11', name: 'Sulfur Chemist', thumbnailUrl: './images/20-35/11.webp', fullUrl: './images/20-35/11.webp', description: 'Can use Sulfur and Energy Links at the Synthesis Bench to slowly produce Acid', skills: ['Demolition Expert', 'Crafting', 'Unlock New Formula: Sulfur Chemist'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_12', name: 'Supplies Workbench: Healing Boost', thumbnailUrl: './images/20-35/12.webp', fullUrl: './images/20-35/12.webp', description: 'HP Recovery +10% when crafting Activators, and Output +1', skills: ['Master Craftsman', 'Crafting', 'Facility Boost: Supplies Workbench'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_13', name: 'Updraft Cannon: Gravity Lite', thumbnailUrl: './images/20-35/13.webp', fullUrl: './images/20-35/13.webp', description: 'Gravity is reduced around the Updraft Cannon, and Movement Speed is increased for 5s', skills: ['Tinkerer', 'Building', 'Facility Boost: Updraft Cannon'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_14', name: 'Combo Chipset', thumbnailUrl: './images/20-35/14.webp', fullUrl: './images/20-35/14.webp', description: 'Turn Electronic Parts, Metal Scrap, and Parts into the Combo Chipset using the Supplies Workbench. Can be sold for 12k energy links', skills: ['Machinist', 'Crafting', 'New Formula: Combo Chipset'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_15', name: 'Portable MG Turret: Barrage of Bullets', thumbnailUrl: './images/20-35/15.webp', fullUrl: './images/20-35/15.webp', description: 'Firing the MG Turret can trigger the Bounce effect, increasing HP and DMG by 30%. The MG Turret is now a reusable item, with up to 5 uses max', skills: ['Machinist', 'Crafting', 'Improved Formula: Portable MGTurret'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_16', name: 'Portable Fridge', thumbnailUrl: './images/20-35/16.webp', fullUrl: './images/20-35/16.webp', description: 'When in your backpack, reduce the spoilage speed of Food in your backpack by 70% - 90%', skills: ['Star Chef', 'Management', 'New Formula: Portable Fridge'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_17', name: 'Improved Compound Fertilizer', thumbnailUrl: './images/20-35/17.webp', fullUrl: './images/20-35/17.webp', description: 'Crop fertilizer that can significantly enhance crop Mutation Rate and Yield, but will also slow down Growth', skills: ['Child of the Earth', 'Management', 'New Formula: Improved Compound Fertilizer'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_18', name: 'Solar Generator: Photon Power', thumbnailUrl: './images/20-35/18.webp', fullUrl: './images/20-35/18.webp', description: 'Solar Generator Power Output +10w', skills: ['Sparksmith', 'Management', 'Facility Boost: Solar Generator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_19', name: 'Biomass Generator: Sustained Output', thumbnailUrl: './images/20-35/19.webp', fullUrl: './images/20-35/19.webp', description: 'Increase Biomass Generator\'s power output by 5w, and fuel duration by 150%', skills: ['Sparksmith', 'Management', 'Facility Boost: Biomass Generator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_20', name: 'Canned Goods: Mini Canner', thumbnailUrl: './images/20-35/20.webp', fullUrl: './images/20-35/20.webp', description: '+1 Yield when crafting Canned Goods', skills: ['Star Chef', 'Management', 'Improved Formula: Canned Goods'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_21', name: 'Generator: Electrical Expert', thumbnailUrl: './images/20-35/21.webp', fullUrl: './images/20-35/21.webp', description: 'Maximum Number of Generators +1 ,and +2w Power Output', skills: ['Sparksmith', 'Management', 'Facility Boost: Generator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_22', name: 'Stardust Water Pump', thumbnailUrl: './images/20-35/22.webp', fullUrl: './images/20-35/22.webp', description: 'A special Water Pump that can extract Stardust Source from polluted soil when supplied with enough power', skills: ['Hydro Engineer', 'Management', 'New Facility: Stardust Water Pump'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_23', name: 'Iced Treat: Brain Freeze', thumbnailUrl: './images/20-35/23.webp', fullUrl: './images/20-35/23.webp', description: 'Iced Treat Effect Duration +200%, and Potency +30%', skills: ['Star Chef', 'Management', 'Improved Formula: Iced Treat'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_24', name: 'Furnace: Sintering', thumbnailUrl: './images/20-35/24.webp', fullUrl: './images/20-35/24.webp', description: 'Sintered Brick and Glass Crafting Time -50%, Yield +100%', skills: ['Tinkerer', 'Building', 'Facility Boost: Furnace'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_25', name: 'Portable Updraft Device', thumbnailUrl: './images/20-35/25.webp', fullUrl: './images/20-35/25.webp', description: 'Use to temporarily summon an updraft at the location for 30s. When inside the updraft, jump height is increased. Can use up to 10 times', skills: ['Machinist', 'Crafting', 'New Formula: Portable Updraft Device'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_26', name: 'Stone Structures: Intense Defense', thumbnailUrl: './images/20-35/26.webp', fullUrl: './images/20-35/26.webp', description: 'Structures built from stone gain the Intense Defense effect: Durability +100%,  and the maximum number of Structural items that can be placed in your Territory at any one time +100', skills: ['Tinkerer', 'Building', 'Facility Boost: Stone Structures'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_27', name: 'Shotgun Turret: Volley Fire', thumbnailUrl: './images/20-35/27.webp', fullUrl: './images/20-35/27.webp', description: 'Shotgun Turret DMG +30%. Power Consumption -30%, with a 30% chance to trigger the shrapnel effect', skills: ['Artillery Marshal', 'Building', 'Facility Boost: Shotgun Turret'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_28', name: 'Biomass Missile: Ample Munition', thumbnailUrl: './images/20-35/28.webp', fullUrl: './images/20-35/28.webp', description: 'Plasma Missiles -80% Weight, and +2 Crafting Yield', skills: ['Artillery Marshal', 'Building', 'Improved Formula: Biomass Missile'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_29', name: 'Gravitational Grip: Bonds of Guidance', thumbnailUrl: './images/20-35/29.webp', fullUrl: './images/20-35/29.webp', description: 'When the Gravitational Grip trap is triggered by enemy, there\'s a 20% chance that it will also inflict \"The Bull\'s Eye\"', skills: ['Artillery Marshal', 'Building', 'Facility Boost: Gravitational Grip'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_30', name: 'Gunpowder Extraction', thumbnailUrl: './images/20-35/30.webp', fullUrl: './images/20-35/30.webp', description: 'Gunpowder Use Hot Rock Ore and other meterials to craft gunpowder at the Supplies Workbench', skills: ['', '', 'Unlock New Formula: Gunpoder Extraction'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_31', name: 'Molecular Structure Research', thumbnailUrl: './images/20-35/31.webp', fullUrl: './images/20-35/31.webp', description: 'Use Hot Rock Ore or Cold Crystal Ore to craft Fire Crystals and Ice Crystals at the Supplies Workbench', skills: ['', '', 'Unlock New Formulas: Ice Crystal and Fire Crystal'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_32', name: 'Furnace: Chaosium Material Analysis', thumbnailUrl: './images/20-35/32.webp', fullUrl: './images/20-35/32.webp', description: 'When using Furnances and Electric Furnaces to produce Chaosium, production speed -30%;Chaosium yield +1 for every 5°C in excess for 30°C,up to a maximum of +10', skills: ['', '', 'Facility Boost: Furnance'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_33', name: 'Freezing Drone', thumbnailUrl: './images/20-35/33.webp', fullUrl: './images/20-35/33.webp', description: 'Scout Drone reduce the Movement Speed of nearby enemy units', skills: ['', '', 'Improved Scout Drone: Freezing Drone'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_34', name: 'Frost Armor', thumbnailUrl: './images/20-35/34.webp', fullUrl: './images/20-35/34.webp', description: 'Can be crafted at the Advance Synthesis Bench. When the temperature is below 0°C,gain a shield equal to 200% PSI Intensity. The shield refreshes every 300 seconds.If crafted with Ice Crystals,the shield\'s value is increased to 500% PSI Indtnsity', skills: ['', '', 'Unlock New Formula: Frost Shield Generator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_35', name: 'Grendade: Line Charge', thumbnailUrl: './images/20-35/35.webp', fullUrl: './images/20-35/35.webp', description: 'When it explodes, it pulls affected Deviants toward the center of the explosion', skills: ['', '', 'Improved Formula: Grenade'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_36', name: 'Ice Throwing Dagger and Flame Throwing Dagger', thumbnailUrl: './images/20-35/36.webp', fullUrl: './images/20-35/36.webp', description: 'Ice Throwing Dagger and Flame Throwing Dagger Can be crafted with Hot Rock Ore or Cold Crystal Ore at the supplies Workbench. Increases or reduces the target\'s environmental temperature upon hitting', skills: ['', '', 'Unlock New formulas: Ice Throwing Dagger and Flame Throwing Dagger'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_37', name: 'Portable Thermostat', thumbnailUrl: './images/20-35/37.webp', fullUrl: './images/20-35/37.webp', description: 'Can be crafted at the Supplies Workbench.When activated , expends 1 Storage Battery every 30 minutes to reduce or increase the environmental temperture within 3 meters by 20°C (effect does not stack)', skills: ['', '', 'Unlock New Formula: Portable Thermostat'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_38', name: 'Claymore Mine: Frost Trap', thumbnailUrl: './images/20-35/38.webp', fullUrl: './images/20-35/38.webp', description: 'Generates 4 Frost Vortexes when triggered', skills: ['', '', 'Improved Formula: Claymore Mine'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_39', name: 'Portable Gun Turret: Explosive Automatic Ammo', thumbnailUrl: './images/20-35/39.webp', fullUrl: './images/20-35/39.webp', description: 'MG Turret The MG Turret\'s bullets have a chance of triggering Unstable Bomber', skills: ['', '', 'Improved Formula: MG Turret'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_40', name: 'Biomass Generator: Heat Dissipation', thumbnailUrl: './images/20-35/40.webp', fullUrl: './images/20-35/40.webp', description: 'When the nearby temperature is higher then 20°C , every 1 additional degree increase power output by 0.2%; when the nearby temperature is higher then 60°C, every 1 additional degree increases power output by 0.5%,up to 40%', skills: ['', '', 'Improved Formula: Generator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_41', name: 'Refining Facility: Smelting', thumbnailUrl: './images/20-35/41.webp', fullUrl: './images/20-35/41.webp', description: 'The Refining Facility can refine Sulfur Ore into Hot Rock Ore', skills: ['Doesn\'t work with Super refinery', '', 'Improved Formula: Refining Facility'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_42', name: 'Water Pump: Underground Pump', thumbnailUrl: './images/20-35/42.webp', fullUrl: './images/20-35/42.webp', description: 'You can install it on an snowy surface to break the ice and gather crystals below', skills: ['', '', 'Unlock New Formula: Icebreaker Water Pump'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_43', name: 'Biomass Generator: Heat Generator', thumbnailUrl: './images/20-35/43.webp', fullUrl: './images/20-35/43.webp', description: 'Can use Hot Rock Ore to generate electricity.Power Output +30%', skills: ['', '', 'Improved Formula: Biomass Generator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_44', name: 'Plater Box: Greenhouse Planting', thumbnailUrl: './images/20-35/44.webp', fullUrl: './images/20-35/44.webp', description: 'Increases crop growth rate. Yield +1 for every 20°C increase in temperature', skills: ['', '', 'Improved Formula: Planter Box'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_45', name: 'Grilled Dish: Grilling Master', thumbnailUrl: './images/20-35/45.webp', fullUrl: './images/20-35/45.webp', description: 'Grilled Dishes grant Cold Resist +10 for 10 minutes when consumed;yield +1', skills: ['', '', 'Improved Formula: Grilled Dishes'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_46', name: 'Bed: Heat preservation', thumbnailUrl: './images/20-35/46.webp', fullUrl: './images/20-35/46.webp', description: 'Sleep for more then 10s to gain 30% cold Resist for the newxt 30 minutes', skills: ['', '', 'Facility Boost: Bed'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_47', name: 'Dummy: Fear and Terror', thumbnailUrl: './images/20-35/47.webp', fullUrl: './images/20-35/47.webp', description: 'Dummy Automatically attracts nearby Deviants', skills: ['', '', 'Improved Formula: Dummy'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_48', name: 'Proliferation Gene', thumbnailUrl: './images/20-35/48.webp', fullUrl: './images/20-35/48.webp', description: 'Create a proliferation zone. Within this zone,the acquisition amount for all Parts, Fabrics,Plastic,Metal Scraps, Rubber,Adhesive,Electronic Parts,Crystal and Acid is increased by 30% for 10s', skills: ['Can be added as a passive stat to any mayfly injection', '', 'Mayfly Guaranteed(LVL20)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_49', name: 'Extream Gene', thumbnailUrl: './images/20-35/49.webp', fullUrl: './images/20-35/49.webp', description: 'Stacks will now be lost only when you receive 150% DMG of your Max HP instead of 70%. When HP is below 50% ,Max Load +50,When HP is below 30%,Weapon DMG +15%, Tactical Item DMG +15% . When HP is below 10%, trigger a healing effect, recovering 1% of Max HP for each unused point of Max Load(30s cooldown)', skills: ['Can be added as a passive stat to any mayfly injection', '', 'Mayfly Guaranteed(LVL20)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_50', name: 'Lighting Gene', thumbnailUrl: './images/20-35/50.webp', fullUrl: './images/20-35/50.webp', description: 'While in combat,automatically select a random enemy within 20 meters every 10s ,gunerating a lightning strike beneat them after a 3s delay,dealing damage equal to 4,000% PSI Intensity', skills: ['Can be added as a passive stat to any mayfly injection', '', 'Mayfly Guaranteed(LVL20)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_51', name: 'Bastille Gene', thumbnailUrl: './images/20-35/51.webp', fullUrl: './images/20-35/51.webp', description: 'If you stand still for 2s , you will enter Bastille status . In bastille status,DMG Reduction +10% DMG , Weakspot DMG Reduction +20%, and taking hits from enemies will mark them (cooldown: 10s)', skills: ['Can be added as a passive stat to any mayfly injection', '', 'Mayfly Guaranteed(LVL20)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_52', name: 'Focus Module', thumbnailUrl: './images/20-35/52.webp', fullUrl: './images/20-35/52.webp', description: '[Gathering: have chance to extract 10-100 Barreled Crude oil at contest areas] [Firepower: drone attack can trigger the Unstable Bomber] [Explorer: gliding stamina reduced 50%] [Territory: After 10 cumulative hits the drone provides a 5% boost to Weapon DMG, Status DMG for all allies within 15 meters for 10s ,stacking up to 3 times]', skills: ['Gathering Dron', 'Firepower Drone', 'Explorer Drone','Territory Drone','Rosetta Guarantee(LVL20)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_53', name: 'Wide Area Module', thumbnailUrl: './images/20-35/53.webp', fullUrl: './images/20-35/53.webp', description: '[Gathering: doubles yield when collecting minerals] [Firepower: drone attack can trigger Bounce] [Explorer: increase horizontal gliding speed and grant 20% DMG reduction] [Territory: drone generates a spherical shield every 30s , absorbing DMG 5,000% of drone\'s attack]', skills: ['Gathering Dron', 'Firepower Drone', 'Explorer Drone','Territory Drone','Rosetta Guarantee(LVL20)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_54', name: 'Speed Module', thumbnailUrl: './images/20-35/54.webp', fullUrl: './images/20-35/54.webp', description: '[Gathering: Calling when player holds a gethering tool increase Move speed,Sprint Speed ,Final hit yield] [Firepower: dash to enemies paralyzing them for 3s] [Explorer: Player +15% move and double jump] [Territory: in every territory decrease stamina ,Roll speed increase , Tatical item DMG increase 30%]', skills: ['Gathering Dron', 'Firepower Drone', 'Explorer Drone','Territory Drone','Rosetta Guarantee(LVL20)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img2_55', name: 'Support Module', thumbnailUrl: './images/20-35/55.webp', fullUrl: './images/20-35/55.webp', description: '[Gathering: every 30s convert ores -> ingots (10ingots)] [Firepower: Drone an heal and protect Black Out] [Explorer: Player invisible after leaving combat] [Territory: in own teritory recovery HP 5%/s if HP <50% become invisible(130s cooldown)]', skills: ['Gathering Dron', 'Firepower Drone', 'Explorer Drone','Territory Drone','Rosetta Guarantee(LVL20)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] }
      // *** ให้เพิ่มข้อมูล members ตัวที่ 7-55 ตามรูปแบบนี้ ***
      // แต่ละ member จะมีข้อมูลเฉพาะตัว ไม่สามารถใช้ loop ได้
    ],
    '40-45-50': [
{ id: 'img3_1',name: 'Crystal Transformation',thumbnailUrl: './images/40-50/1.webp',fullUrl: './images/40-50/1.webp',description: 'Turn Stardust Source and alloy ingots into various types of Crystals at the Electric Furnace',skills: ['Smelter', 'Gathering', 'New Formula: Beryllium Crystal, Vanadium Crystal, Iridium Crystal, Platinum Crystal'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img3_2',name: 'Art of Stardust Decay',thumbnailUrl: './images/40-50/2.webp',fullUrl: './images/40-50/2.webp',description: 'Consume Stardust Source to craft Acid using the Electric Furnace',skills: ['Smelter', 'Gathering', 'New Formula: Art of Stardust Decay'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img3_3',name: 'Electric Furnace: Electrolysis',thumbnailUrl: './images/40-50/3.webp',fullUrl: './images/40-50/3.webp',description: 'Doubles Yield when smelting Aluminum and Tungsten Ingots using the Electric Furnace',skills: ['Smelter', 'Gathering', 'Facility Boost: Electric Furnace'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img3_4',name: 'Gold Pickaxe and Silver Pickaxe',thumbnailUrl: './images/40-50/4.webp',fullUrl: './images/40-50/4.webp',description: 'Gold and Silver Pickaxes have low durability. When using the Gold Pickaxe for mining, there is a chance to receive Spice. When using the Silver Pickaxe for logging, there is a chance to receive a random Fruit',skills: ['Prospector', 'Gathering', 'New Formula: Gold Axe, Silver Axe'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img3_5',name: 'Lucky Logging Platform',thumbnailUrl: './images/40-50/5.webp',fullUrl: './images/40-50/5.webp',description: 'Able to receive random agricultural produce when in a sunny area',skills: ['Prospector', 'Gathering', 'New Facility: Lucky Logging Platform'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img3_6',name: 'Stardust Mining Platform',thumbnailUrl: './images/40-50/6.webp',fullUrl: './images/40-50/6.webp',description: 'Increase Mining yield by 20%. Can mine Stardust when in a Pollution Zone',skills: ['Prospector', 'Gathering', 'New Facility: Stardust Mining Platform'],scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter']},
{ id: 'img3_7', name: 'High Power Warhead', thumbnailUrl: './images/40-50/7.webp', fullUrl: './images/40-50/7.webp', description: 'A high-efficency Rocket Launcher warhead. It\'s lighter and deals more damage to buildings and vehicles', skills: ['Demolition Expert', 'Crafting', 'New Formula: High Power Warhead'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_8', name: 'Ultra Grenade', thumbnailUrl: './images/40-50/8.webp', fullUrl: './images/40-50/8.webp', description: 'Higher Blast DMG, and additional bonus DMG against buildings and vehicles', skills: ['Demolition Expert', 'Crafting', 'New Formula: Ultra Grenade'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_9', name: 'Supplies Workbench: Anti-Armor', thumbnailUrl: './images/40-50/9.webp', fullUrl: './images/40-50/9.webp', description: 'Yield +30% when crafting AP Ammo, and Crafting Time -50%', skills: ['Master Craftsman', 'Crafting', 'Facility Boost: Supplies Workbench'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_10', name: 'Stardust Barrier: Hold the Line', thumbnailUrl: './images/40-50/10.webp', fullUrl: './images/40-50/10.webp', description: 'Stardust Barriers +50% HP. When the Stardust Barrier is deployed, it replenishes 50% HP for all allies within 3m. Stardust Barriers can also now be used 5 times', skills: ['Machinist', 'Crafting', 'Improved Formula: Stardust Barrier'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_11', name: 'Rare Crystal Set', thumbnailUrl: './images/40-50/11.webp', fullUrl: './images/40-50/11.webp', description: 'Turn Crystals into the Rare Crystal Set with the Electric Furnace. The Rare Crystal Set can be sold for 12k energy links', skills: ['Master Craftsman', 'Crafting', 'New Formula: Rare Crystal Set'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_12', name: 'Stardust Regulator', thumbnailUrl: './images/40-50/12.webp', fullUrl: './images/40-50/12.webp', description: 'Recover 70% of HP immediately and gain a Shield equal to 30% Max HP. This has a 30s cooldown (independent of activators\' cooldowns) and can be used up to 15 times', skills: ['Master Craftsman', 'Crafting', 'New Formula: Stardust Regulator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_13', name: 'Golden Knife', thumbnailUrl: './images/40-50/13.webp', fullUrl: './images/40-50/13.webp', description: 'A throwing knife with extremely high damage that is made from gold. When it hits an enemy, it will trigger the Unstable Bomber effect. When it hits the Weakspot of a Deviant, trigger 1 additional Unstable Bomber effect', skills: ['Demolition Expert', 'Crafting', 'New Formula: Golden Knife'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_14', name: 'Spectral Cloak', thumbnailUrl: './images/40-50/14.webp', fullUrl: './images/40-50/14.webp', description: 'Activate to become cloaked for 120s. Upon leaving combat, you\'ll become steathy. Use up to 10 times', skills: ['Machinist', 'Crafting', 'New Formula: Spectral Cloak'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_15', name: 'Scout Drone: Invisible Hunter', thumbnailUrl: './images/40-50/15.webp', fullUrl: './images/40-50/15.webp', description: 'Scout Drones gain The Bull\'s Eye effect, +30% HP and DMG. Scout drones can also now be used up to 5 times', skills: ['Machinist', 'Crafting', 'Improved Formula: Scout Drone'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_16', name: 'Kitchen Set: Gourmand', thumbnailUrl: './images/40-50/16.webp', fullUrl: './images/40-50/16.webp', description: 'Base effects of all Dishes +30% when prepared using a Kitchen Set. Effect Duration +50% and crafting time -50%', skills: ['Star Chef', 'Management', 'Facility Boost: Kitchen Set'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_17', name: 'Stardust Dish: Shell Break', thumbnailUrl: './images/40-50/17.webp', fullUrl: './images/40-50/17.webp', description: 'The Stardust Dish provides 2 special Whim effects. Within 30 minutes of use, continuously recover HP when Sanity is full', skills: ['Star Chef', 'Logistics', 'Improved Formula: Stardust Dish'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_18', name: 'Nalcott Easter Egg', thumbnailUrl: './images/40-50/18.webp', fullUrl: './images/40-50/18.webp', description: 'Use to randomly receive the contents of a Settlement Loot Crate', skills: ['Star Chef', 'Management', 'New Formula: Nalcott Perk'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_19', name: 'Hydraulic Generator: One with the Tides', thumbnailUrl: './images/40-50/19.webp', fullUrl: './images/40-50/19.webp', description: 'Maximum number of Generators +1. Power Output +0-7w, depending on the speed of water flow', skills: ['Sparksmith', 'Management', 'Facility Boost: Hydraulic Generator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_20', name: 'Deviant Power Generator: Stardust Unleashed', thumbnailUrl: './images/40-50/20.webp', fullUrl: './images/40-50/20.webp', description: 'Increase Deviant Power Generator\'s power output by 15%', skills: ['Sparksmith', 'Logistics', 'Facility Boost: Deviant Power Generator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_21', name: 'Lightning Impulse Regulator', thumbnailUrl: './images/40-50/21.webp', fullUrl: './images/40-50/21.webp', description: 'When in your backpack, being struck by lightning restores your HP to full and grants Movement Speed +15% and Psi Intensity +30% for 60s', skills: ['Sparksmith', 'Management', 'New Formula: Lightning Impulse Regulator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_22', name: 'Reinforced Structures: Healing Defense', thumbnailUrl: './images/40-50/22.webp', fullUrl: './images/40-50/22.webp', description: 'Reinforced structures gain the Healing Defense effect. When your Territory exits combat, the Durability of reinforced structures is automatically restored to 80%', skills: ['Tinkerer', 'Building', 'Facility Boost: Reinforced Structures'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_23', name: 'Red Plasma Rounds', thumbnailUrl: './images/40-50/23.webp', fullUrl: './images/40-50/23.webp', description: 'Special ammunition used by Gatling Cannons. They are extremely expensive but overwhelmingly powerful. There is no bullet drop in its trajectory, deals tons of damage, and has a large explosive radius. 24 hour duration', skills: ['Artillery Marshal', 'Building', 'New Formula: Red Plasma Rounds'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_24', name: 'Gatling Cannon: Power Blast', thumbnailUrl: './images/40-50/24.webp', fullUrl: './images/40-50/24.webp', description: 'Gatling Cannons deal +30% DMG. When your territory exits combat, Durability recovers to 100%', skills: ['Artillery Marshal', 'Building', 'Facility Boost: Gatling Cannon'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_25', name: 'Rifle Turrent: Two Birds One Stone', thumbnailUrl: './images/40-50/25.webp', fullUrl: './images/40-50/25.webp', description: 'Rifle Turret DMG +30%, Durability +30%, and attacks on target trigger a Bounce effect', skills: ['Artillery Marshal', 'Building', 'Facility Boost: Rifle Turret'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_26', name: 'Metal Dissolution', thumbnailUrl: './images/40-50/26.webp', fullUrl: './images/40-50/26.webp', description: 'Use Acid and Gold Ore to craft Chaosium at the Electric Furnace', skills: ['', '', 'Unlock New Formula: Metal Dissolution'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_27', name: 'Grenade: Cluster Grenade', thumbnailUrl: './images/40-50/27.webp', fullUrl: './images/40-50/27.webp', description: 'After exploding, it generates a secondary bomb that sticks to a random target hit and explodes after a delay.', skills: ['', '', 'Improved Formula: Grenade'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_28', name: 'Composite Crystal', thumbnailUrl: './images/40-50/28.webp', fullUrl: './images/40-50/28.webp', description: 'Can be crafted with Cold Crystal Ore or Hot Rock Ore at the Supplies Workbench. Can be sold for a high price.', skills: ['Master Craftsman', 'Crafting', 'New Formula: Composite Crystal'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_29', name: 'Frag Grenade: Viscoelastic Cold Fire', thumbnailUrl: './images/40-50/29.webp', fullUrl: './images/40-50/29.webp', description: 'Units hit by the Frag Grenade will be marked with Cold Fire. When a marked unit is killed, the environmental temperature within a certain range is reduced by 100°C.', skills: ['Demolition Expert', 'Crafting', 'Improved Formula: Frag Grenade'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_30', name: 'Silentfire Shield', thumbnailUrl: './images/40-50/30.webp', fullUrl: './images/40-50/30.webp', description: 'Can be crafted at the Synthesis Bench. When the environmental temperature falls below -10°C, generates a 360° shield for up to 300 seconds. Shield Value = Your HP + 100% Psi Intensity - Current Temperature * 500.', skills: ['Machinist', 'Crafting', 'New Formula: Silentfire Shield'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_31', name: 'Deviant Power Generator: Energy Extraction', thumbnailUrl: './images/40-50/31.webp', fullUrl: './images/40-50/31.webp', description: 'Deviant Power Generator power output +10%. If the environmental temperature is higher than 50°C, power output +20% more.', skills: ['Sparksmith', '', 'Facility Boost: Deviant Power Generator'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_32', name: 'Fish Pheromones', thumbnailUrl: './images/40-50/32.webp', fullUrl: './images/40-50/32.webp', description: 'Can be crafted with pheromones from certain fish at the Supplies Workbench. Use it to increase your chances of catching specific kinds of fish', skills: ['', '', 'Unlock New Formula: Pheromone Bait'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_33', name: 'Flamethrower Trap: Kebob Party', thumbnailUrl: './images/40-50/33.webp', fullUrl: './images/40-50/33.webp', description: 'Flamethrower Traps inflict Burn. If the enemy has more than 10 stacks of Burn, they explode 1 time. Cooldown: 1 second.', skills: ['Artillery Marshal', 'Building', 'Improved Formula: Flamethrower Trap'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_34', name: 'Building Master', thumbnailUrl: './images/40-50/34.webp', fullUrl: './images/40-50/34.webp', description: 'Material structures +150, furniture +50', skills: ['Tinkerer', 'Building', ''], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_35', name: 'Proliferation Gene Fabric', thumbnailUrl: './images/40-50/35.webp', fullUrl: './images/40-50/35.webp', description: '[Top Armor] While in coherence status, it will convert barreled oil to Portable Mixed Fuel every 30s', skills: ['Max Load +10%', '', 'Mayfly Guaranteed(LVL40)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_36', name: 'Extreme Gene Fabric', thumbnailUrl: './images/40-50/36.webp', fullUrl: './images/40-50/36.webp', description: '[Top Armor]Gain invincibility , but weapon DMG Status DMG and Tactical item DMG drop to 0 for 2s', skills: ['Weakspot DMG Reduce +3%', '', 'Mayfly Guaranteed(LVL40)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_37', name: 'Lighting Gene Fabric', thumbnailUrl: './images/40-50/37.webp', fullUrl: './images/40-50/37.webp', description: '[Top Armor] When attacked after 3s delay a lightning strike will strike the attacker , dealing 4,000% PSI Intensity(cooldown 30s)', skills: ['Cri DMG Reduce +3%', '', 'Mayfly Guaranteed(LVL40)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_38', name: 'Bastille Gene Fabric', thumbnailUrl: './images/40-50/38.webp', fullUrl: './images/40-50/38.webp', description: '[Top Armor] Automatically consume 10 stardust source per minute and restore 10% durability to a piece of gear with lowest Durability', skills: ['Gear Durability +30%', '', 'Mayfly Guaranteed(LVL40)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_39', name: 'Invisible Module', thumbnailUrl: './images/40-50/39.webp', fullUrl: './images/40-50/39.webp', description: 'Automatically consume 10 Stardust Source to make the drone enter invisibility state for 5 minutes. The drone exits invisible state when dealing damage', skills: ['Any Drone', '', 'Rosetta Guaranteed (LVL40)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_40', name: 'Armor Module', thumbnailUrl: './images/40-50/40.webp', fullUrl: './images/40-50/40.webp', description: 'When the drone has no Shield, it automatically consumes 3 Electronic Parts every 30s gain 5,000 shield', skills: ['Any Drone', '', 'Rosetta Guaranteed (LVL40)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_41', name: 'Load Module', thumbnailUrl: './images/40-50/41.webp', fullUrl: './images/40-50/41.webp', description: 'Every 10 minutes ,automatically consume 5 Protable Mixed Fuel to increase the player\'s Max Load by 100 for 10 minutes', skills: ['Any Drone', '', 'Rosetta Guaranteed (LVL40)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] },
{ id: 'img3_42', name: 'Healing Module', thumbnailUrl: './images/40-50/42.webp', fullUrl: './images/40-50/42.webp', description: 'Every 10 minutes ,automatically consume 10 Adhesive, 10 Metal Scraps, 5 Rubber to restore 50% Durability to the lowest Durability gear being worn', skills: ['Any Drone', '', 'Rosetta Guaranteed (LVL40)'], scenarios: ['Manibus', 'Evolution\'s Call', 'Prismverse\'s Clash', 'Way Of Winter'] }
      // *** ให้เพิ่มข้อมูล members ตัวที่ 7-42 ตามรูปแบบนี้ ***
      // แต่ละ member จะมีข้อมูลเฉพาะตัว ไม่สามารถใช้ loop ได้
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