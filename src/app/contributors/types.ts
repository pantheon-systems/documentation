export type ContributorType = {
  /** Unique identifier for the contributor */
  id: string;
  /** Full name of the contributor */
  name: string;
  /** Short biography or description */
  bio: string;
  /** Profile avatar/image URL */
  avatar: string;
  /** Twitter profile URL */
  twitter?: string;
  /** GitHub profile URL */
  github?: string;
  /** LinkedIn profile URL */
  linkedin?: string;
  /** Personal website URL */
  url?: string;
  /** Drupal.org profile URL */
  drupal?: string;
  /** WordPress.org profile URL */
  wordpress?: string;
};
