import React from 'react';
import { motion } from 'framer-motion';

/**
 * SkillWheel - A premium circular assessment visualization.
 * It displays three main categories: Collaboration, Critical Thinking, and Creative Thinking.
 * Each category has specific sub-skills represented as segments.
 */

const categories = [
    {
        name: "Collaboration",
        color: "#1d4ed8", // Blue-700
        skills: [
            { name: "Project Management", score: 0.8 },
            { name: "Conflict Resolution", score: 0.9 },
        ]
    },
    {
        name: "Critical Thinking",
        color: "#0891b2", // Cyan-600
        skills: [
            { name: "Interpret & Analyze", score: 0.75 },
            { name: "Evaluate & Judge", score: 0.85 },
        ]
    },
    {
        name: "Creative Thinking",
        color: "#7e22ce", // Purple-700
        skills: [
            { name: "Generating Ideas", score: 0.95 },
            { name: "Building on Ideas", score: 0.8 },
            { name: "Evaluating Ideas", score: 0.7 },
        ]
    }
];

const SkillWheel = ({ profileImage, size = 450, scores = {} }) => {
    const radius = size / 2;
    const innerRadius = radius * 0.4;
    const outerRadius = radius * 0.9;
    const center = radius;

    // Combine static categories with dynamic scores if provided
    const combinedData = categories.map(cat => ({
        ...cat,
        skills: cat.skills.map(skill => ({
            ...skill,
            score: scores[skill.name] || skill.score
        }))
    }));

    const totalSkills = combinedData.reduce((acc, cat) => acc + cat.skills.length, 0);
    const anglePerSkill = 360 / totalSkills;

    let currentAngle = -90; // Start from top

    return (
        <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Background Rings */}
                {[0.6, 0.7, 0.8, 0.9].map((scale, i) => (
                    <circle
                        key={i}
                        cx={center}
                        cy={center}
                        r={radius * scale}
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="1"
                    />
                ))}

                {combinedData.map((cat, catIdx) => {
                    const catStartAngle = currentAngle;
                    const catAngle = cat.skills.length * anglePerSkill;

                    const renderedSkills = cat.skills.map((skill, skillIdx) => {
                        const startAngle = currentAngle;
                        const endAngle = currentAngle + anglePerSkill;
                        currentAngle = endAngle;

                        // Arcs calculation
                        const x1 = center + Math.cos((startAngle * Math.PI) / 180) * innerRadius;
                        const y1 = center + Math.sin((startAngle * Math.PI) / 180) * innerRadius;

                        // Skill levels (the colored bars)
                        const levels = [1, 2, 3, 4]; // 4 distinct levels of intensity

                        return (
                            <g key={`${catIdx}-${skillIdx}`}>
                                {levels.map((level, lIdx) => {
                                    const lInner = innerRadius + (lIdx * (outerRadius - innerRadius) / 4);
                                    const lOuter = lInner + ((outerRadius - innerRadius) / 4) - 2;
                                    const isFilled = (level / 4) <= skill.score;

                                    // Simplified arc path
                                    const d = describeArc(center, center, lInner, lOuter, startAngle + 2, endAngle - 2);

                                    return (
                                        <motion.path
                                            key={lIdx}
                                            d={d}
                                            fill={isFilled ? cat.color : "#f1f5f9"}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: isFilled ? 0.8 + (lIdx * 0.05) : 1, scale: 1 }}
                                            whileHover={{ opacity: 1, cursor: 'pointer' }}
                                            transition={{ delay: (catIdx * 0.2) + (skillIdx * 0.1) + (lIdx * 0.05) }}
                                        >
                                            <title>{skill.name}: {(skill.score * 100).toFixed(0)}%</title>
                                        </motion.path>
                                    );
                                })}
                            </g>
                        );
                    });

                    // Category Labels
                    const labelAngle = catStartAngle + (catAngle / 2);
                    const labelRadius = outerRadius + 25;
                    const lx = center + Math.cos((labelAngle * Math.PI) / 180) * labelRadius;
                    const ly = center + Math.sin((labelAngle * Math.PI) / 180) * labelRadius;

                    return (
                        <g key={cat.name}>
                            {renderedSkills}
                            <motion.text
                                x={lx}
                                y={ly}
                                textAnchor="middle"
                                fill={cat.color}
                                className="font-heading text-xs font-bold uppercase tracking-widest"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + (catIdx * 0.2) }}
                                style={{ transform: `rotate(${labelAngle + 90}deg)`, transformOrigin: `${lx}px ${ly}px` }}
                            >
                                {cat.name}
                            </motion.text>
                        </g>
                    );
                })}
            </svg>

            {/* Center Profile Image */}
            <div
                className="absolute flex items-center justify-center rounded-full border-4 border-white shadow-lg bg-slate-100 overflow-hidden"
                style={{ width: innerRadius * 1.8, height: innerRadius * 1.8 }}
            >
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                    <div className="text-slate-400 font-bold text-2xl uppercase opacity-20">PW</div>
                )}
            </div>
        </div>
    );
};

// Helper to describe SVG arc
function describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle) {
    const startRel = polarToCartesian(x, y, outerRadius, endAngle);
    const endRel = polarToCartesian(x, y, outerRadius, startAngle);
    const startIn = polarToCartesian(x, y, innerRadius, endAngle);
    const endIn = polarToCartesian(x, y, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", startRel.x, startRel.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endRel.x, endRel.y,
        "L", endIn.x, endIn.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startIn.x, startIn.y,
        "Z"
    ].join(" ");
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

export default SkillWheel;
