import { Metadata } from 'next'

export function createPageMetadata(props: {
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'article'
}): Metadata {
  const baseUrl = 'https://bhg.aicoderally.com'
  
  return {
    title: props.title,
    description: props.description,
    openGraph: {
      title: props.title,
      description: props.description,
      url: baseUrl,
      siteName: 'Blue Horizons Group',
      images: [
        {
          url: props.ogImage || `${baseUrl}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: props.title,
        },
      ],
      type: props.ogType || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: props.title,
      description: props.description,
      images: [props.ogImage || `${baseUrl}/og-default.jpg`],
    },
  }
}
