import React from "react";
import {
  Heart,
  LogIn,
  UserPlus,
  ChevronRight,
  Shield,
  Users,
  Activity,
} from "lucide-react";
import "../index.css";
import { Link } from "react-router-dom";
import land from "../assets/land.jpg";
function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className=" mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">HealthCare+</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium flex items-center"
              to={"/login"}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
            <Link
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              to={"/signup"}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className=" h-20 px-6 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Empowering You With Personalized Health Solutions
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Access evidence-based medical advice, and monitor your health—all from one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                to={"/signup"}
              >
                Get Started
                <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Secure & Private
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  AI Assistant
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">24/7 Care</p>
              </div>
            </div>
          </div>

          {/* 3D Animation Container */}
          <div className="relative">
            <div className="w-full h-[500px] bg-gradient-to-r from-blue-100 to-blue-50 rounded-3xl overflow-hidden relative">
              <img
                src={land}
                alt="Medical professionals"
                className="absolute inset-0 w-full h-full object-cover  "
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>

              {/* Animated Elements */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
