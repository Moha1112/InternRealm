import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Download, Eye, Trash2, Plus, X } from 'lucide-react';
import { profileAPI } from "../api/profileAPI.js"

export default function Page () {
  const [cvFiles, setCvFiles] = useState([]);
  const [update, setUpdate] = useState(1);
  const [skills, setSkills] = useState([
    'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState([
    {
      id: '1',
      title: 'Junior Developer',
      company: 'Tech Startup',
      duration: '6 months',
      description: 'Developed web applications using React and Node.js'
    }
  ]);

  useEffect(() => {
    const load = async () => {
      try{
        const p = await profileAPI.getProfile();
        setEducation(p.education);
        const cvs = await profileAPI.getCvs();
        setCvFiles(cvs);
      } catch {
        //
      }
    };
    load();
  }, [update]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const newCV = {
        id: Date.now().toString(),
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${Math.round(file.size / 1024)} KB`,
        isDefault: cvFiles.length === 0
      };
      setCvFiles(prev => [...prev, newCV]);
    }
  };

  const setAsDefault = (id) => {
    setCvFiles(prev => prev.map(cv => ({
      ...cv,
      isDefault: cv.id === id
    })));
  };

  const addCv = async () => {
    try {
      const response = await profileAPI.createCv({
        title: prompt("Your CV title:"),
        education: [], //prompt("Your education can be separed by ,").split(','),
        experience: [], //prompt("Your experience can be separed by ,").split(','),
        skills: prompt("Your skills can be separed with ,").split(','),
        is_default: confirm("Do you want this CV the be the default on")
      });
      setUpdate(update + 1);
    } catch {
      //
    }
  }

  const deleteCV = (id) => {
    setCvFiles(prev => prev.filter(cv => cv.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CV & Profile Management</h1>
          <p className="mt-2 text-gray-600">Manage your CV files and professional profile</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CV Files */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  CV Files
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button size="sm" onClick={addCv}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload CV
                    </Button>
                  </label>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cvFiles.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No CV files uploaded yet</p>
                    <p className="text-sm text-gray-500">Upload your first CV to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cvFiles.map((cv) => (
                      <div key={cv.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900">{cv.title}</h3>
                              {cv.is_default && (
                                <Badge variant="default" className="bg-green-600">Default</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              Updated {new Date(cv.updated_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          {!cv.is_default && (
                            <Button variant="outline" size="sm" onClick={() => setAsDefault(cv.id)}>
                              Set Default
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => deleteCV(cv.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-blue-600">{exp.company}</p>
                      <p className="text-sm text-gray-600">{exp.duration}</p>
                      <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills & Education */}
          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="flex items-center space-x-1">
                      <span>{skill}</span>
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            {
              education &&
              (<Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-gray-900">{education.major}</h3>
                      <p className="text-blue-600">{education.university}</p>
                      <p className="text-sm text-gray-600">Class of {education.graduation_year}</p>
                      <p className="text-sm text-gray-600">GPA: {education.gpa}</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}