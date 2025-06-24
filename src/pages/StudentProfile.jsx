import {useEffect, useState} from "react";
import { profileAPI } from "../api/profileAPI.js"
import {Button} from "@/components/ui/button";
import {Briefcase, ExternalLink, FileText, GraduationCap, User} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.js";
import {Label} from "@/components/ui/label.js";
import {Input} from "@/components/ui/input.js";
import {Textarea} from "@/components/ui/textarea.js";
import {Badge} from "@/components/ui/badge.js";
import {useAuth} from "@/hooks/useAuth.js";
import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator.js";

export default function Page() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const p = await profileAPI.getProfile();
        setProfile(p);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const handleInputChange = async (field, value) => {
    let payload = {};
    field.split('.').reduce((acc, part, index, arr) => {
      if (index === arr.length - 1) {
        acc[part] = value;
      } else {
        acc[part] = acc[part] || {};
      }
      return acc[part];
    }, payload);
    try {
      await profileAPI.setProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return !loading ? (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
          <p className="mt-2 text-gray-600">Manage your profile information and preferences</p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link to="/cv">
              <FileText className="h-4 w-4 mr-2" />
              Manage CV
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/applications">
              <Briefcase className="h-4 w-4 mr-2" />
              My Applications
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/saved-internships">
              View Saved Internships
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/settings">
              Settings
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="first_name"
                      value={user.first_name}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="last_name"
                      value={user.last_name}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={user.phone_number}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.basics.bio}
                    onChange={(e) => handleInputChange('basics.bio', e.target.value)}
                    placeholder="Tell companies about yourself..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={profile.education.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="major">Major</Label>
                    <Input
                      id="major"
                      value={profile.education.major}
                      onChange={(e) => handleInputChange('education.major', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      value={profile.education.graduation_year}
                      onChange={(e) => handleInputChange('education.graduation_year', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      value={profile.education.gpa}
                      onChange={(e) => handleInputChange('education.gpa', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Professional Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="portfolio">Portfolio Website</Label>
                  <Input
                    id="portfolio"
                    value={profile.social.website}
                    onChange={(e) => handleInputChange('social.websites', e.target.value)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.social.linkedin}
                      onChange={(e) => handleInputChange('social.linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profile.social.github}
                      onChange={(e) => handleInputChange('social.github', e.target.value)}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full">Save Profile</Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>Complete your profile to increase visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Basic Info</span>
                    <Badge variant="default" className="bg-green-600">Complete</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CV Upload</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/cv">Upload</Link>
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Portfolio Links</span>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/cv">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage CV Files
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/internships">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse Internships
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/applications">
                    <FileText className="h-4 w-4 mr-2" />
                    View Applications
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Profile Views</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Applications Sent</span>
                  <span className="font-medium">{profile.stats.applications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Interview Invites</span>
                  <span className="font-medium">{profile.stats.interviews}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Profile Score</span>
                  <Badge variant="default" className="bg-green-600">85%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  ) : (<p>loading...</p>)
}