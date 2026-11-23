import { ImageResponse } from 'next/og';

export const alt = 'QR Menu Pro: your menu on every table, in a minute';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Share card for WhatsApp, Facebook, X and Google: built at deploy time, no image service needed. */
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: 'radial-gradient(80% 70% at 85% 10%, #4a2b66 0%, #180D24 65%)', color: '#fff', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 34, fontWeight: 800 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg,#F5DA97,#DDA544)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22152E', fontSize: 38, fontWeight: 900 }}>Q</div>
            QR Menu Pro
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.02, letterSpacing: -2, maxWidth: 760 }}>Your menu, on every table, in a minute.</div>
            <div style={{ marginTop: 26, fontSize: 30, color: 'rgba(255,255,255,.72)', maxWidth: 760 }}>Snap your paper menu · 10 ready-made designs · table ordering · live kitchen screen</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 300, height: 300, borderRadius: 150, border: '10px solid #F2CD7A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 80px rgba(242,205,122,.35)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: 150, gap: 14 }}>
              {[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 66, height: 66, borderRadius: 16, border: i === 3 ? 'none' : '10px solid #F2CD7A', background: i === 3 ? '#E2AC3F' : 'transparent' }} />)}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
