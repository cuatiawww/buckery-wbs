/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ChevronRight, MinusSquare, PlusSquare, List, LayoutGrid, GitBranch } from 'lucide-react';
import { wbsData } from '../data/wbsData';

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
  const [currentView, setCurrentView] = useState('diagram');

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
      case 'grid':
        return (
          <div className="grid grid-cols-2 gap-4">
            {wbsData.children?.map((section, index) => (
              <SectionView key={index} node={section} />
            ))}
          </div>
        );
      case 'diagram':
        return <DiagramView />;
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