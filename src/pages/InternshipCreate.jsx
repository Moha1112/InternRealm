import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { internshipAPI } from '../api/internshipAPI';

export default function Page() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    duration_months: '',
    experienceLevel: '',
    salary: 0,
    requirements: [],
    skills: [],
    benefits: [],
    application_deadline: "2026-05-04"
  });

  const addItem = (type, value, setter) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      setter('');
    }
  };

  const removeItem = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await internshipAPI.create(formData);
      navigate('/dashboard');
    } catch {
      //
    }
    console.log('Creating internship:', formData);
    // Here you would typically submit to an API
    
  };

  const [newRequirement, setNewRequirement] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newBenefit, setNewBenefit] = useState('');

  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post New Internship</h1>
          <p className="mt-2 text-gray-600">Create a new internship opportunity</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Internship Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Software Engineering Intern"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the internship role, responsibilities, and what the intern will learn..."
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. San Francisco, CA or Remote"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Internship Type *
                  </label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Summer">Summer</SelectItem>
                      <SelectItem value="Fall">Fall</SelectItem>
                      <SelectItem value="Spring">Spring</SelectItem>
                      <SelectItem value="Winter">Winter</SelectItem>
                      <SelectItem value="Year-round">Year-round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration in Months *
                  </label>
                  <Input
                    type="number"
                    value={formData.duration_months}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration_months: e.target.value }))}
                    placeholder="e.g. 12 weeks"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level *
                  </label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary *
                </label>
                <Input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                  placeholder="e.g. $25/hour or $5000/month"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements & Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Skills
                </label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skills', newSkill, setNewSkill))}
                  />
                  <Button type="button" onClick={() => addItem('skills', newSkill, setNewSkill)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      <span>{skill}</span>
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeItem('skills', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements
                </label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Add a requirement"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('requirements', newRequirement, setNewRequirement))}
                  />
                  <Button type="button" onClick={() => addItem('requirements', newRequirement, setNewRequirement)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{req}</span>
                      <X 
                        className="h-4 w-4 cursor-pointer text-gray-500" 
                        onClick={() => removeItem('requirements', index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Benefits
                </label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Add a benefit"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('benefits', newBenefit, setNewBenefit))}
                  />
                  <Button type="button" onClick={() => addItem('benefits', newBenefit, setNewBenefit)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{benefit}</span>
                      <X 
                        className="h-4 w-4 cursor-pointer text-gray-500" 
                        onClick={() => removeItem('benefits', index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/company')}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Post Internship
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}