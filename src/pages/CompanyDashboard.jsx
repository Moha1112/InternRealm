import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Users, Eye, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { internshipAPI } from "../api/internshipAPI.js";
import { profileAPI } from "../api/profileAPI";

export default function Page() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState([
    { title: 'Active Internships', value: '12', icon: PlusCircle, color: 'text-blue-600' },
    { title: 'Total Applications', value: '148', icon: Users, color: 'text-green-600' },
    { title: 'Profile Views', value: '1,247', icon: Eye, color: 'text-purple-600' },
    { title: 'This Month', value: '+24%', icon: TrendingUp, color: 'text-orange-600' }
  ]);
  const [recentInternships, setRecentInternships] = useState([]);
  
  useEffect(() => {
    setStats([
      { title: 'Active Internships', value: profile?.stats?.activeInternships + "/" + profile?.stats?.totalInternships, icon: PlusCircle, color: 'text-blue-600' },
      { title: 'Total Applications', value: profile?.stats?.applications, icon: Users, color: 'text-green-600' },
      { title: 'Profile Views', value: '1', icon: Eye, color: 'text-purple-600' },
      { title: 'This Month', value: '+100%', icon: TrendingUp, color: 'text-orange-600' }
    ]);
  }, [profile]);

  useEffect(() => {
    async function getApplications() {
      try {
        const i = await internshipAPI.getInternshipList({company_id: profile.id});
        setRecentInternships(i);
      } catch {
        // prevent empty block statment error
      }
    }
    getApplications();
  }, [profile]);

  useEffect(() => {
    async function getApplications() {
      try {
        const p = await profileAPI.getProfile();
        setProfile(p);
        const i = await internshipAPI.getInternshipList({company_id: profile.id});
        setRecentInternships(i);
      } catch {
        // prevent empty block statment error
      }
    }
    getApplications();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your internships and applications</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/internships/create">
              <PlusCircle className="h-4 w-4 mr-2" />
              Post New Internship
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Internships */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Internships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInternships.map((internship) => (
                    <div key={internship.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{internship.title}</h3>
                        <p className="text-sm text-gray-600">{internship.applicants} applicants • {new Date(internship.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={internship.status === 'Active' ? 'default' : 'secondary'}>
                          {internship.status}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/internships/manage`}>
                            Manage
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/applicationsc">
                    <Users className="h-4 w-4 mr-2" />
                    View Applications
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/profile">
                    <Calendar className="h-4 w-4 mr-2" />
                    Edit Company Profile
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/internships">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}