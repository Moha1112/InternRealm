import {useEffect, useState} from "react";
import {internshipAPI} from "@/api/internshipAPI.js";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.js";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.js";
import {Button} from "@/components/ui/button.js";
import InternshipCard from "../components/InternshipCard.jsx";

export default function Page() {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [position, setPosition] = useState('');
  const [savedInternships, setSavedInternships] = useState([]);
  const [filters, setFilters] = useState({
    duration: '',
    salary: [0, 5000],
    remote: false,
    company_size: '',
    industry: ''
  });

  useEffect(() => {
    async function loadInternships() {
      const inters = await internshipAPI.search(searchTerm);
      setInternships(inters);
    }
    loadInternships();
  }, [searchTerm]);

  const filteredInternships = internships.filter(internship => {
    return (
      (location === '' || location === 'all' || internship.location.toLowerCase().includes(location.toLowerCase())) &&
      (position === '' || position === 'all' || internship.position.toLowerCase() === position.toLowerCase())
    );
  });

  const handleSaveInternship = (internshipId) => {
    setSavedInternships(prev => {
      if (prev.includes(internshipId)) {
        internshipAPI.unsaveInternship(internshipId);
        return prev.filter(id => id !== internshipId);
      } else {
        internshipAPI.saveInternship(internshipId)
        return [...prev, internshipId];
      }
    });
  };

  const handleApplyToInternship = (internshipId) => {
    console.log({
      title: "Application Started",
      description: "Redirecting to application form...",
      duration: 2000
    });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6 min-h-screen bg-gray-50 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Your Perfect Internship
          </CardTitle>
          <CardDescription>
            Search and filter internship opportunities that match your skills and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search by title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                  <SelectItem value="new-york">New York, NY</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="seattle">Seattle, WA</SelectItem>
                </SelectContent>
              </Select>

              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger>
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map and Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*<InternshipMap internships={[]}/><InterviewCalendar />*/}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredInternships.map((internship) => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            isSaved={savedInternships.includes(internship.id)}
            onSave={() => handleSaveInternship(internship.id)}
            onApply={() => handleApplyToInternship(internship.id)}
          />
        ))}

        {filteredInternships.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setLocation('');
                setPosition('');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}