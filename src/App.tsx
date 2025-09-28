import React, { useState, useRef, useEffect } from 'react';
import { Search, Play, Clock, CheckCircle, AlertCircle, Globe, Terminal, Zap } from 'lucide-react';
import { Logo } from './components/Logo';

interface ExecutionStep {
  id: string;
  action: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  details?: string;
  timestamp: number;
}

interface CommandHistory {
  id: string;
  command: string;
  timestamp: number;
  status: 'completed' | 'failed' | 'running';
  steps: ExecutionStep[];
  results?: any[];
}

function App() {
  const [command, setCommand] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentExecution, setCurrentExecution] = useState<ExecutionStep[]>([]);
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentExecution]);

  const simulateExecution = async (command: string) => {
    setIsExecuting(true);
    setCurrentExecution([]);
    setResults([]);

    const commandId = Date.now().toString();
    const steps: ExecutionStep[] = [];

    // Simulate different execution steps based on command type
    const executionSteps = getExecutionSteps(command);
    
    let allSteps: ExecutionStep[] = [];

    for (let i = 0; i < executionSteps.length; i++) {
      const step: ExecutionStep = {
        id: `${commandId}-${i}`,
        action: executionSteps[i].action,
        status: 'running',
        details: executionSteps[i].details,
        timestamp: Date.now()
      };

      allSteps = [...allSteps, step];
      setCurrentExecution([...allSteps]);

      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

      // Update step status
      step.status = Math.random() > 0.1 ? 'completed' : 'error';
      if (step.status === 'error') {
        step.details = 'Execution failed - retrying...';
        await new Promise(resolve => setTimeout(resolve, 1000));
        step.status = 'completed';
      }

      setCurrentExecution([...allSteps]);

      if (i === executionSteps.length - 1) {
        // Generate mock results
        const mockResults = generateMockResults(command);
        setResults(mockResults);
      }
    }

    // Add to history
    const historyItem: CommandHistory = {
      id: commandId,
      command,
      timestamp: Date.now(),
      status: 'completed',
      steps: allSteps,
      results: generateMockResults(command)
    };

    setHistory(prev => [historyItem, ...prev]);
    setIsExecuting(false);
  };

  const getExecutionSteps = (command: string): { action: string; details: string }[] => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('search') || lowerCommand.includes('find')) {
      return [
        { action: 'Parsing natural language command', details: 'Analyzing search intent and parameters' },
        { action: 'Initializing browser session', details: 'Starting headless Chrome instance' },
        { action: 'Navigating to search engine', details: 'Opening Google.com' },
        { action: 'Executing search query', details: 'Entering search terms and submitting' },
        { action: 'Extracting search results', details: 'Parsing HTML and extracting relevant data' },
        { action: 'Filtering and ranking results', details: 'Applying filters and sorting by relevance' },
        { action: 'Formatting structured output', details: 'Converting to JSON format' }
      ];
    } else if (lowerCommand.includes('price') || lowerCommand.includes('compare')) {
      return [
        { action: 'Parsing comparison request', details: 'Identifying products and comparison criteria' },
        { action: 'Launching browser automation', details: 'Starting Playwright session' },
        { action: 'Visiting e-commerce sites', details: 'Opening multiple product pages' },
        { action: 'Scraping product data', details: 'Extracting prices, ratings, and specifications' },
        { action: 'Cross-referencing information', details: 'Validating data across multiple sources' },
        { action: 'Generating comparison table', details: 'Creating structured comparison output' }
      ];
    } else {
      return [
        { action: 'Processing natural language input', details: 'Understanding user intent' },
        { action: 'Planning execution strategy', details: 'Determining optimal navigation path' },
        { action: 'Initializing web automation', details: 'Starting browser automation tools' },
        { action: 'Executing web interactions', details: 'Performing clicks, scrolls, and data extraction' },
        { action: 'Collecting results', details: 'Gathering and structuring output data' },
        { action: 'Finalizing output', details: 'Formatting results for user consumption' }
      ];
    }
  };

  const generateMockResults = (command: string): any[] => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('laptop') || lowerCommand.includes('computer')) {
      return [
        { name: 'Dell XPS 13', price: '₹89,999', rating: '4.5/5', specs: '11th Gen Intel Core i5, 8GB RAM, 256GB SSD', url: 'https://example.com/dell-xps-13' },
        { name: 'MacBook Air M2', price: '₹1,14,900', rating: '4.7/5', specs: 'Apple M2 Chip, 8GB RAM, 256GB SSD', url: 'https://example.com/macbook-air-m2' },
        { name: 'HP Pavilion 14', price: '₹65,999', rating: '4.2/5', specs: 'AMD Ryzen 5, 8GB RAM, 512GB SSD', url: 'https://example.com/hp-pavilion-14' },
        { name: 'Lenovo ThinkPad E14', price: '₹72,500', rating: '4.4/5', specs: '11th Gen Intel Core i5, 8GB RAM, 256GB SSD', url: 'https://example.com/lenovo-thinkpad-e14' },
        { name: 'ASUS VivoBook 15', price: '₹55,990', rating: '4.1/5', specs: 'Intel Core i3, 4GB RAM, 256GB SSD', url: 'https://example.com/asus-vivobook-15' }
      ];
    } else if (lowerCommand.includes('phone') || lowerCommand.includes('mobile')) {
      return [
        { name: 'iPhone 14', price: '₹79,900', rating: '4.6/5', specs: 'A15 Bionic, 6.1" Display, 128GB', url: 'https://example.com/iphone-14' },
        { name: 'Samsung Galaxy S23', price: '₹74,999', rating: '4.5/5', specs: 'Snapdragon 8 Gen 2, 6.1" Display, 256GB', url: 'https://example.com/samsung-s23' },
        { name: 'OnePlus 11', price: '₹56,999', rating: '4.4/5', specs: 'Snapdragon 8 Gen 2, 6.7" Display, 128GB', url: 'https://example.com/oneplus-11' }
      ];
    } else {
      return [
        { title: 'Search Result 1', description: 'Relevant information based on your query', url: 'https://example.com/result1', relevance: '95%' },
        { title: 'Search Result 2', description: 'Additional information matching your criteria', url: 'https://example.com/result2', relevance: '89%' },
        { title: 'Search Result 3', description: 'Related content for your search query', url: 'https://example.com/result3', relevance: '82%' }
      ];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() && !isExecuting) {
      simulateExecution(command);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Clock className="w-4 h-4 animate-spin text-blue-400" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const exampleCommands = [
    "Search for laptops under 80k and list top 5",
    "Find best smartphones with good camera under 50k",
    "Compare prices of iPhone 14 across different sites",
    "Search for gaming laptops with RTX graphics",
    "Find restaurants near me with good ratings"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Logo className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold text-white">Fetchly</h1>
              <p className="text-gray-400 text-sm">AI-powered web navigation and data extraction</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Command Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Command Input */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-blue-400" />
                Natural Language Command
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Enter your command (e.g., 'search for laptops under 50k and list top 5')"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                    rows={3}
                    disabled={isExecuting}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {exampleCommands.slice(0, 3).map((example, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCommand(example)}
                        className="text-xs px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full hover:bg-blue-600/30 transition-colors duration-200"
                        disabled={isExecuting}
                      >
                        {example.split(' ').slice(0, 3).join(' ')}...
                      </button>
                    ))}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!command.trim() || isExecuting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                  >
                    {isExecuting ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Executing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Execute</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Execution Steps */}
            {currentExecution.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Execution Status
                </h2>
                
                <div ref={scrollRef} className="space-y-3 max-h-64 overflow-y-auto">
                  {currentExecution.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-900/30">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">{step.action}</p>
                        {step.details && (
                          <p className="text-gray-400 text-sm mt-1">{step.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Search className="w-5 h-5 mr-2 text-green-400" />
                  Extracted Results
                </h2>
                
                <div className="grid gap-4">
                  {results.map((result, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-colors duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">{result.name || result.title}</h3>
                        {result.price && (
                          <span className="text-green-400 font-semibold">{result.price}</span>
                        )}
                      </div>
                      
                      {result.description && (
                        <p className="text-gray-400 text-sm mb-2">{result.description}</p>
                      )}
                      
                      {result.specs && (
                        <p className="text-gray-300 text-sm mb-2">{result.specs}</p>
                      )}
                      
                      <div className="flex justify-between items-center text-xs">
                        {result.rating && (
                          <span className="text-yellow-400">{result.rating}</span>
                        )}
                        {result.relevance && (
                          <span className="text-blue-400">Relevance: {result.relevance}</span>
                        )}
                        {result.url && (
                          <a href={result.url} className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                            View Details
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Status */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                Agent Status
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    isExecuting 
                      ? 'bg-yellow-600/20 text-yellow-400' 
                      : 'bg-green-600/20 text-green-400'
                  }`}>
                    {isExecuting ? 'Executing' : 'Ready'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Browser Engine</span>
                  <span className="text-white text-sm">Playwright</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">LLM Model</span>
                  <span className="text-white text-sm">GPT-4</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Commands Executed</span>
                  <span className="text-white text-sm">{history.length}</span>
                </div>
              </div>
            </div>

            {/* Command History */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Command History</h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-gray-400 text-sm">No commands executed yet</p>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg bg-gray-900/30 border border-gray-700">
                      <p className="text-white text-sm font-medium truncate">{item.command}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          item.status === 'completed' 
                            ? 'bg-green-600/20 text-green-400' 
                            : 'bg-red-600/20 text-red-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Example Commands */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Example Commands</h3>
              
              <div className="space-y-2">
                {exampleCommands.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setCommand(example)}
                    className="w-full text-left p-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded transition-colors duration-200"
                    disabled={isExecuting}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;