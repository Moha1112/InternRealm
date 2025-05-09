import {
  Search,
  Star,
  Briefcase,
  CheckCircle,
  LineChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Homev2() {
  return <>
  </>;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Launch Your Career with the Perfect Internship
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Connect with top companies and kickstart your journey.
          </motion.p>
          <div className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">
            <div className="relative w-full">
              <Search className="absolute top-3.5 left-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search internships..."
                className="pl-10 py-6 text-base shadow-lg"
              />
            </div>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold h-12">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-14">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              icon: <CheckCircle className="text-green-600 w-8 h-8" />,
              title: 'Smart Matching',
              desc: 'AI-powered suggestions based on your skills and goals.'
            }, {
              icon: <Briefcase className="text-blue-600 w-8 h-8" />,
              title: 'Verified Employers',
              desc: 'Work with trusted companies across industries.'
            }, {
              icon: <LineChart className="text-purple-600 w-8 h-8" />,
              title: 'Progress Tracking',
              desc: 'Track your applications and responses in real-time.'
            }].map(({ icon, title, desc }, i) => (
              <div key={i} className="p-6 rounded-xl shadow hover:shadow-md transition text-left">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">{icon}</div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Internship?</h2>
        <p className="text-lg text-gray-600 mb-8">Join thousands of students who got hired.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700">
            <Link to="/register">Sign Up as Student</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 px-8">
            <Link to="/register?role=company">Register Your Company</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[{
              quote: "This platform helped me land an internship at Google!",
              author: "Amina M., Software Engineering Student",
              rating: 5
            }, {
              quote: "We found highly qualified interns easily. Fantastic service!",
              author: "Khalid Z., HR Manager",
              rating: 5
            }].map(({ quote, author, rating }, i) => (
              <div key={i} className="border rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="italic text-lg mb-2">“{quote}”</blockquote>
                <p className="text-gray-600 font-medium">— {author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
