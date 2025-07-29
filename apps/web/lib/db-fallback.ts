// apps/web/lib/db-fallback.ts
import { Article } from '@repo/db';

// Fallback data for when database connection fails
export const fallbackArticles: Article[] = [
  {
    id: 'fallback-1',
    title: 'Welcome to Our News Website',
    slug: 'welcome-to-our-news-website',
    content: 'This is a fallback article displayed when the database connection is not available. Our regular content will be displayed once the database connection is restored.',
    imageUrl: 'https://placehold.co/600x400?text=Database+Connection+Issue',
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    type: 'STANDARD',
    status: 'PUBLISHED',
    isHotNews: true,
    isSlider: true,
    isRecommendation: true,
    authorId: null
  },
  {
    id: 'fallback-2',
    title: 'How to Get Started with Our Platform',
    slug: 'how-to-get-started-with-our-platform',
    content: 'Learn how to navigate our website and discover all the available features.',
    imageUrl: 'https://placehold.co/600x400?text=Getting+Started',
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    type: 'STANDARD',
    status: 'PUBLISHED',
    isHotNews: false,
    isSlider: false,
    isRecommendation: true,
    authorId: null
  },
  {
    id: 'fallback-3',
    title: 'Top Features You Should Know About',
    slug: 'top-features-you-should-know-about',
    content: 'Explore the most popular features of our news platform.',
    imageUrl: 'https://placehold.co/600x400?text=Top+Features',
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    type: 'LIFESTYLE',
    status: 'PUBLISHED',
    isHotNews: false,
    isSlider: true,
    isRecommendation: false,
    authorId: null
  },
  {
    id: 'fallback-4',
    title: 'Latest Updates in Technology',
    slug: 'latest-updates-in-technology',
    content: 'Stay informed about the newest developments in the tech world.',
    imageUrl: 'https://placehold.co/600x400?text=Technology+News',
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    type: 'NETWORK',
    status: 'PUBLISHED',
    isHotNews: true,
    isSlider: false,
    isRecommendation: true,
    authorId: null
  }
];

// Function to generate dummy video articles
export function generateVideoArticles(): Article[] {
  return [
    {
      id: 'video-fallback-1',
      title: 'Introduction to Our Platform',
      slug: 'introduction-to-our-platform',
      content: 'Watch this video guide to understand how to use our platform effectively.',
      imageUrl: 'https://placehold.co/600x400?text=Video+Guide',
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
      type: 'VIDEO',
      status: 'PUBLISHED',
      isHotNews: false,
      isSlider: false,
      isRecommendation: true,
      authorId: null
    },
    {
      id: 'video-fallback-2',
      title: 'Weekly News Roundup',
      slug: 'weekly-news-roundup',
      content: 'A summary of the most important news from this week.',
      imageUrl: 'https://placehold.co/600x400?text=News+Roundup',
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
      type: 'VIDEO',
      status: 'PUBLISHED',
      isHotNews: true,
      isSlider: false,
      isRecommendation: false,
      authorId: null
    }
  ];
}
