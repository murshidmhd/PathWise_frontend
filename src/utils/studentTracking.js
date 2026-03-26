export function normalizeStudentTracking(data = {}) {
  const source = data?.tracking || data;

  return {
    profileCompleted: Number(
      source?.profile_completed ??
        source?.profile_completion ??
        source?.completion_percentage ??
        0,
    ),
    assessmentTaken: Boolean(
      source?.assessment_taken ?? source?.has_assessment ?? false,
    ),
    roadmapCreated: Boolean(
      source?.roadmap_created ?? source?.has_roadmap ?? false,
    ),
    isOnboarded: Boolean(
      source?.is_onboarded ?? source?.onboarding_completed ?? false,
    ),
    roadmapProgress: Number(
      source?.roadmap_progress ??
        source?.roadmap_completion ??
        source?.roadmap_percentage ??
        0,
    ),
  };
}
