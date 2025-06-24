import {useEffect, useState} from "react";
import { internshipAPI } from "@/api/internshipAPI.js";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button.js";
import {Link} from "react-router-dom";
import {Building, Calendar, Eye, FileText, MessageSquare, Search} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.js";
import {Input} from "@/components/ui/input.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.js";

export default function Page () {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await internshipAPI.getApplications();
      setApplications(response);
    }
    fetchApplications();
  }, []);

  /*
  {
      'id': app.id,
      'internship': {
          'id': app.internship.id,
          'title': app.internship.title,
          'company': app.internship.company.company_name
      },
      'status': app.status,
      'applied_at': app.applied_at.isoformat(),
      'last_updated': app.updated_at.isoformat()
  }
  */

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { label: 'Submitted', variant: 'default', color: 'bg-blue-100 text-blue-800' },
      under_review: { label: 'Under Review', variant: 'secondary', color: 'bg-yellow-100 text-yellow-800' },
      // interview_scheduled: { label: 'Interview Scheduled', variant: 'default', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejected', variant: 'destructive', color: 'bg-red-100 text-red-800' },
      hired: { label: 'Hired', variant: 'default', color: 'bg-emerald-100 text-emerald-800' }
    };

    const config = statusConfig[status] || statusConfig.submitted;
    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: applications.length,
    submitted: applications.filter(app => app.status === 'submitted').length,
    under_review: applications.filter(app => app.status === 'under_review').length,
    interview_scheduled: applications.filter(app => app.interview.id != null ).length,
    accepted: applications.filter(app => app.status === 'hired').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="mt-2 text-gray-600">Track the status of your internship applications</p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/internships">
              <Search className="h-4 w-4 mr-2" />
              Browse More Internships
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/saved-internships">
              View Saved Internships
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/cv">
              Update CV
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{statusCounts.all}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.submitted}</div>
              <div className="text-xs text-gray-600">Submitted</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.under_review}</div>
              <div className="text-xs text-gray-600">Under Review</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{statusCounts.interview_scheduled}</div>
              <div className="text-xs text-gray-600">Interviews</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{statusCounts.accepted}</div>
              <div className="text-xs text-gray-600">Accepted</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
              <div className="text-xs text-gray-600">Rejected</div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search applications by title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl hover:text-blue-600">
                        <Link to={`/internships/${application.internship.id}`}>
                          {application.internship.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="flex items-center mt-2">
                        <Building className="h-4 w-4 mr-2" />
                        {application.internship.company} • {application.internship.location}
                      </CardDescription>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Applied: {(new Date(application.applied_at).toDateString())}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Deadline: {application.internship.deadline}
                    </div>
                    <div>
                      Type: {application.type}
                    </div>
                    <div>
                      Salary: {application.internship.salary}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/internships/${application.internship.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/applications/${application.id}`}>
                        <FileText className="h-4 w-4 mr-1" />
                        Application Details
                      </Link>
                    </Button>
                    {application.interview.id != null && (
                      <Button size="sm" asChild>
                        <Link to={`/interviews/${application.interview.id}`}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          View Interview
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'No applications match your criteria' : 'No applications yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : "Start browsing internships and apply to positions that interest you"
                  }
                </p>
                <Button asChild>
                  <Link to="/internships">Browse Internships</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}