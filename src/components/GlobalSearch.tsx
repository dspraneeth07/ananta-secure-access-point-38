
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCriminals } from '@/data/mockCriminals';
import { useNavigate } from 'react-router-dom';

interface GlobalSearchProps {
  onSelect?: (criminal: any) => void;
}

const drugCategories = {
  'Stimulants': ['Cocaine', 'Methamphetamine', 'Amphetamine', 'MDMA'],
  'Depressants': ['Heroin', 'Morphine', 'Codeine', 'Fentanyl'],
  'Hallucinogens': ['LSD', 'PCP', 'Psilocybin', 'DMT'],
  'Cannabis': ['Marijuana', 'Hashish', 'Hash Oil', 'Synthetic Cannabis']
};

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDrugType, setSelectedDrugType] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 2 || (selectedCategory && selectedCategory !== 'all') || (selectedDrugType && selectedDrugType !== 'all')) {
      let results = mockCriminals;
      
      // Filter by search query
      if (query.length > 2) {
        results = results.filter(criminal => 
          criminal.name.toLowerCase().includes(query.toLowerCase()) ||
          criminal.fatherName.toLowerCase().includes(query.toLowerCase()) ||
          criminal.firNumber.toLowerCase().includes(query.toLowerCase()) ||
          criminal.uniqueId.toLowerCase().includes(query.toLowerCase()) ||
          criminal.phoneNumber.includes(query) ||
          criminal.drugType.toLowerCase().includes(query.toLowerCase()) ||
          criminal.district.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Filter by drug category
      if (selectedCategory && selectedCategory !== 'all' && drugCategories[selectedCategory as keyof typeof drugCategories]) {
        const categoryDrugs = drugCategories[selectedCategory as keyof typeof drugCategories];
        results = results.filter(criminal => 
          categoryDrugs.some(drug => criminal.drugType.toLowerCase().includes(drug.toLowerCase()))
        );
      }
      
      // Filter by specific drug type
      if (selectedDrugType && selectedDrugType !== 'all') {
        results = results.filter(criminal => 
          criminal.drugType.toLowerCase().includes(selectedDrugType.toLowerCase())
        );
      }
      
      setSearchResults(results.slice(0, 5));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedDrugType('all');
    handleSearch(searchQuery);
  };

  const handleDrugTypeChange = (drugType: string) => {
    setSelectedDrugType(drugType);
    handleSearch(searchQuery);
  };

  const handleSelect = (criminal: any) => {
    setShowResults(false);
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDrugType('all');
    
    if (onSelect) {
      onSelect(criminal);
    } else {
      navigate('/search-tool', { state: { selectedCriminal: criminal } });
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex gap-2 mb-2">
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Drug Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.keys(drugCategories).map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedCategory && selectedCategory !== 'all' && (
          <Select value={selectedDrugType} onValueChange={handleDrugTypeChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Drug Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {drugCategories[selectedCategory as keyof typeof drugCategories]?.map(drug => (
                <SelectItem key={drug} value={drug}>{drug}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      <Input
        type="text"
        placeholder="Search criminals, FIR, drug type..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full"
      />
      
      {showResults && searchResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-auto">
          <CardContent className="p-2">
            {searchResults.map((criminal) => (
              <div
                key={criminal.id}
                className="p-2 hover:bg-muted rounded cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelect(criminal)}
              >
                <div className="font-medium">{criminal.name}</div>
                <div className="text-sm text-muted-foreground">
                  FIR: {criminal.firNumber} | Crime No: {criminal.uniqueId} | {criminal.drugType}
                </div>
                <div className="text-xs text-muted-foreground">
                  {criminal.district}, {criminal.state}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      {showResults && searchResults.length === 0 && (searchQuery.length > 2 || (selectedCategory && selectedCategory !== 'all') || (selectedDrugType && selectedDrugType !== 'all')) && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50">
          <CardContent className="p-4 text-center text-muted-foreground">
            No results found for your search criteria
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GlobalSearch;
