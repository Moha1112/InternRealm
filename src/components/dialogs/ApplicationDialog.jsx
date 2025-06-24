
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Upload, CheckCircle, X, File } from 'lucide-react';
import {internshipAPI} from "@/api/internshipAPI.js";

import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

const ApplicationDialog = ({ isOpen, onClose, internship }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [selectedCV, setSelectedCV] = useState('');
  const [motivation, setMotivation] = useState('');
  const [availability, setAvailability] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [error, setError] = useState(null);
  

  // Mock CV data - in real app, fetch from API
  const availableCVs = [
    { id: '1', name: 'Software Engineering Resume.pdf', uploadDate: '2024-01-15' },
    { id: '2', name: 'General CV.pdf', uploadDate: '2024-01-10' },
    { id: '3', name: 'Tech Internship Resume.pdf', uploadDate: '2024-01-20' }
  ];

  const handleSubmit = async () => {
    if (!selectedCV || !coverLetter.trim() || !motivation.trim()) {
      console.log({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // await apiService.applyToInternship(internship.id.toString(), applicationData);
      await internshipAPI.apply(internship.id, coverLetter);

      setApplicationSubmitted(true);
      console.log({
        title: "Application Submitted!",
        description: "Your application has been sent to the company"
      });
    } catch {
      setError("There was an error submitting your application, you all ready applayed");
      console.log({
        title: "Submission Failed",
        description: "There was an error submitting your application",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCoverLetter('');
    setSelectedCV('');
    setMotivation('');
    setAvailability('');
    setApplicationSubmitted(false);
    onClose();
  };

  if (applicationSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle>Application Submitted!</DialogTitle>
            <DialogDescription>
              Your application for {internship.title} at {internship.company.name} has been successfully submitted.
              You will receive email notifications about the status of your application.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        {error && (
          <Alert className="mb-4" variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <DialogHeader>
          <DialogTitle>Apply for Internship</DialogTitle>
          <DialogDescription>
            Applying for <strong>{internship.title}</strong> at <strong>{internship.company.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* CV Selection */}
          <div className="space-y-3">
            <Label htmlFor="cv-select">Select CV/Resume *</Label>
            <Select value={selectedCV} onValueChange={setSelectedCV}>
              <SelectTrigger id="cv-select">
                <SelectValue placeholder="Choose a CV to submit" />
              </SelectTrigger>
              <SelectContent>
                {availableCVs.map((cv) => (
                  <SelectItem key={cv.id} value={cv.id}>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{cv.name}</div>
                        <div className="text-xs text-gray-500">Uploaded {cv.uploadDate}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload New CV
            </Button>
          </div>

          {/* Cover Letter */}
          <div className="space-y-3">
            <Label htmlFor="cover-letter">Cover Letter *</Label>
            <Textarea
              id="cover-letter"
              placeholder="Write a personalized cover letter for this position..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <div className="text-xs text-gray-500 text-right">
              {coverLetter.length}/2000 characters
            </div>
          </div>

          {/* Motivation */}
          <div className="space-y-3">
            <Label htmlFor="motivation">Why are you interested in this internship? *</Label>
            <Textarea
              id="motivation"
              placeholder="Explain your motivation and what you hope to gain from this internship..."
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <Label htmlFor="availability">Availability</Label>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger>
                <SelectValue placeholder="When can you start?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediately">Immediately</SelectItem>
                <SelectItem value="2weeks">In 2 weeks</SelectItem>
                <SelectItem value="1month">In 1 month</SelectItem>
                <SelectItem value="3months">In 3 months</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Application Tips */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Application Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Personalize your cover letter for this specific role</li>
              <li>• Highlight relevant skills and experiences</li>
              <li>• Show enthusiasm for the company and position</li>
              <li>• Be specific about what you can contribute</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedCV || !coverLetter.trim() || !motivation.trim()}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
