
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Building, Bookmark, Heart, Eye, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import ApplicationDialog from './dialogs/ApplicationDialog';
import {internshipAPI} from "@/api/internshipAPI.js";


const InternshipCard = ({ internship, isSaved = false, onSave, onApply }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [savedState, setSavedState] = useState(isSaved);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);

  const handleApplyClick = () => {
    setShowApplicationDialog(true);
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSavedState(!savedState);
      savedState ? internshipAPI.unsaveInternship(internship.id) : internshipAPI.saveInternship(internship.id)
      console.log({
        title: savedState ? "Internship Removed" : "Internship Saved",
        description: savedState
          ? `${internship.title} has been removed from your saved internships.`
          : `${internship.title} has been saved to your favorites.`,
      });
      onSave?.();
    } catch (error) {
      console.log({
        title: "Error",
        description: "There was an error saving the internship. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  function getSimilarityColor(similarity) {
    if (similarity >= 0.85) return "bg-green-500 text-white";
    if (similarity >= 0.7) return "bg-lime-400 text-black";
    if (similarity >= 0.5) return "bg-yellow-400 text-black";
    if (similarity >= 0.3) return "bg-orange-400 text-white";
    return "bg-red-500 text-white";
  }

  return (
    <>
      <Card className="modern-shadow interactive-hover border-l-4 border-l-primary transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                  <Link to={`/internships/${internship.id}`}>
                    {internship.title}
                  </Link>
                </h3>
                <Badge variant="outline" className={getSimilarityColor(1-internship.score)}>{(100-internship.score * 100).toFixed(2)}%</Badge>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground mb-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{internship.company.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {internship.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(internship.createdAt).toLocaleDateString()}
                </div>
                {internship.salary && (
                  <div className="font-semibold text-green-600">
                    {internship.salary}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-3">
                <Badge variant="secondary">{internship.type}</Badge>
                <Badge variant="outline">{internship.position}</Badge>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {internship.description}
          </p>

          <div className="flex items-center justify-between">
            {/*<div className="flex gap-2 flex-wrap">
              {internship.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {internship.skills.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{internship.skills.length - 4} more
                </Badge>
              )}
            </div>*/}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveClick}
                disabled={isSaving}
                className={`btn-modern ${savedState ? "text-red-600 border-red-200 bg-red-50" : ""}`}
              >
                {savedState ? (
                  <>
                    <Heart className="h-4 w-4 mr-1 fill-current" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-1" />
                    Save
                  </>
                )}
              </Button>

              <Button variant="outline" size="sm" asChild className="btn-modern">
                <Link to={`/internships/${internship.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Link>
              </Button>

              <Button
                size="sm"
                onClick={handleApplyClick}
                className="btn-modern bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4 mr-1" />
                Apply Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ApplicationDialog
        isOpen={showApplicationDialog}
        onClose={() => setShowApplicationDialog(false)}
        internship={internship}
      />
    </>
  );
};

export default InternshipCard;
