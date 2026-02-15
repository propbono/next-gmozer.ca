import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Greg Mozer - Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Load the raccoon image
  // We use fetch with import.meta.url because this runs in the Edge runtime
  const raccoonSrc = await fetch(
    new URL('../../../../public/images/Raccoon_1-min.png', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: '#fafafa',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row', // Side by side layout
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
          padding: '60px 80px', // Extra padding for breathing room
        }}
      >
        {/* Left Column: Text Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', maxWidth: '65%' }}>
            
            {/* Brand Logo */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                <span style={{ fontSize: 40, fontWeight: 900, color: '#0e1111', letterSpacing: '-0.05em' }}>Greg Mozer</span>
                <span style={{ fontSize: 40, fontWeight: 900, color: '#00c6bd' }}>.</span>
            </div>

            {/* Role Label */}
            <span style={{ fontSize: 24, fontWeight: 600, color: '#64748b', marginBottom: 20 }}>
                Senior Software Engineer
            </span>

            {/* Main Heading */}
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 48, fontWeight: 800, lineHeight: 1.1, color: '#0e1111', marginBottom: 30 }}>
                <span>Making the Web a</span>
                <span style={{ color: '#00c6bd' }}>More Beautiful Place,</span>
                <span>One Site at a Time.</span>
            </div>

            {/* Skills Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                 {['React', 'Next.js', 'TypeScript', 'Vitest', 'PostgreSQL', 'Python'].map((skill) => (
                    <div key={skill} style={{ 
                        background: '#ffffff', 
                        border: '2px solid #e2e8f0',
                        padding: '10px 24px', 
                        borderRadius: 999, 
                        color: '#0e1111', 
                        fontSize: 20, 
                        fontWeight: 700,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        {skill}
                    </div>
                 ))}
            </div>
        </div>

        {/* Right Column: Raccoon Image */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '350px', height: '350px', marginLeft: 40 }}>
            <img src={raccoonSrc as unknown as string} alt="Raccoon working on laptop" width="350" height="350" style={{ objectFit: 'contain' }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}