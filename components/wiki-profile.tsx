'use client';

import { ProfileData } from '@/lib/types';
import ProfileSection from './profile-section';
import MarkdownContent from './markdown-content';

interface WikiProfileProps {
  profile: ProfileData;
}

export default function WikiProfile({ profile }: WikiProfileProps) {
  return (
    <div className="wiki-container">
      {/* Infobox */}
      <div className="wiki-infobox">
        {profile.imageUrl && (
          <img
            src={profile.imageUrl}
            alt={profile.name}
            className="w-full h-auto mb-4 rounded"
          />
        )}
        <h3 className="text-lg font-bold mb-3">{profile.name}</h3>
        {profile.info && Object.keys(profile.info).length > 0 && (
          <div className="space-y-2 text-sm">
            {Object.entries(profile.info).map(([key, value]) => (
              <div key={key}>
                <span className="font-semibold">{key}:</span>{' '}
                <span className="text-gray-600 dark:text-gray-400">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{profile.name}</h1>
        
        {profile.summary && (
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {profile.summary}
          </p>
        )}

        {profile.story && (
          <ProfileSection title="Story" defaultOpen>
            <MarkdownContent content={profile.story} />
          </ProfileSection>
        )}

        {profile.personality && (
          <ProfileSection title="Personality">
            <MarkdownContent content={profile.personality} />
          </ProfileSection>
        )}

        {profile.interests && (
          <ProfileSection title="Interests">
            <MarkdownContent content={profile.interests} />
          </ProfileSection>
        )}

        {profile.abilities && (
          <ProfileSection title="Abilities">
            <MarkdownContent content={profile.abilities} />
          </ProfileSection>
        )}

        {profile.trivia && (
          <ProfileSection title="Trivia">
            <MarkdownContent content={profile.trivia} />
          </ProfileSection>
        )}
      </div>
    </div>
  );
}
