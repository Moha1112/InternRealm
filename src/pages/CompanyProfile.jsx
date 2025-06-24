import {useEffect, useState} from "react";
import { profileAPI } from "../api/profileAPI.js"
import {Button} from "@/components/ui/button";
import {Edit, Globe, Mail, MapPin, Phone} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.js";
import {Label} from "@/components/ui/label.js";
import {Input} from "@/components/ui/input.js";
import {Textarea} from "@/components/ui/textarea.js";
import {Badge} from "@/components/ui/badge.js";
import {useAuth} from "@/hooks/useAuth.js";

export default function Page() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const p = await profileAPI.getProfile();
        setProfile(p);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  let _profile = {
    "type": "company",
    "id": 1,
    "basics": {
      "company_name": "techTop",
      "description": "i dont know",
      "verification_status": true
    },
    "details": {
      "industry": {
        "value": "tech",
        "display": "Technology"
      },
      "founded_year": 1986,
      "size": 100,
      "headquarters": ""
    },
    "contact": {
      "website": "",
      "logo": "",
      "hr_contact": {
        "name": "test",
        "email": "",
        "phone": ""
      }
    },
    "legal": {
      "tax_id": "34-4765432"
    },
    "dates": {
      "created": "2025-05-10T20:46:21.891066+00:00",
      "updated": "2025-05-10T20:46:21.891066+00:00"
    },
    "stats": {
      "totalInternships": 3,
      "activeInternships": 1,
      "applications": 0,
      "hiredInterns": 0
    }
  };
  return !loading ?  (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={profile.contact.logo || "/placeholder.svg"}
                  alt={profile.basics.company_name}
                  className="w-16 h-16 rounded-lg object-cover border"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{profile.basics.company_name}</h1>
                  <p className="text-gray-600">{profile.details.industry.display + " • " +profile.details.size}</p>
                </div>
              </div>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Company Name</Label>
                      <Input value={profile.basics.company_name} readOnly />
                    </div>
                    <div>
                      <Label>Industry</Label>
                      <Input value={profile.details.industry.display} readOnly />
                    </div>
                    <div>
                      <Label>Company Size</Label>
                      <Input value={profile.details.size} readOnly />
                    </div>
                    <div>
                      <Label>Founded</Label>
                      <Input value={profile.details.founded_year} readOnly />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea value={profile.basics.description} rows={4} readOnly />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{profile.details.headquarters}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a href={profile.contact.website} target="_blank" className="text-blue-600 hover:text-blue-800">
                        {profile.contact.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={"mailto:"+profile.contact.hr_contact.email} target="_blank" className="text-blue-600 hover:text-blue-800">{profile.contact.hr_contact.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a href={"tel:"+profile.contact.hr_contact.phone} target={"_blank"} className="text-blue-600 hover:text-blue-800">{profile.contact.hr_contact.phone}</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Internships</span>
                    <Badge variant="secondary">{profile.stats.totalInternships}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Postings</span>
                    <Badge variant="default">{profile.stats.activeInternships}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications</span>
                    <Badge variant="outline">{profile.stats.applications}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hired Interns</span>
                    <Badge variant="secondary">{profile.stats.hiredInterns}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="default">
                    Post New Internship
                  </Button>
                  <Button className="w-full" variant="outline">
                    View Applications
                  </Button>
                  <Button className="w-full" variant="outline">
                    Manage Internships
                  </Button>
                  <Button className="w-full" variant="outline">
                    Company Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <p>Loading...</p>;
}