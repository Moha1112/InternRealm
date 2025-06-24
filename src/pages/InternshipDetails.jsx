import {useEffect, useState} from "react";
import {internshipAPI} from "@/api/internshipAPI.js";
import {Badge} from "@/components/ui/badge.js";
import {Building2, Calendar, Clock, DollarSign, MapPin, Target, Users} from "lucide-react";
import {Button} from "@/components/ui/button.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.js";
import {Link, useParams} from "react-router-dom";
import ApplicationDialog from '@/components/dialogs/ApplicationDialog';

export default function page () {
  const { internshipId } = useParams();
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const handleApplyClick = () => {
    setShowApplicationDialog(true);
  };

  const [internship, setInternship] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadInternship() {
      const internship = await internshipAPI.getInternship(internshipId);
      setInternship(internship);
      setIsLoaded(true);
    }
    loadInternship();
  }, [internshipId]);

  function getSimilarityColor(similarity) {
    if (similarity >= 0.85) return "bg-green-500 text-white";
    if (similarity >= 0.7) return "bg-lime-400 text-black";
    if (similarity >= 0.5) return "bg-yellow-400 text-black";
    if (similarity >= 0.3) return "bg-orange-400 text-white";
    return "bg-red-500 text-white";
  }

  if (isLoaded) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{internship.title}</h1>
              <p className="text-xl text-blue-600 font-semibold">{internship.company.name}</p>
            </div>
            {internship.remote_option && <Badge variant="secondary" className="bg-blue-100 text-blue-800">Remote</Badge>}
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {internship.location}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {internship.duration_months}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Posted {new Date(internship.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              {internship.salary}
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleApplyClick}>
              Apply Now
            </Button>
            <Button variant="outline">
              Save Internship
            </Button>
            <Button variant="outline">
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Internship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{internship.description}</p>
              </CardContent>
            </Card>

            {/* Responsibilities <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {internship.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>*/}


            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {internship.requirements.split(',').map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {internship.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>*/}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Match Score <MatchScore matchScore={internship.matchScore} showDetails={true} />*/}

            {/* Skills Required <Card>
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>*/}


            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  About {internship.company.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{internship.company.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{internship.company.size}</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{internship.company.industry}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Founded {internship.company.founded}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link to={`/companies/${internship.company.id}`}>
                    View Company Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Similar Internships */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Internships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {
                    internship.similar_internships.map((sinternship) => (
                      <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Link to={"/internships/"+sinternship.id}><h4 className="font-medium text-sm">{sinternship.title}</h4></Link>
                        <p className="text-xs text-gray-600">{sinternship.company.name}</p>
                        <Badge variant="outline" className={getSimilarityColor(sinternship.similarity)}>{(100-sinternship.similarity * 100).toFixed(2)}%</Badge>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ApplicationDialog
        isOpen={showApplicationDialog}
        onClose={() => setShowApplicationDialog(false)}
        internship={internship}
      />
    </div>
  );}else{return <></>;}
}