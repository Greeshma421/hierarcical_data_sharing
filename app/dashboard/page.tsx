"use client";

import React from 'react';
import useUser from '../hook/useUser';
import { HealthProfileCard } from './components/HealthProfileCard';
import { AIDoctorCard } from './components/AIDoctorCard';
import { LiveDataVisualizationCard } from './components/LiveDataVisualizationCard';
import { NutritionLogCard } from './components/NutritionLogCard';
import { LabTestsCard } from './components/LabTestsCard';

export default function DashboardPage() {
  const { data: user, error: userError } = useUser();

  if (userError) return <div>Error loading user data</div>;
  if (!user) return <div>Loading...</div>;

  // TODO: Fetch these values from your backend or state management
  const healthProfileCompletion = 7;
  const labTestsAnalyzed = 1;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
        <HealthProfileCard name={user.email || 'User'} completionPercentage={healthProfileCompletion} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <AIDoctorCard />
          <LiveDataVisualizationCard />
          <NutritionLogCard />
          <LabTestsCard testsAnalyzed={labTestsAnalyzed} />
        </div>
      </div>
    </div>
  );
}