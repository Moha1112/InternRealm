import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Eye, CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { internshipAPI } from '../api/internshipAPI';

export default function CompanyApplicationsList () {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [applications, setApplications] = useState([]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'under_review':
        return <Badge variant="outline"><Eye className="h-3 w-3 mr-1" />Reviewing</Badge>;
      case 'hired':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.internship.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPosition = positionFilter === 'all' || app.internship.title === positionFilter;
    return matchesSearch && matchesStatus && matchesPosition;
  });

  useEffect(() => {
      const fetchApplications = async () => {
        const response = await internshipAPI.getApplications();
        setApplications(response);
      }
      fetchApplications();
    }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <p className="mt-2 text-gray-600">Review and manage internship applications</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Applications
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Pending</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="hired">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="Software Engineering Intern">Software Engineering</SelectItem>
                  <SelectItem value="Data Science Intern">Data Science</SelectItem>
                  <SelectItem value="UX Design Intern">UX Design</SelectItem>
                  <SelectItem value="Marketing Intern">Marketing</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="text-sm text-gray-600 flex items-center">
                {filteredApplications.length} applications found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{application.student.name}</h3>
                      {getStatusBadge(application.status)}
                    </div>
                    <p className="text-blue-600 font-medium">{application.internship.title}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {application.student.university} • Applied {new Date(application.applied_at).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['React', 'JavaScript', 'Node.js'].slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/internships/${application.internship.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    {application.status === 'submitted' && (
                      <>
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new applications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}