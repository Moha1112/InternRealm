import {FileText, Star, Users, TrendingUp, Search, Building} from "lucide-react";
import {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.js";
import {Button} from "@/components/ui/button.js";
import {Badge} from "@/components/ui/badge.js";
import {Link} from "react-router-dom";
import {internshipAPI} from "@/api/internshipAPI.js";
import { profileAPI } from "../api/profileAPI.js"

export default function Page() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState( []);
  const [recentApplications, setRecentApplications] = useState([]);
  const [recommendedInternships, setRecommendedInternships] = useState([])
  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { label: 'Submitted', variant: 'default' },
      under_review: { label: 'Under Review', variant: 'secondary' },
      interview_scheduled: { label: 'Interview Scheduled', variant: 'default' },
      rejected: { label: 'Rejected', variant: 'destructive' },
      accepted: { label: 'Hired', variant: 'default' }
    };

    const config = statusConfig[status] || statusConfig.submitted;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  useEffect(() => {
    setStats([
      { "title": 'Applications Sent', value: profile?.stats?.applications, icon: FileText, trend: '+' + (profile?.stats?.applications > 2 ? 2 : 0) +' this week' },
      { "title": 'Saved Internships', value: profile?.stats?.interviews, icon: Star, trend: '+' + (profile?.stats?.interviews > 2 ? 2 : 0) +' this week' },
      { title: 'Profile Views', value: '1', icon: Users, trend: '+1 this week' },
      { title: 'Skill Matches', value: '2', icon: TrendingUp, trend: 'Updated today' }
    ]);
  }, [profile]);

  useEffect(() => {
    async function getApplications() {
      try {
        const p = await profileAPI.getProfile();
        setProfile(p);
      } catch {
        // prevent empty block statment error
      }
      const apps = await internshipAPI.getApplications();
      const recs = await internshipAPI.getStudentRec();
      setRecentApplications(apps);
      setRecommendedInternships(recs);
    }
    getApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your internship search</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/internships">
              <Search className="h-4 w-4 mr-2" />
              Browse Internships
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/cv">
              <FileText className="h-4 w-4 mr-2" />
              Update CV
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/profile">
              <Users className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Your latest internship applications</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/applications">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Building className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">{application.internship.title}</h3>
                        <p className="text-sm text-gray-600">{application.company.name}</p>
                        <p className="text-xs text-gray-500">Applied {application.appliedDate}</p>
                      </div>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                ))}
                {recentApplications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No applications yet</p>
                    <Button className="mt-4" asChild>
                      <Link to="/internships">Start Applying</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Internships */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Internships that match your profile</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/internships">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedInternships.map((internship) => (
                  <div key={internship.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900 hover:text-blue-600">
                          <Link to={`/internships/${internship.id}`}>{internship.title}</Link>
                        </h3>
                        <p className="text-sm text-blue-600">{internship.company.name}</p>
                        <p className="text-xs text-gray-500">{internship.location}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {(internship.matchScore*100).toFixed(2)}% match
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/internships/${internship.id}`}>View Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Improve your visibility to companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Upload your CV</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/cv">Upload CV</Link>
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Complete profile information</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile">Edit Profile</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );}