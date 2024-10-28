/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ChevronRight, MinusSquare, PlusSquare, List, LayoutGrid, GitBranch, Calendar } from 'lucide-react';
import { wbsData } from '../data/wbsData';

const GanttChart = () => {
  // Data untuk timeline (September Week 3 - February Week 1)
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  const weeks = [
    'Sep W3', 'Sep W4',
    'Oct W1', 'Oct W2', 'Oct W3', 'Oct W4',
    'Nov W1', 'Nov W2', 'Nov W3', 'Nov W4',
    'Dec W1', 'Dec W2', 'Dec W3', 'Dec W4',
    'Jan W1', 'Jan W2', 'Jan W3', 'Jan W4',
    'Feb W1'
  ];

  // Data tasks dengan timeline disesuaikan
  const tasks = [
    // PROJECT INITIATION (2 minggu)
    {
      id: '1.0',
      name: 'PROJECT INITIATION',
      start: 0, // Start at Sep W3
      duration: 2,
      level: 1,
      color: 'bg-blue-500'
    },
    {
      id: '1.1',
      name: 'Project Charter Creation',
      start: 0,
      duration: 1,
      level: 2,
      color: 'bg-blue-400'
    },
    {
      id: '1.2',
      name: 'Stakeholder Management',
      start: 0,
      duration: 2,
      level: 2,
      color: 'bg-blue-400'
    },

    // REQUIREMENT ANALYSIS (3 minggu)
    {
      id: '2.0',
      name: 'REQUIREMENT ANALYSIS',
      start: 2, // Start after Project Initiation
      duration: 3,
      level: 1,
      color: 'bg-purple-500'
    },
    {
      id: '2.1',
      name: 'Functional Specification',
      start: 2,
      duration: 2,
      level: 2,
      color: 'bg-purple-400'
    },
    {
      id: '2.2',
      name: 'System Analysis',
      start: 3,
      duration: 2,
      level: 2,
      color: 'bg-purple-400'
    },

    // SYSTEM DESIGN (4 minggu)
    {
      id: '3.0',
      name: 'SYSTEM DESIGN',
      start: 5, // Start after Requirement Analysis
      duration: 4,
      level: 1,
      color: 'bg-green-500'
    },
    {
      id: '3.1',
      name: 'Visual Design System',
      start: 5,
      duration: 2,
      level: 2,
      color: 'bg-green-400'
    },
    {
      id: '3.2',
      name: 'User Interface Design',
      start: 6,
      duration: 3,
      level: 2,
      color: 'bg-green-400'
    },

    // DEVELOPMENT (6 minggu)
    {
      id: '4.0',
      name: 'DEVELOPMENT',
      start: 9, // Start after System Design
      duration: 6,
      level: 1,
      color: 'bg-orange-500'
    },
    {
      id: '4.1',
      name: 'Backend Development',
      start: 9,
      duration: 4,
      level: 2,
      color: 'bg-orange-400'
    },
    {
      id: '4.2',
      name: 'Frontend Development',
      start: 11,
      duration: 4,
      level: 2,
      color: 'bg-orange-400'
    },

    // TESTING (3 minggu)
    {
      id: '5.0',
      name: 'TESTING',
      start: 15, // Start after Development
      duration: 3,
      level: 1,
      color: 'bg-pink-500'
    },
    {
      id: '5.1',
      name: 'Unit Testing',
      start: 15,
      duration: 2,
      level: 2,
      color: 'bg-pink-400'
    },
    {
      id: '5.2',
      name: 'Integration Testing',
      start: 16,
      duration: 2,
      level: 2,
      color: 'bg-pink-400'
    },

    // DEPLOYMENT (2 minggu)
    {
      id: '6.0',
      name: 'DEPLOYMENT',
      start: 17, // Overlap with end of Testing
      duration: 2,
      level: 1,
      color: 'bg-teal-500'
    },
    {
      id: '6.1',
      name: 'Environment Setup',
      start: 17,
      duration: 1,
      level: 2,
      color: 'bg-teal-400'
    },
    {
      id: '6.2',
      name: 'Deployment Process',
      start: 18,
      duration: 1,
      level: 2,
      color: 'bg-teal-400'
    },

    // MAINTENANCE (Start at end and continue)
    {
      id: '7.0',
      name: 'MAINTENANCE',
      start: 18, // Start at the end
      duration: 1,
      level: 1,
      color: 'bg-indigo-500'
    },
    {
      id: '7.1',
      name: 'Regular Maintenance',
      start: 18,
      duration: 1,
      level: 2,
      color: 'bg-indigo-400'
    }
  ];

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg overflow-x-auto">
      <div className="min-w-[1200px]">
        <div className="flex">
          {/* Task names column */}
          <div className="w-64 flex-shrink-0">
            <div className="h-16 border-b-2 border-gray-200 font-bold">Task Name</div>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="h-12 flex items-center"
                style={{ paddingLeft: `${task.level * 16}px` }}
              >
                {task.name}
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="flex-grow">
            <div className="flex border-b-2 border-gray-200">
              {/* Months */}
              {months.map((month, idx) => (
                <div
                  key={month}
                  className="flex-auto h-8 border-r border-gray-200 font-bold text-center"
                  style={{
                    width: month === 'Sep' ? '42px' : // 2 weeks
                           month === 'Feb' ? '24px' : // 1 week
                           '136px' // 4 weeks
                  }}
                >
                  {month}
                </div>
              ))}
            </div>
            <div className="flex border-b-2 border-gray-200">
              {/* Weeks */}
              {weeks.map((week, index) => (
                <div
                  key={index}
                  className="w-12 h-8 border-r border-gray-200 text-xs text-center"
                >
                  W{week.split(' ')[1].replace('W', '')}
                </div>
              ))}
            </div>

            {/* Tasks bars */}
            {tasks.map((task) => (
              <div key={task.id} className="h-12 relative">
                <div
                  className={`absolute h-6 mt-3 rounded-full ${task.color} hover:opacity-90 cursor-pointer transition-opacity duration-200`}
                  style={{
                    left: `${task.start * 32}px`,
                    width: `${task.duration * 48}px`
                  }}
                  title={`${task.name} (${task.duration} weeks)`}
                >
                  <div className="h-full flex items-center justify-center text-white text-xs font-medium">
                    {task.duration}w
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// Task List Component
const TaskList = ({ tasks, marginLeft }) => {
  return (
    <div className="ml-6">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="flex items-center p-2 mb-1 rounded-lg bg-white border border-gray-100 hover:shadow-sm transition-shadow duration-200"
          style={{ marginLeft: `${marginLeft}px` }}
        >
          <span className="ml-6 text-gray-600">• {task}</span>
        </div>
      ))}
    </div>
  );
};

// WBS Node Component
const WBSNode = ({ title, children, level = 0, tasks = [], searchTerm = '' }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  
  const bgColors = [
    'bg-blue-100',
    'bg-blue-50',
    'bg-gray-50',
    'bg-white'
  ];
  
  const marginLeft = level * 24;

  const matchesSearch = searchTerm === '' || 
    title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tasks.some(task => task.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (children && children.some(child => 
      child.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (child.tasks && child.tasks.some(task => 
        task.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    ));

  if (!matchesSearch) return null;
  
  return (
    <div className="flex flex-col transition-all duration-200 ease-in-out">
      <div
        className={`flex items-center p-3 mb-1 rounded-lg ${bgColors[level]} border border-gray-200 hover:shadow-md transition-shadow duration-200`}
        style={{ marginLeft: `${marginLeft}px` }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mr-2 hover:bg-gray-100 rounded p-1 transition-colors duration-200"
        >
          {children || tasks.length > 0 ? (
            isExpanded ? <MinusSquare size={20} /> : <PlusSquare size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
        <span className="font-medium">{title}</span>
      </div>
      {isExpanded && (
        <div className="ml-6 transition-all duration-200 ease-in-out">
          {children}
          {tasks.length > 0 && <TaskList tasks={tasks} marginLeft={marginLeft} />}
        </div>
      )}
    </div>
  );
};




// Komponen Box WBS
const DiagramBox = ({ title, level, colorFamily = 'blue' }) => {
  // Color families untuk berbagai cabang task
  const colorFamilies = {
    blue: {
      0: "bg-blue-600 text-white",
      1: "bg-blue-500 text-white",
      2: "bg-blue-400 text-white",
      3: "bg-blue-300"
    },
    purple: {
      0: "bg-purple-600 text-white",
      1: "bg-purple-500 text-white",
      2: "bg-purple-400 text-white",
      3: "bg-purple-300"
    },
    green: {
      0: "bg-green-600 text-white",
      1: "bg-green-500 text-white",
      2: "bg-green-400 text-white",
      3: "bg-green-300"
    },
    orange: {
      0: "bg-orange-600 text-white",
      1: "bg-orange-500 text-white",
      2: "bg-orange-400 text-white",
      3: "bg-orange-300"
    },
    pink: {
      0: "bg-pink-600 text-white",
      1: "bg-pink-500 text-white",
      2: "bg-pink-400 text-white",
      3: "bg-pink-300"
    },
    teal: {
      0: "bg-teal-600 text-white",
      1: "bg-teal-500 text-white",
      2: "bg-teal-400 text-white",
      3: "bg-teal-300"
    },
    indigo: {
      0: "bg-indigo-600 text-white",
      1: "bg-indigo-500 text-white",
      2: "bg-indigo-400 text-white",
      3: "bg-indigo-300"
    }
  };

  const boxSizes = {
    0: "w-48 h-14",
    1: "w-44 h-12",
    2: "w-40 h-11",
    3: "w-36 h-10"
  };

  return (
    <div className={`
      ${boxSizes[level]} 
      ${colorFamilies[colorFamily][level]}
      flex items-center justify-center 
      relative z-20
      hover:shadow-lg transition-shadow duration-200
      rounded-lg
      font-medium
    `}>
      <div className="text-center text-sm p-1">
        {title}
      </div>
    </div>
  );
};

// Komponen Level Node
const LevelNode = ({ node, level, colorFamily }) => {
  return (
    <div className="flex flex-col items-center">
      <DiagramBox 
        title={node.title} 
        level={level} 
        colorFamily={colorFamily}
      />
    </div>
  );
};

// DiagramView Component
const DiagramView = () => {
  // Array of color families for different main branches
  const branchColors = ['blue', 'purple', 'green', 'orange', 'pink', 'teal', 'indigo'];

  return (
    <div className="p-8 overflow-auto bg-white rounded-lg shadow-lg">
      <div className="min-w-[1800px] relative">
        {/* Level 0 - Root */}
        <div className="flex flex-col items-center mb-20">
          <DiagramBox title="BUCKERY PROJECT" level={0} colorFamily="blue" />
        </div>

        {/* Level 1 - Main Categories */}
        <div className="mb-20">
          <div className="grid grid-cols-7 gap-24">
            {wbsData.children?.map((node, index) => (
              <div key={index} className="flex flex-col items-center">
                <LevelNode 
                  node={node} 
                  level={1}
                  colorFamily={branchColors[index % branchColors.length]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Level 2 */}
        <div className="mb-20">
          <div className="grid grid-cols-7 gap-24">
            {wbsData.children?.map((level1Node, index) => (
              <div key={index} className="flex flex-col gap-8">
                {level1Node.children?.map((level2Node, l2Index) => (
                  <div key={l2Index} className="flex flex-col items-center">
                    <LevelNode 
                      node={level2Node} 
                      level={2}
                      colorFamily={branchColors[index % branchColors.length]}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Level 3 */}
        <div>
          <div className="grid grid-cols-7 gap-24">
            {wbsData.children?.map((level1Node, index) => (
              <div key={index} className="flex flex-col gap-8">
                {level1Node.children?.map((level2Node) =>
                  level2Node.children?.map((level3Node, l3Index) => (
                    <div key={l3Index} className="flex flex-col items-center">
                      <LevelNode 
                        node={level3Node} 
                        level={3}
                        colorFamily={branchColors[index % branchColors.length]}
                      />
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
// View Selector Component
// Di ViewSelector, tambahkan button untuk Gantt Chart
const ViewSelector = ({ currentView, setCurrentView }) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setCurrentView('tree')}
        className={`p-2 rounded ${currentView === 'tree' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        title="Tree View"
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => setCurrentView('list')}
        className={`p-2 rounded ${currentView === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        title="List View"
      >
        <List size={20} />
      </button>
      <button
        onClick={() => setCurrentView('diagram')}
        className={`p-2 rounded ${currentView === 'diagram' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        title="Diagram View"
      >
        <GitBranch size={20} />
      </button>
      <button
        onClick={() => setCurrentView('gantt')}
        className={`p-2 rounded ${currentView === 'gantt' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        title="Gantt Chart"
      >
        <Calendar size={20} />
      </button>
    </div>
  );
};

// Section View Component
const SectionView = ({ node, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{node.title}</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          {isExpanded ? <MinusSquare size={20} /> : <PlusSquare size={20} />}
        </button>
      </div>
      {isExpanded && (
        <div className="grid gap-4">
          {node.children?.map((child, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium mb-2">{child.title}</h4>
              {child.tasks && (
                <ul className="list-disc list-inside text-gray-600">
                  {child.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="mb-1">{task}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main WBS Component
const WBSVisual = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandAll, setExpandAll] = useState(false);
  const [currentView, setCurrentView] = useState('diagram'); // Set default view

  const renderNode = (node, level = 0) => {
    return (
      <WBSNode
        key={node.id}
        title={node.title}
        level={level}
        tasks={node.tasks}
        searchTerm={searchTerm}
      >
        {node.children?.map(child => renderNode(child, level + 1))}
      </WBSNode>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'tree':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {renderNode(wbsData)}
          </div>
        );
      case 'list':
        return (
          <div className="space-y-4">
            {wbsData.children?.map((section, index) => (
              <SectionView key={index} node={section} />
            ))}
          </div>
        );
      case 'diagram':
        return <DiagramView />;
      case 'gantt':
        return <GanttChart />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Buckery Project WBS</h1>
        <ViewSelector
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>
      {renderContent()}
    </div>
  );
};

export default WBSVisual;