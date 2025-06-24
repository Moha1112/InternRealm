import {toast} from "sonner";
import {internshipAPI} from "@/api/internshipAPI.js";
import {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.js";
import {Button} from "@/components/ui/button.js";
import {BookmarkX, Building, Clock, MapPin} from "lucide-react";
import {Badge} from "@/components/ui/badge.js";
import {Link} from "react-router-dom";

export default function Page() {
  const [savedInternships, setSavedInternships] = useState([]);
  const [internshipsDetails, setInternshipsDetails] = useState({});
  const [removerd, setRemoverd] = useState(false); // helps triggering the useEffect to update list
  const handleRemoveFromSaved = (internshipId, title) => {
    try {
      internshipAPI.unsaveInternship(internshipId).then(() => {
        setRemoverd(!removerd);
        console.log({
          message: "Removed internship",
          description: `${title} has been removed from your saved internships.`,
        });
      });
    }
    catch (error) {
      console.log("Error while unsaving internship", error);
    }
  }

  useEffect(() => {
    async function loadInternships() {
      let savedInters = await internshipAPI.getSavedInternships();
      let internDetails = {}
      for (const savedInter of savedInters) {
        if (savedInter in internDetails) continue;
        let _y = await internshipAPI.getInternship(savedInter);
        internDetails[savedInter] = _y;
      }
      setSavedInternships(savedInters);
      setInternshipsDetails(internDetails);
    }
    loadInternships();
  }, [removerd]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Saved Internships</h1>
          <p className="mt-2 text-gray-600">Keep track of internships you're interested in</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedInternships.map((internship_id) => (
            <Card key={internship_id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{internshipsDetails[internship_id].title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      {internshipsDetails[internship_id].company.name}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromSaved(internship_id, internshipsDetails[internship_id].title)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <BookmarkX className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {internshipsDetails[internship_id].location}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {internshipsDetails[internship_id].duration_months} • months
                </div>

                {/*<div className="flex flex-wrap gap-1">
                  {internshipsDetails[internship_id].skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>*/}

                <div className="text-xs text-gray-500">
                  Posted: {internshipsDetails[internship_id].created_at}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" asChild className="flex-1">
                    <Link to={`/internships/${internship_id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/applications/${internship_id}`}>Apply</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {savedInternships.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved internships</h3>
            <p className="text-gray-600 mb-4">Start browsing internships to save the ones you're interested in</p>
            <Button asChild>
              <Link to="/internships">Browse Internships</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}