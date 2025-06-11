
import { useState, useMemo } from 'react';
import { Search, MapPin, Star, Shield, DollarSign, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Sample data for Pakistani tourist destinations
const destinations = [
  {
    id: 1,
    name: "Hunza Valley",
    location: "Gilgit-Baltistan",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    rating: 4.8,
    reviews: 245,
    budget: "medium",
    security: "high",
    description: "Breathtaking mountain valley with ancient forts and cherry blossoms",
    priceRange: "PKR 15,000 - 25,000",
    highlights: ["Karimabad", "Baltit Fort", "Attabad Lake"]
  },
  {
    id: 2,
    name: "Skardu",
    location: "Gilgit-Baltistan",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    rating: 4.9,
    reviews: 189,
    budget: "medium",
    security: "high",
    description: "Gateway to K2 with stunning lakes and mountain landscapes",
    priceRange: "PKR 20,000 - 35,000",
    highlights: ["Shangrila Lake", "Deosai Plains", "K2 Base Camp"]
  },
  {
    id: 3,
    name: "Lahore",
    location: "Punjab",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    rating: 4.6,
    reviews: 567,
    budget: "low",
    security: "medium",
    description: "Cultural capital with rich Mughal heritage and vibrant food scene",
    priceRange: "PKR 8,000 - 15,000",
    highlights: ["Badshahi Mosque", "Lahore Fort", "Food Street"]
  },
  {
    id: 4,
    name: "Swat Valley",
    location: "Khyber Pakhtunkhwa",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    rating: 4.7,
    reviews: 156,
    budget: "low",
    security: "medium",
    description: "Switzerland of Pakistan with lush green valleys and waterfalls",
    priceRange: "PKR 10,000 - 18,000",
    highlights: ["Kalam", "Ushu Forest", "Malam Jabba"]
  },
  {
    id: 5,
    name: "Karachi",
    location: "Sindh",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    rating: 4.3,
    reviews: 423,
    budget: "medium",
    security: "medium",
    description: "Coastal metropolis with beaches, markets, and diverse cuisine",
    priceRange: "PKR 12,000 - 22,000",
    highlights: ["Clifton Beach", "Quaid's Mausoleum", "Saddar Bazaar"]
  },
  {
    id: 6,
    name: "Naran Kaghan",
    location: "Khyber Pakhtunkhwa",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    rating: 4.5,
    reviews: 234,
    budget: "medium",
    security: "high",
    description: "Alpine valley with pristine lakes and meadows",
    priceRange: "PKR 14,000 - 28,000",
    highlights: ["Lake Saif ul Malook", "Babusar Pass", "Lulusar Lake"]
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [securityFilter, setSecurityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const filteredAndSortedDestinations = useMemo(() => {
    let filtered = destinations.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dest.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBudget = budgetFilter === 'all' || dest.budget === budgetFilter;
      const matchesSecurity = securityFilter === 'all' || dest.security === securityFilter;
      
      return matchesSearch && matchesBudget && matchesSecurity;
    });

    // Sort destinations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, budgetFilter, securityFilter, sortBy]);

  const getSecurityBadgeColor = (security: string) => {
    switch (security) {
      case 'high': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getBudgetBadgeColor = (budget: string) => {
    switch (budget) {
      case 'low': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'medium': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'high': return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Discover Pakistan's Hidden Gems
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100 animate-fade-in">
            Find the perfect destination based on your budget, preferences, and security needs
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative animate-scale-in">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search destinations or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-full border-0 shadow-lg bg-white/95 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filters & Sorting</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Budgets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="low">Budget Friendly</SelectItem>
                  <SelectItem value="medium">Moderate</SelectItem>
                  <SelectItem value="high">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security Level</label>
              <Select value={securityFilter} onValueChange={setSecurityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High Security</SelectItem>
                  <SelectItem value="medium">Medium Security</SelectItem>
                  <SelectItem value="low">Basic Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setBudgetFilter('all');
                  setSecurityFilter('all');
                  setSortBy('rating');
                }}
                variant="outline"
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedDestinations.length} destination{filteredAndSortedDestinations.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedDestinations.map((destination) => (
            <Card key={destination.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm animate-fade-in">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Badge className={getSecurityBadgeColor(destination.security)}>
                    <Shield className="h-3 w-3 mr-1" />
                    {destination.security}
                  </Badge>
                  <Badge className={getBudgetBadgeColor(destination.budget)}>
                    <DollarSign className="h-3 w-3 mr-1" />
                    {destination.budget}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{destination.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-emerald-100 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-emerald-600 fill-current mr-1" />
                    <span className="text-sm font-semibold text-emerald-800">
                      {destination.rating}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {destination.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Price Range:</p>
                  <p className="font-semibold text-emerald-600">{destination.priceRange}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Highlights:</p>
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Star className="h-4 w-4 mr-1" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                  
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-2xl font-bold mb-4">Explore Pakistan's Beauty</h4>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Discover the breathtaking landscapes, rich culture, and warm hospitality that Pakistan has to offer. 
            Plan your perfect trip with confidence using our comprehensive destination guide.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>🏔️ Mountain Adventures</span>
            <span>🏛️ Historical Sites</span>
            <span>🏖️ Coastal Escapes</span>
            <span>🍽️ Culinary Experiences</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
