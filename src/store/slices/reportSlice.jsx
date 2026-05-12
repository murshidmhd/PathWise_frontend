// store/reportSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalityType: null,
  recommendedCareers: [],
  primaryCareer: null,
  strengths: [],
  weaknesses: [],
  interestAreas: [],
  reportText: "",
  assessmentSummary: "",
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport: (state, action) => {
      const report = action.payload;
      state.personalityType = report.personality_type;
      state.recommendedCareers = report.recommended_careers;
      state.primaryCareer = report.recommended_careers[0] || null;
      state.strengths = report.strengths;
      state.weaknesses = report.weaknesses;
      state.interestAreas = report.interest_areas;
      state.reportText = report.report_text;
      state.assessmentSummary = `${report.report_text} Strengths: ${report.strengths.join(", ")}. Interests: ${report.interest_areas.join(", ")}.`;
    },
    clearReport: (state) => {
      return initialState;
    },
  },
});

export const { setReport, clearReport } = reportSlice.actions;
export default reportSlice.reducer;